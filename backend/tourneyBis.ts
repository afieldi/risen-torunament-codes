import {requestMatchCodes} from './api/tourneyApi';

export function generateMatchCodes(teams, bestof, id, callback: (codes: Array<string>) => void) {
    requestMatchCodes(teams * bestof, id).then(data => {
        callback(data);
    });
}