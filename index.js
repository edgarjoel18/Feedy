const express = require("express"); // using common js modules. Node supports this.
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
require("./models/User");
require("./models/Survey");
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express(); // Stategy
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log(`Could not connect to mongoDB: ${err}`));

app.use(bodyParser.json()); // able to parse the post,put, patch request and apply it to the req.body

// expire in 30 days-> turn to milliseconds
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/auth-routes")(app);
require("./routes/billing-routes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve production products like main.js, main.css
  app.use(express.static("client/build"));

  // express will serve up the index.html file
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = 5000 || process.env.NODE_ENV;
app.listen(PORT, () => console.log(`listening on port:${PORT}`));
