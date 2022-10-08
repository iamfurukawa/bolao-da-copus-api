import { Matches } from "../../business/matches.interface";
import { Teams } from "../../business/team.enum";

import moment from 'moment';

moment.tz.setDefault("America/Sao_Paulo");

export const matches = [
    {
        'id': '1',
        'horario': '2022-10-07 11:00:00',
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
        'horario': '2022-10-07 14:59:00',
        'ended': true,
        'time1': {
            'nome': Teams.Brasil,
            'gols': 3
        },
        'time2': {
            'nome': Teams.Franca,
            'gols': 2
        }
    },
    {
        'id': '3',
        'horario': '2022-10-07 18:00:00',
        'ended': true,
        'time1': {
            'nome': Teams.Brasil,
            'gols': 7
        },
        'time2': {
            'nome': Teams.Argentina,
            'gols': 1
        }
    }
] as Matches[]