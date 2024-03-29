const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./models/Survey");
require("./services/passport");

mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log(`Could not connect to mongoDB: ${err}`));
const app = express();
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session()); // puts req.user
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);
if (process.env.NODE_ENV === "production") {
  // serve production assets, like main.js, main.css
  app.use(express.static("client/build"));
  // Express will serve up the index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
