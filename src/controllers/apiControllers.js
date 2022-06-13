const needle = require("needle");
//env vars
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

const getWeather = async (req, res, next) => {
  const params = new URLSearchParams({
    [API_KEY_NAME]: API_KEY_VALUE,
    ...req.query,
  });
  if (process.env.NODE_ENV !== "production") {
    console.log(`Request:${API_BASE_URL}?${params}`);
  }
  needle("get", `${API_BASE_URL}/?${params}`)
    .then(function (resp) {
      res.status(200).json(resp.body);
    })
    .catch(function (err) {
      res.status(500).json({ err: err.message });
    });
};
module.exports = { getWeather };
