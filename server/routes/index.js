import express from 'express';
import UserController from '../controllers/user.controller';

const route = express.Router();

// ====================================== USER AUTHENTICATION =============================
route.post('/api/v1/auth/signup', UserController.signUp);

export default route;
