// Production keys. We need to environment variables from heroku
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_URI,
  googleRedirectURI: "https://blooming-sierra-79420.herokuapp.com",
};
