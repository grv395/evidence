import express from "express";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
import TurndownService from "turndown";
import { fileURLToPath } from "url";
import https from "https";
import { createProxyMiddleware } from "http-proxy-middleware";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const turndownService = new TurndownService();

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve CKEditor 5 static files
app.use(
  "/ckeditor",
  express.static(path.join(__dirname, "node_modules", "ckeditor5", "build"))
);

// Serve the editor.html page
app.get("/editor", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "editor.html"));
});

// Serve the current content of editor-page.md
app.get("/content", (req, res) => {
  try {
    const markdownContent = fs.readFileSync(
      path.join(__dirname, "pages", "editor-page.md"),
      "utf-8"
    );
    res.send(markdownContent);
  } catch (error) {
    console.error("Error reading content:", error);
    res.status(500).send("Error reading content");
  }
});

// Handle form submission to save edited content
app.post("/save", (req, res) => {
  try {
    const htmlContent = req.body.content;
    if (!htmlContent) {
      throw new Error("Empty content received");
    }

    const markdownContent = turndownService.turndown(htmlContent);

    fs.writeFileSync(
      path.join(__dirname, "pages", "editor-page.md"),
      markdownContent
    );

    res.send("Content saved successfully");
  } catch (error) {
    console.error("Error saving content:", error.message);
    res.status(500).send("Failed to save content");
  }
});

// HTTPS server options
const options = {
  key: fs.readFileSync("/home/ubuntu/certs/privkey2.pem"),
  cert: fs.readFileSync("/home/ubuntu/certs/fullchain2.pem"),
};

// Configure a proxy middleware to proxy requests to Evidence development server
const evidenceProxy = createProxyMiddleware({
  target: "http://localhost:3001", // Assuming Evidence dev server is running on port 3000
  changeOrigin: true,
  secure: false,
});

// Use the proxy middleware
app.use("/", evidenceProxy);

// Create an HTTPS server
const httpsServer = https.createServer(options, app);

// Start listening on HTTPS port
httpsServer.listen(9002, "0.0.0.0", () => {
  console.log("HTTPS Proxy Server running on port 9002");
});
