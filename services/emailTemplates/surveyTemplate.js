const keys = require("../../config/keys");
module.exports = (survey) => {
  // return a html snippet
  return `
  <html>
    <body>
      <div style="text-align: center;">
      <h3>I'd like your feedback</h3>
      <p>Please answer the following question:</p>
      <p>${survey.body}</p>
      <div>
        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">yes</a>
      </div>
      <div>
        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">no</a>
      </div>
      </div>
    </body>
  </html>
  `;
};

/* <a href="${keys.redirectDomain}/api/surveys/feedback">no</a> */
