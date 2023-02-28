import * as dotenv from "dotenv";
import express, { type Express } from "express";

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
app.get("/", (req, res) => {
  console.log("/");
  res.send("Hello World!");
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
