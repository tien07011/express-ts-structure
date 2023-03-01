import LoggerUtils from "./utils/logger.utils";
import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response, type Express } from "express";

/**
 * Config .env file
 */
dotenv.config();

/**
 * Init express application
 */
const app: Express = express();

/**
 * Get application port
 */
const port: number | string = process.env.APP_PORT || 3000;

/**
 * Check development enviroment
 */
const isDev: boolean = process.env.NODE_ENV === "development";

/**
 * Config static folder
 */
app.use(express.static("public"));

/**
 * Config routes
 */
app.get("/", (req, res, next) => {
  try {
    let a = "";
    JSON.parse(a);
    res.json({ message: "Hello World!" });
  } catch (error) {
    next(error);
  }
});

/**
 * Config 404 - Not Found
 */
app.use(function (req, res, next) {
  res.status(404).json({ error: "Page not found", endpoint: req.url });
});

/**
 * Config 500 - Internal Server Error
 */
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  new LoggerUtils().write(err.message, "error", "ERROR");
  res.status(500).json({
    error: "Internal Server Error",
    trace: err.message,
    endpoint: req.url,
  });
});

/**
 * Listen on port opened
 */
app.listen(port, () => {
  console.clear();
  console.log("==========================================");
  if (isDev) {
    console.log(`>> App listening on http://localhost:${port}`);
  } else {
    console.log(`>> App listening on port ${port}`);
  }
  console.log("==========================================");
  console.log("\n");
});
