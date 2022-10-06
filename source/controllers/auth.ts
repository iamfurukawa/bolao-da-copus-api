import { Request, Response, NextFunction } from 'express'
import { Md5 } from 'ts-md5';
import { User } from '../business/users.interface';
import { getUser, getUserByDocument, saveUser } from '../services/firestore';

const signIn = async (req: Request, res: Response, next: NextFunction) => {
    let document = (req.headers['document'] || '') as string;
    let password = (req.headers['password'] || '') as string;

    try {
        if(document === '' || password === '')
            throw 'Document or password empty'
        const result = await getUser(document, Md5.hashStr(password))
        const doc = result.docs[0]
        console.table(doc.data())
        const jwt = require('jsonwebtoken')

        return res.status(200).json({
            'access_token': jwt.sign({ uuid: doc.id, name: doc.data().name }, process.env.SECRET_JWT, {
                expiresIn: process.env.EXPIRES_IN
            }),
            'token_type': 'bearer',
            'expires_in': process.env.EXPIRES_IN
        })
    } catch (e) {
        console.error('m=getAuth Cannot sign in document=', document, ' password=', password, ' error=', e)
        return res.status(403).json()
    }
}

const register = async (req: Request, res: Response, next: NextFunction) => {
    let user = req.body as User;
    console.table(user)
    try {
        const userExists = await getUserByDocument(user.document)
        if (userExists.size !== 0)
            throw 'User already exists'

        user.password = Md5.hashStr(user.password)
        saveUser(user)

        return res.status(201).json()
    } catch (e) {
        console.error('m=register Cannot register user=', user, ' error=', e)
        return res.status(422).json()
    }
}

export default {
    signIn,
    register
}