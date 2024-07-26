// routes/clubRoute.js
import express from 'express';
import { joinClub, getUserClubs, listClubs } from '../controllers/clubController.js';

const router = express.Router();

router.post('/join', joinClub);
router.get('/user/:userId', getUserClubs);
router.get('/list', listClubs);

export default router;
