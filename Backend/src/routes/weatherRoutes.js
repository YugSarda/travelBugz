import express from 'express';
import { getWeatherAndPacking } from '../controllers/weatherController.js';

const router = express.Router();

router.post('/', getWeatherAndPacking);

export default router;
