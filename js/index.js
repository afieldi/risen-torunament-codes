'use strict'

const { ipcRenderer } = require('electron');


ipcRenderer.on('new-reply', () => {
    console.log("Hello world");
})

function generateNewTournament() {
    ipcRenderer.send('gen-tourney');
    displayLoader();
}
ipcRenderer.on('gen-toruney-rez', (event, number) => {
    hideLoader();
    if (number < 0) {
        alert("Something went wrong generating your tournament");
        return;
    }
    document.getElementById("tournament-number").value = number;
});


function generateTournamentCodes() {
    const count = document.getElementById("tournament-teams").value;
    const bestof = document.getElementById("tournament-bestof").value;
    const number = document.getElementById("tournament-number").value;

    if(!count || !bestof || !number) {
        alert("Please fill out both # of teams and best of series")
        return;
    }

    ipcRenderer.send('gen-codes', number, count, bestof);
}

ipcRenderer.on('gen-codes-rez', (event, data) => {
    console.log(data);
    const codes = JSON.parse(data);
    let strData = ""
    const bestof = document.getElementById("tournament-bestof").value;
    for(let i in codes) {
        if(i % bestof === 0) {
            strData += "\nGame " + ((i / bestof) + 1) + "\n";
        }
        strData += codes[i] + "\n";
    }
    document.getElementById("tourney-codes").value = strData;
})

ipcRenderer.on('get-game-rez', (event, data) => {
    console.log(data);
    const codes = JSON.parse(data);
})

function displayLoader() {

}

function hideLoader() {

}
