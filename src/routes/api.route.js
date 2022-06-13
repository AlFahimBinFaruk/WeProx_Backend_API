const router = require("express").Router();
const apiCache = require("apicache");
//set api cache
let cache = apiCache.middleware;

//controllers
const { getWeather } = require("../controllers/apiControllers");

//routes
router.get("/", cache("2 minutes"), getWeather);

module.exports = router;
