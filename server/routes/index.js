import express from 'express';
import UserController from '../controllers/userController';
import AccountController from '../controllers/accountController';
import Auth from '../auth/auth';

const route = express.Router();

// ====================================== USER AUTHENTICATION =============================
route.post('/api/v1/auth/signup', UserController.signUp);
route.post('/api/v1/auth/signin', UserController.signIn);

// ====================================== USER AUTHENTICATION =============================
route.post('/api/v1/accounts', AccountController.create);

export default route;
