const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log(`Could not connect to mongoDB: ${err}`));
const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session()); // puts req.user
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
