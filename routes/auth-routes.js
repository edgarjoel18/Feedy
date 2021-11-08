const passport = require("passport");
// const router = express.Router();

// essentially when someone clicks on sign in with google. The string 'google' will be
// passed in the authenticate and call line 10 with new GoogleStrategy
module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/survey");
    }
  );
  app.get("/api/currentUser", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout(); // logout is attached by passport and it erases the cookie
    res.redirect("/");
  });
};
