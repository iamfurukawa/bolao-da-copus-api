import { Request, Response, NextFunction } from 'express'
import { getAllBets, getBetByUser, getBetByUserAndGame, saveBet, updateBet } from '../services/firestore';
import moment from 'moment';

import { Bet } from '../business/bet.interface';
import { matches } from '../services/game/matches';

const createOrUpdate = async (req: Request, res: Response, next: NextFunction) => {
    let bet = req.body as Bet;
    let userId = req.headers['userId'] as string;
    bet.userId = userId
    bet.dateTime = moment().format("YYYY-MM-DD HH:mm:ss").toString()

    console.table(bet)
    try {
        const match = matches.find(match => match.id === bet.gameId) || null
        console.table(match)
        if (!match)
            throw 'Match not found'

        if (moment().isAfter(moment(match!.horario).add(1, 'minute')))
            throw 'Times up for bets'

        const betDoc = await getBetByUserAndGame(userId, bet.gameId)
        if (betDoc.size === 0) {
            console.log('Creating bet')
            saveBet(bet)
        } else {
            console.log('Updating bet')
            let betData = betDoc.docs[0].data()
            betData.time1 = bet.time1
            betData.time2 = bet.time2
            updateBet(betData, betDoc.docs[0].id)
        }
        return res.status(201).json()
    } catch (e) {
        console.error('m=register Cannot register or update bet=', bet, ' error=', e)
        return res.status(422).json()
    }
}

const retrieve = async (req: Request, res: Response, next: NextFunction) => {
    const bets = await getAllBets();
    if (bets.size === 0) return res.status(404).json()

    return res.status(200).json(bets.docs.map(doc => doc.data()))
}

const retrieveByUser = async (req: Request, res: Response, next: NextFunction) => {
    const bets = await getBetByUser(req.params['userId']);
    if (bets.size === 0) return res.status(404).json()

    return res.status(200).json(bets.docs.map(doc => doc.data()))
}

export default {
    createOrUpdate,
    retrieve,
    retrieveByUser
}