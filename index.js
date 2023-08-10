const { app, Tray, Menu } = require('electron');
const { menubar } = require('menubar');
const path = require('path');

var iconPath = path.resolve(__dirname, './build/jsonLogoTemplate.png')
console.log(iconPath);

const contextTemplate = [
  {
    role: 'quit',
    label: 'Quit Json Formatter',
    accelerator: 'Command+Q'
  }
];
const contextMenu = Menu.buildFromTemplate(contextTemplate);

app.on('ready', () => {
  
  const tray = new Tray(iconPath);
  tray.setIgnoreDoubleClickEvents(true);
  
  const mb = menubar({
    browserWindow: {
      transparent: false,
      width: 340,
      height: 200,
      frame: false,
      show: false,
      skipTaskbar: true,
      hiddenInMissionControl: true,
      excludedFromShownWindowsMenu: true,
      fullscreenable: false,
      resizable: false,
    },
    index: `file://${path.resolve(__dirname, './build/index.html')}`,
    tray: tray
  });

  tray.on('click', () => {
    app.dock.hide();
  });
  
  tray.on('right-click', () => {
    mb.window.isVisible() ? mb.window.hide() : void(0); 
    tray.popUpContextMenu(contextMenu);
  });
  mb.on('ready', () => {
    console.log("App is running...");
  });
});



app.dock.hide();