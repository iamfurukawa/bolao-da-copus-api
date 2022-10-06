import { Matches } from "../../business/matches.interface";
import { Teams } from "../../business/team.enum";
import moment from 'moment';

export const matches = [
    {
        'id': '1',
        'horario': '2022-10-06 23:59:00',
        'active': moment().isBefore(moment('2022-10-06 23:59:00').add(1, 'minute')),
        'ended': true,
        'time1': {
            'nome': Teams.Alemanha,
            'gols': 1
        },
        'time2': {
            'nome': Teams.Brasil,
            'gols': 7
        }
    },
    {
        'id': '2',
        'horario': '2022-10-06 12:14:00',
        'active': moment().isBefore(moment('2022-10-06 12:14:00').add(1, 'minute')),
        'ended': false,
        'time1': {
            'nome': Teams.Alemanha,
            'gols': -1
        },
        'time2': {
            'nome': Teams.Argentina,
            'gols': -1
        }
    },
    {
        'id': '3',
        'horario': '2022-10-10 20:53:00',
        'active': moment().isBefore(moment('2022-10-05 20:53:00').add(1, 'minute')),
        'ended': false,
        'time1': {
            'nome': Teams.Brasil,
            'gols': -1
        },
        'time2': {
            'nome': Teams.Argentina,
            'gols': -1
        }
    }
] as Matches[]