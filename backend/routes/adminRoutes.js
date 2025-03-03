import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addUser } from '../controllers/adminController.js';



const router = express.Router();

router.post('/create' ,protect, addUser);

export default router;