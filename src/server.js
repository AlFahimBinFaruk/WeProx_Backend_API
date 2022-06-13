const express = require("express");
const rateLimit = require("express-rate-limit");
const createError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();
//set api call limit.this will set this limit to all routes,you can also set different limit to different routes.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});
//use middlewares
app.use([
  morgan("dev"),
  cors(),
  express.json(),
  express.urlencoded({ extended: false }),
  limiter,
]);
//api health route
app.get("/health", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
});
//api main route
app.use("/api", require("./routes/api.route"));

//api error route
app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
