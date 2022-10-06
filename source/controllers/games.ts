import { Request, Response, NextFunction } from 'express'
import { matches } from '../services/game/matches'

const getMatches = async (req: Request, res: Response, next: NextFunction) => res.status(200).json(matches)

export default { getMatches }