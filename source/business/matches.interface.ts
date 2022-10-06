import { Teams } from "./team.enum"

export interface Matches {
    'id': string
    'horario': string,
    'active': boolean,
    'ended': boolean,
    'time1': {
        'nome': Teams,
        'gols': number | null
    },
    'time2': {
        'nome': Teams,
        'gols': number | null
    }
}