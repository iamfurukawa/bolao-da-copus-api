import express from 'express';
import controller from '../controllers/classification';
const router = express.Router();

router.get('/', controller.retrieve);

export = router;