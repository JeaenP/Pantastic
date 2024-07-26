import express from 'express';
import { addEvent, listEvents, removeEvent } from '../controllers/eventController.js';
import upload from '../config/s3.js'; // Asegúrate de que el path sea correcto

const router = express.Router();

router.post('/add', upload.single('image'), addEvent); // Use upload middleware
router.get('/list/:clubId', listEvents);
router.delete('/remove', removeEvent); // Agregar ruta para eliminar eventos

export default router;
