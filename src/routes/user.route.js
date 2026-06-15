import {Router} from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const userRouter = Router();

// Register a new user
userRouter.post('/register', registerUser);

// Login user
userRouter.post('/login', authMiddleware, loginUser);

// Logout user
userRouter.post('/logout', authMiddleware, logoutUser);

export default userRouter;