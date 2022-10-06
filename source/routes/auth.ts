import express from 'express';
import controller from '../controllers/auth';
const router = express.Router();

router.get('/', controller.signIn);
router.post('/', controller.register);

export = router;