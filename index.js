const express = require("express"); // using common js modules. Node supports this.
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

const app = express(); // Stategy

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
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log(`Could not connect to mongoDB: ${err}`));

const PORT = process.env.NODE_ENV || 5000;
app.listen(PORT, () => console.log(`listening on port:${PORT}`));
