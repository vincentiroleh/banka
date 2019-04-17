import express from 'express';
import UserController from '../controllers/userController';
import AccountController from '../controllers/accountController';
// import Auth from '../auth/auth';

const route = express.Router();

// ====================================== USER AUTHENTICATION =============================
route.post('/api/v1/auth/signup', UserController.signUp);
route.post('/api/v1/auth/signin', UserController.signIn);

// ====================================== ACCOUNT CONTROLLER =============================
route.post('/api/v1/accounts', AccountController.createAccount);
route.patch('api/v1/account/:accountNumber', AccountController.updateAccount);
route.get('/api/v1/accounts', AccountController.getAllAccount);
route.get('api/v1/accounts/:accountNumber', AccountController.getAccount);
route.delete('api/v1/accounts/:accountNumber', AccountController.deleteAccount);

export default route;
