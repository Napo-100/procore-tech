const fetch = require("node-fetch");

const body = {
  grant_type: "client_credentials",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
};

const auth = (req, res, next) => {
  fetch("https://sandbox.procore.com/oauth/token", {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
    .then((data) => data.json())
    .then((tokenData) => {
      console.log(tokenData);
      req.token = tokenData.access_token;
      req.tokenType = tokenData.token_type;
      next();
    }).catch((err) => res.json(err));
};

module.exports = { auth };
