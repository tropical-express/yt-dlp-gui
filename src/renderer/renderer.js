const log = document.getElementById("log");
const status = document.getElementById("status");
const progressFill = document.getElementById("progressFill");
const folderText = document.getElementById("folder");

let folder = null;

async function pickFolder() {
  const selected = await window.api.selectFolder();
  if (selected) {
    folder = selected;
    folderText.textContent = selected;
  }
}

function startDownload() {
  const url = document.getElementById("url").value;

  if (!url) {
    alert("Enter a URL");
    return;
  }

  if (!folder) {
    alert("Choose a folder first");
    return;
  }

  log.textContent = "";
  progressFill.style.width = "0%";

  window.api.download({ url, folder });
}

window.api.onLog((data) => {
  log.textContent += data;
  log.scrollTop = log.scrollHeight;
});

window.api.onProgress((percent) => {
  progressFill.style.width = percent + "%";
});

window.api.onStatus((msg) => {
  status.textContent = msg;
});