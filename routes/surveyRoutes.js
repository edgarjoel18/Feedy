const _ = require('lodash');
const mongoose = require("mongoose");
const { Path } = require("path-parser");
const { URL } = require("url");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

module.exports = (app) => {

  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });
    console.log(surveys);
    res.send(surveys)
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting");
  });
  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
    // const events = _.map((event) => {
    //   const pathname = new URL(event.url).pathname;
    //   const p = new Path("/api/surveys/:surveyId/:choice");
    //   const match = p.test(pathname);
    //   if (match) {
    //     return {
    //       email: event.email,
    //       surveyId: match.surveyId,
    //       choice: match.choice,
    //     };
    //   }
    // }); // end of events
    // // remove undefined elements
    // const compactElements = _.compact(events);
    // const uniqueElements = _.uniqBy(compactElements, "email", "surveyId");
    // uniqueElements.forEach(async (element) => {
    //   const result = await Survey.updateOne(
    //     {
    //       _id: element.surveyId,
    //       recipients: {
    //         $elemMatch: {
    //           email: element.email,
    //           responded: false,
    //         },
    //       },
    //     },
    //     {
    //       $inc: { [choice]: 1 },
    //       $set: { "recipients.$.responded": true },
    //       lastResponded: new Date()
    //     }
    //   );
    //   await result.save();
    // });
    // res.send({});
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
