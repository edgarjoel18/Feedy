const mongoose = require("mongoose");
const { Path } = require("path-parser");
const { URL } = require("url");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

module.exports = (app) => {
  app.get("/api/surveys", (req, res) => {
    res.send("Thanks for voting");
  });
  app.post("/api/surveys/webhooks", (req, res) => {
    const events = _.map((event) => {
      const pathname = new URL(event.url).pathname;
      const p = new Path("/api/surveys/:surveyId/:choice");
      const match = p.test(pathname);
      if (match) {
        return {
          email: event.email,
          surveyId: match.surveyId,
          choice: match.choice,
        };
      }
    }); // end of events
    // remove undefined elements
    const compactElements = _.compact(events);
    const uniqueElements = _.uniqBy(compactElements, "email", "surveyId");
    uniqueElements.forEach(async (element) => {
      const result = await Survey.updateOne(
        {
          _id: element.surveyId,
          recipients: {
            $elemMatch: {
              email: element.email,
              responded: false,
            },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
        }
      );
      await result.save();
    });
    res.send({});
  });
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, emails } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: emails
        .split(',')
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
