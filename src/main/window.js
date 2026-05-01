const { BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 650,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const htmlPath = path.join(__dirname, "../renderer/index.html");

  console.log("Loading:", htmlPath);

  win.loadFile(htmlPath);

  win.webContents.openDevTools(); // 🔥 debug
}

module.exports = { createWindow };