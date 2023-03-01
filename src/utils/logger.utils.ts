import fs from "node:fs";

class Logger {
  public write(message: string, fileName: string, status: LoggerStatus) {
    let date: Date = new Date();
    let now: number = date.getTime();
    let day: number | string = date.getDate();
    let month: number | string = date.getMonth() + 1;
    let year: number | string = date.getFullYear();
    day = day <= 9 ? "0" + day : day;
    month = month <= 9 ? "0" + month : month;
    let file = `${fileName}_${year}_${month}_${day}.log`;
    let msg = `[${now}] - ${status}: ${message} \n`;
    fs.writeFile("./src/logs/" + file, msg, { flag: "a+" }, function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
}

export default Logger;

export type LoggerStatus = "INFO" | "ERROR";
