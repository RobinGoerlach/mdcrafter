import http from "http";
import fs from "fs";
import path from "path";
import config from "./config.js";
import logger from "./logger.js";
import markdownProcessor from "./markdown.js";

const server = http.createServer(async (req, res) => {
  logger.info(`Request received: ${req.method} ${req.url}`);

  const filePath = path.join(
    config.documentRoot,
    req.url === "/" ? "index.md" : req.url
  );
  const extname = path.extname(filePath);

  if (extname === ".md") {
    // Markdown-Datei verarbeiten
    try {
      const htmlContent = await markdownProcessor.processMarkdown(filePath);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlContent);
    } catch (err) {
      if (err.code === "ENOENT") {
        logger.error(`File not found: ${filePath}`);
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Not Found</h1>");
      } else {
        logger.error(`Server error: ${err.message}`);
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>500 Internal Server Error</h1>");
      }
    }
  } else {
    // Andere Dateien (z. B. CSS, HTML) ausliefern
    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          logger.error(`File not found: ${filePath}`);
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("<h1>404 Not Found</h1>");
        } else {
          logger.error(`Server error: ${err.message}`);
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("<h1>500 Internal Server Error</h1>");
        }
      } else {
        const contentType = getContentType(path.extname(filePath));
        logger.info(`File served: ${filePath}`);
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  }
});

// Content-Type für verschiedene Dateitypen bestimmen
function getContentType(extname) {
  switch (extname) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "application/javascript";
    case ".json":
      return "application/json";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    case ".md":
      return "text/html"; // Markdown wird als HTML ausgeliefert
    default:
      return "application/octet-stream";
  }
}

// Server starten
server.listen(config.port, config.hostname, () => {
  logger.info(`Server läuft unter http://${config.hostname}:${config.port}/`);
});
