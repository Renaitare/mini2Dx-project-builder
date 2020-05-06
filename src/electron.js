const { app, BrowserWindow } = require('electron');
const path = require('path');
let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		webPreferences: {
			nodeIntegration: true
		}
	});

	let watcher;
	if (process.env.NODE_ENV === 'development') {
		watcher = require('chokidar').watch(
			path.join(__dirname, '../public/build'),
			{ ignoreInitial: true }
		);
		watcher.on('change', () => {
			mainWindow.reload();
		});
	}

	mainWindow.resizable = false;
	mainWindow.setMenuBarVisibility(false);

	mainWindow.loadURL(
		`file://${path.join(__dirname, '../public/index.html')}`
	);
	mainWindow.on('closed', () => {
		mainWindow = null;
		if (watcher) {
			watcher.close();
		}
	});
}

app.allowRendererProcessReuse = true;
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
