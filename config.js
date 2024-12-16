const config = {
  hostname: process.env.HOSTNAME || "127.0.0.1",
  port: process.env.PORT || 3000,
  logFilePath: "./server.log", // Pfad zur Logdatei
  logLevel: process.env.LOG_LEVEL || "INFO", // Log-Level
  logToConsole: process.env.LOG_TO_CONSOLE === "true", // Konsolenausgabe aktivieren
  flushInterval: process.env.FLUSH_INTERVAL || 5000, // Intervall in Millisekunden
  documentRoot: "./public", // Verzeichnis, aus dem Dateien ausgeliefert werden
};

export default config;
