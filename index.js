const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on("ready", () => {
  // Create main window
  mainWindow = new BrowserWindow({
    show: false,
    title: "API Testing Tool",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.maximize();
  mainWindow.show();

  //   Load html to window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "views/mainWindow.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  //   Close app when main window is closed
  mainWindow.on("closed", () => {
    app.quit();
  });

  //   Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

// Create menu template
const mainMenuTemplate = [
  {
    label: "Application",
    submenu: [
      {
        label: "Quit",
        click: () => {
          app.quit();
        },
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
      },
    ],
  },
];

if (process.platform === "darwin") mainMenuTemplate.unshift({});
// Add dev tools if not in prod
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        role: "reload",
      },
      {
        label: "Toggle Dev Tools",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
        accelerator: process.platform === "darwin" ? "Command+i" : "Ctrl+i",
      },
    ],
  });
}
