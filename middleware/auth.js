const fetch = require("node-fetch");

const body = {
  grant_type: "client_credentials",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
};

const auth = async (req, res, next) => {
  // api call to procore to get token data
  try {
    const tokenData = await fetch("https://sandbox.procore.com/oauth/token", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const data = await tokenData.json();
    req.token = data.access_token;
    req.tokenType = data.token_type;
    next();
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { auth };
