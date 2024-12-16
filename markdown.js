import fs from "fs";
import { marked } from "marked";

class MarkdownProcessor {
  constructor() {}

  // Lade die Markdown-Datei und konvertiere sie in HTML
  processMarkdown(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          return reject(err);
        }

        // Konvertiere Markdown in HTML
        const htmlContent = marked.parse(data);

        // Passe die Links im HTML an
        const updatedHtml = this.updateLinks(htmlContent);

        resolve(updatedHtml);
      });
    });
  }

  // Ändere Markdown-Links in klickbare HTML-Links
  updateLinks(htmlContent) {
    return htmlContent.replace(
      /\[([^\]]+)\]\(([^\)]+\.md)\)/g, // Erkennung von Markdown-Links
      '<a href="$2">$1</a>' // Umwandlung in HTML-Links
    );
  }
}

export default new MarkdownProcessor();
