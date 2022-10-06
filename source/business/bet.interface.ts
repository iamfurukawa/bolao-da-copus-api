export interface Bet {
    'gameId': string,
    'userId': string,
    'dateTime': string,
    'time1': {
        'gols': number | null
    },
    'time2': {
        'gols': number | null
    }
}