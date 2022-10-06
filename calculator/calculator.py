import matches

AC = 'ac'  # Acertou o placar
GV = 'gv'  # Gols do time vencedor
SG = 'sg'  # Saldo de gols
GP = 'gp'  # Gols do time perdedor
AV = 'av'  # Acertou o vencedor
EG = 'eg'  # Empate garantido
ER = 'er'  # Errou


def retrieveMatchesDict():
    matchesHash = {}
    for match in matches.matches():
        if match['ended'] is True:
            matchesHash[match['id']] = match
    return matchesHash


def apply(userId, username, bets=[]):

    matchesHash = retrieveMatchesDict()

    row = {
        'name': username,
        'userId': userId,
        'pts': 0,
        'ac': 0,
        'gv': 0,
        'sg': 0,
        'gp': 0,
        'av': 0,
        'eg': 0,
        'er': 0
    }

    for bet in bets:
        score = getScoreType(matchesHash[bet['gameId']], bet)
        print('Score type {}'.format(score))
        row['pts'] += getScore(score)
        row[score] += 1

    print('Row generated={}'.format(row))
    return row


def acertouOPlacar(match, bet):
    return match['time1']['gols'] == bet['time1']['gols'] and match['time2']['gols'] == bet['time2']['gols']


def golsDoTimeVencedor(match, bet):
    if match['time1']['gols'] > match['time2']['gols']:
        return match['time1']['gols'] == bet['time1']['gols']

    if match['time2']['gols'] > match['time1']['gols']:
        return match['time2']['gols'] == bet['time2']['gols']

    return False


def saldoDeGols(match, bet):
    sgMatchResult = match['time1']['gols'] - match['time2']['gols']
    sgGuess = bet['time1']['gols'] - bet['time2']['gols']

    return (sgMatchResult - sgGuess) == 0


def golsdoTimePerdedor(match, bet):
    if match['time1']['gols'] < match['time2']['gols']:
        return match['time1']['gols'] == bet['time1']['gols']

    if match['time2']['gols'] < match['time1']['gols']:
        return match['time2']['gols'] == bet['time2']['gols']

    return False


def acertouOVencedor(match, bet):
    if match['time1']['gols'] > match['time2']['gols']:
        return bet['time1']['gols'] > bet['time2']['gols']

    if match['time2']['gols'] > match['time1']['gols']:
        return bet['time2']['gols'] > bet['time1']['gols']

    return False


def empateGarantido(bet):
    return bet['time1']['gols'] == bet['time2']['gols']


def getScore(type):
    match type:
        case 'ac':
            return 25
        case 'gv':
            return 18
        case 'sg':
            return 15
        case 'gp':
            return 12
        case 'av':
            return 10
        case 'eg':
            return 4
        case 'er':
            return 0
        case _:
            return 0


def getScoreType(match, bet):
    # Acertou o placar
    result = acertouOPlacar(match, bet)
    if result is True:
        return AC

    # Gols do time vencedor
    result = golsDoTimeVencedor(match, bet)
    if result is True:
        return GV

    # Saldo de gols
    result = saldoDeGols(match, bet)
    if result is True:
        return SG

    # Gols do time perdedor
    result = golsdoTimePerdedor(match, bet)
    if result is True:
        return GP

    # Acertou o vencedor
    result = acertouOVencedor(match, bet)
    if result is True:
        return AV

    # Empate garantido
    result = empateGarantido(bet)
    if result is True:
        return EG

    return ER


# matches = [{'id': '1', 'horario': '2022-10-05 00:14:00', 'active': True, 'ended': True, 'time1': {'nome': 'ALEMANHA', 'gols': 1}, 'time2': {'nome': 'BRASIL', 'gols': 7}},
#         {'id': '2', 'horario': '2022-10-05 20:53:00', 'active': True, 'ended': True, 'time1': {'nome': 'BRASIL', 'gols': 1}, 'time2': {'nome': 'ARGENTINA', 'gols': 1}}]

# bets = [{'userId': 'b97e2a1d-4c9a-437c-9784-5985df46cb2b', 'dateTime': '2022-10-05 00:14:08', 'time1': {'gols': 1}, 'time2': {'gols': 7}, 'matchId': '1'},   # AC
#         {'userId': 'b97e2a1d-4c9a-437c-9784-5985df46cb2b', 'dateTime': '2022-10-05 00:14:08',
#             'time1': {'gols': 0}, 'time2': {'gols': 7}, 'matchId': '1'},   # GV
#         {'userId': 'b97e2a1d-4c9a-437c-9784-5985df46cb2b', 'dateTime': '2022-10-05 00:14:08',
#             'time1': {'gols': 7}, 'time2': {'gols': 13}, 'matchId': '1'},  # SG
#         {'userId': 'b97e2a1d-4c9a-437c-9784-5985df46cb2b', 'dateTime': '2022-10-05 00:14:08',
#             'time1': {'gols': 1}, 'time2': {'gols': 0}, 'matchId': '1'},   # GP
#         {'userId': 'b97e2a1d-4c9a-437c-9784-5985df46cb2b', 'dateTime': '2022-10-05 00:14:08',
#             'time1': {'gols': 2}, 'time2': {'gols': 3}, 'matchId': '1'},   # AV
#         {'userId': 'b97e2a1d-4c9a-437c-9784-5985df46cb2b', 'dateTime': '2022-10-05 00:14:08',
#             'time1': {'gols': 3}, 'time2': {'gols': 3}, 'matchId': '1'},   # EG
#         {'userId': 'b97e2a1d-4c9a-437c-9784-5985df46cb2b', 'dateTime': '2022-10-05 00:14:08', 'time1': {'gols': 4}, 'time2': {'gols': 3}, 'matchId': '1'}]   # ER

#print(apply('Vini', bets))
