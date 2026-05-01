const { app, ipcMain, dialog } = require("electron");
const { createWindow } = require("./window");
require("./downloader");

app.whenReady().then(() => {
  createWindow();
});

ipcMain.handle("select-folder", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"]
  });

  if (result.canceled) return null;
  return result.filePaths[0];
});