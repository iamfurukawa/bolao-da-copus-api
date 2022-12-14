// https://www.section.io/engineering-education/how-to-create-a-simple-rest-api-using-typescript-and-nodejs/
import http from 'http';
import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as moment from 'moment-timezone';

import routesBet from '../source/routes/bet';
import routesAuth from '../source/routes/auth';
import routesGames from '../source/routes/games';
import routeClassification from '../source/routes/classification';

moment.tz.setDefault("America/Sao_Paulo");

dotenv.config()
const router: Express = express();

/** cors */
router.use(cors());
/** Logging */
router.use(morgan('combined'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

router.use('/api/auth', routesAuth);

/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }

    try {
        const jwt = require('jsonwebtoken')
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        // if (Date.now() >= decoded.expires_in * 1000)
        //     throw 'Token expired'

        req.headers['userId'] = decoded.uuid
        req.headers['username'] = decoded.name

        next();
    } catch (err) {
        console.error('Error on middleware auth=', err)
        res.status(401).send('Please authenticate');
    }
});

/** Routes */
router.use('/api/bet', routesBet);
router.use('/api/games', routesGames);
router.use('/api/classification', routeClassification);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 3000;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));