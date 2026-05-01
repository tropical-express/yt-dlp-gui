const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  download: (data) => ipcRenderer.send("download", data),

  onLog: (cb) => ipcRenderer.on("log", (_, d) => cb(d)),
  onProgress: (cb) => ipcRenderer.on("progress", (_, p) => cb(p)),
  onStatus: (cb) => ipcRenderer.on("status", (_, s) => cb(s)),
  onDone: (cb) => ipcRenderer.on("done", (_, c) => cb(c)),

  selectFolder: () => ipcRenderer.invoke("select-folder")
});