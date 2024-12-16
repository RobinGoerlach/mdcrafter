import fs from "fs";
import config from "./config.js";

class BufferedLogger {
  constructor(
    logFilePath,
    logLevel,
    logToConsole,
    bufferSize = 10,
    flushInterval = 5000
  ) {
    this.logFilePath = logFilePath;
    this.logLevel = logLevel;
    this.logToConsole = logToConsole;
    this.buffer = [];
    this.bufferSize = bufferSize;
    this.flushInterval = flushInterval;
    this.levels = {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      DEBUG: 3,
    };

    this.overrideConsole();
    this.startFlushInterval();
  }

  log(level, message) {
    if (this.levels[level] <= this.levels[this.logLevel]) {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] [${level}] ${message}`;

      // Füge Meldung zum Puffer hinzu
      this.buffer.push(`${logMessage}\n`);

      // Optional: Sofortige Ausgabe auf der Konsole
      if (this.logToConsole) {
        this.originalConsole[level.toLowerCase()](logMessage); // Direkt auf der Konsole ausgeben
      }

      // Schreibe blockweise in die Datei, wenn der Puffer voll ist
      if (this.buffer.length >= this.bufferSize) {
        this.flush();
      }
    }
  }

  flush() {
    if (this.buffer.length > 0) {
      const dataToWrite = this.buffer.join("");
      this.buffer = [];

      fs.appendFile(this.logFilePath, dataToWrite, (err) => {
        if (err) {
          this.originalConsole.error("Fehler beim Schreiben ins Logfile:", err);
        }
      });
    }
  }

  startFlushInterval() {
    setInterval(() => this.flush(), this.flushInterval);
  }

  error(message) {
    this.log("ERROR", message);
  }

  warn(message) {
    this.log("WARN", message);
  }

  info(message) {
    this.log("INFO", message);
  }

  debug(message) {
    this.log("DEBUG", message);
  }

  overrideConsole() {
    const originalConsole = { ...console };

    console.log = (message) => {
      this.info(message);
      originalConsole.log(message);
    };

    console.error = (message) => {
      this.error(message);
      originalConsole.error(message);
    };

    console.warn = (message) => {
      this.warn(message);
      originalConsole.warn(message);
    };

    console.debug = (message) => {
      this.debug(message);
      originalConsole.debug(message);
    };

    this.originalConsole = originalConsole;
  }
}

export default new BufferedLogger(
  config.logFilePath,
  config.logLevel,
  config.logToConsole,
  10,
  config.flushInterval
);
