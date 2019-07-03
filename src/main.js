const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu, shell } = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function () {
    // Create new window
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    //mainWindow.setBackgroundColor('#222326');
    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});

// Handle create new file
function createNewFile() {

}

function refreshPage() {
    mainWindow.reload();
}

// Create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New File',
                click() {
                    createNewFile();
                }
            },
            {
                label: 'Save'
            },
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Appearance',
                submenu: [
                    {
                        label: 'Dark Theme'
                    },
                    {
                        label: 'Light Theme'
                    }
                ]
            }
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Documentation',
                click() {
                    shell.openExternal('https://featureable.cf');
                }
            },
            {
                label: 'Release Notes'
            },
            {
                label: 'Check for Updates...'
            }
        ]
    }
];

if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click() {
                    mainWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}