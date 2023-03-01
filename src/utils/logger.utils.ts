import fs from "node:fs";
import { LoggerStatus } from "../specs/utils/logger.utils";

class Logger {
  public write(message: string, fileName: string, status: LoggerStatus) {
    let date = new Date();
    let now = date.getTime();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let file = `${fileName}_${year}_${month}_${day}.log`;
    let msg = `[${now}] - ${status}: ${message}`;
    fs.writeFile("./src/logs/" + file, msg, { flag: "wx" }, function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
}

export default Logger;
