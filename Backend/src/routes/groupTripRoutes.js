import express from 'express';
import { createGroupTrip, getUserGroupTrips } from '../controllers/groupTripController.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create',verifyToken,createGroupTrip);
router.get('/',verifyToken,getUserGroupTrips);

export default router;
