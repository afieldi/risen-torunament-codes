import { app, BrowserWindow, ipcMain } from "electron";

import { generateMatchCodes } from './backend/tourneyBis';

require('dotenv').config();

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // and load the index.html of the app.
    win.loadFile("html/index.html");
}
app.on("ready", createWindow);


ipcMain.on('gen-tourney', (event, arg) => {
    event.reply('gen-toruney-rez', 1277);
    event.reply('new-reply')
});

ipcMain.on('gen-codes', (event, id, teams, bestof) => {
    const codesCount = Number(teams) * Number(bestof);
    console.log("recieved request")
    generateMatchCodes(teams, bestof, id, (codes) => {
        console.log(codes);
        event.reply('gen-codes-rez', JSON.stringify(codes));
    });
});
