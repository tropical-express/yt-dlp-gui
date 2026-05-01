const { ipcMain } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

ipcMain.on("download", (event, { url, folder }) => {
  if (!url) {
    event.sender.send("status", "No URL provided");
    return;
  }

  const output = path.join(folder, "%(title)s.%(ext)s");

  const proc = spawn("yt-dlp", [url, "-o", output], {
    shell: true
  });

  event.sender.send("status", "Starting download...");

  proc.stdout.on("data", (data) => {
    const text = data.toString();

    // parse %
    const match = text.match(/(\d+(\.\d+)?)%/);
    if (match) {
      event.sender.send("progress", parseFloat(match[1]));
    }

    event.sender.send("log", text);
  });

  proc.stderr.on("data", (data) => {
    event.sender.send("log", data.toString());
  });

  proc.on("close", (code) => {
    event.sender.send(
      "status",
      code === 0 ? "Download complete ✅" : "Download failed ❌"
    );
    event.sender.send("done", code);
  });

  proc.on("error", (err) => {
    event.sender.send("status", "Error: " + err.message);
  });
});