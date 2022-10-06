import { Request, Response, NextFunction } from 'express'
import { getClassification } from '../services/firestore';

const retrieve = async (req: Request, res: Response, next: NextFunction) => {
    const classification = await getClassification();
    if (classification.size === 0) return res.status(404).json()

    return res.status(200).json(classification.docs[0])
}

export default {
    retrieve,
}