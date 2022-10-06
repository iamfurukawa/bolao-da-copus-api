import express from 'express';
import controller from '../controllers/bet';
const router = express.Router();

router.get('/', controller.retrieve);
router.get('/:userId', controller.retrieveByUser);
router.post('/', controller.createOrUpdate);

export = router;