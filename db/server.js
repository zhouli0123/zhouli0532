// 周丽 2026-11-12 GLM-5.3-Flash 功能：server.js —— 古诗数据服务器（端口 3004）：
// ① 数据接口 GET /db/db.json（或 /db.json）返回 poems 数据；② 同时托管项目根目录静态文件（/ 默认打开 zhouli-poems.html），方便本地调试。
// 启动方式：在 db 文件夹里执行 node server.js
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3004;
const ROOT = path.join(__dirname, ".."); // 项目根目录（db 文件夹的上一级）
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

// 周丽 2026-11-12 GLM-5.3-Flash 功能：sendJson —— 输出 JSON 数据；带 CORS 头，允许 file:// 直接打开的页面也能请求
function sendJson(res, body) {
  res.writeHead(200, {
    "Content-Type": MIME[".json"],
    "Access-Control-Allow-Origin": "*"
  });
  res.end(body);
}

// 周丽 2026-11-12 GLM-5.3-Flash 功能：sendFile —— 读取并输出静态文件；找不到时返回 404
function sendFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      });
      res.end("404 Not Found: " + filePath);
      return;
    }
    res.writeHead(200, {
      "Content-Type": MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Access-Control-Allow-Origin": "*"
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);

  // 数据接口：/db/db.json 或 /db.json → 返回 db.json 原文（poems 数据在里面）
  if (urlPath === "/db/db.json" || urlPath === "/db.json") {
    fs.readFile(path.join(__dirname, "db.json"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8", "Access-Control-Allow-Origin": "*" });
        res.end("读取 db.json 失败：" + err.message);
        return;
      }
      sendJson(res, data);
    });
    return;
  }

  // 数据接口二：/api/authors → 返回作者列表（从 db.json 的 poems 里提取 author 并按出现顺序去重）
  if (urlPath === "/api/authors") {
    fs.readFile(path.join(__dirname, "db.json"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8", "Access-Control-Allow-Origin": "*" });
        res.end("读取 db.json 失败：" + err.message);
        return;
      }
      var authors = [];
      try {
        JSON.parse(data).poems.forEach(function (p) {
          if (p.author && authors.indexOf(p.author) === -1) authors.push(p.author);
        });
      } catch (e) { /* db.json 解析失败时 authors 保持为空数组 */ }
      sendJson(res, JSON.stringify({ authors: authors }));
    });
    return;
  }

  // 静态文件：从项目根目录解析（/ 默认打开 zhouli-poems.html），并拦截 ../ 防止越权读取
  const rel = urlPath === "/" ? "zhouli-poems.html" : urlPath.replace(/^\//, "");
  const filePath = path.join(ROOT, rel);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8", "Access-Control-Allow-Origin": "*" });
    res.end("403 Forbidden");
    return;
  }
  sendFile(res, filePath);
});

server.listen(PORT, () => {
  console.log("古诗数据服务器已启动：http://localhost:" + PORT + "/");
  console.log("数据接口：http://localhost:" + PORT + "/db/db.json");
});
