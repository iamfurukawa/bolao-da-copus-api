import express from 'express';
import controller from '../controllers/games';
const router = express.Router();

router.get('/matches', controller.getMatches);

export = router;