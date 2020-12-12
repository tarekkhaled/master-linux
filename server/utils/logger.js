const debug = require("debug");

const APP_NAME = "bank-images";

class Logger {
  constructor(prefix) {
    if (prefix) {
      this.debug = debug(`${APP_NAME}:${prefix}`);
      this.warn = debug(`${APP_NAME}:WARN:${prefix}`);
      this.error = debug(`${APP_NAME}:ERROR:${prefix}`);
    } else {
      this.debug = debug(`${APP_NAME}`);
      this.warn = debug(`${APP_NAME}:WARN`);
      this.error = debug(`${APP_NAME}:ERROR`);
    }
    this.debug.log = console.info.bind(console);
    this.warn.log = console.warn.bind(console);
    this.error.log = console.error.bind(console);
  }
}

module.exports = Logger;
