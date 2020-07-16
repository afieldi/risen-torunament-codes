const fetch = require("node-fetch");
const process = require('process');

import { NA_TOURNEY_BASE } from "../common";
// import process from 'process';

export async function requestMatchCodes<T>(count, id): Promise<string[]> {
    const url = NA_TOURNEY_BASE + `/lol/tournament-stub/v4/codes?count=${count}&tournamentId=${id}`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'X-Riot-Token': process.env.RIOT_API_TOKEN,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "mapType": "SUMMONERS_RIFT",
            "pickType": "TOURNAMENT_DRAFT",
            "spectatorType": "ALL",
            "teamSize": 5
        })
    }).then(response => {
        if (!response.ok) {
            // throw new Error();
        }
        return response.json() as Promise<string[]>;
    })
    
}