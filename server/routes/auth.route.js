import { Router } from 'express';

import AuthController from '../controllers/Auth.controller';
import handleAsyncError from '../helpers/handleAsyncError';
import validate from '../utils/routeValidation';

const router = new Router();

router.post('/login', validate('login', 'body'), handleAsyncError(AuthController.login));
router.get('/logout', handleAsyncError(AuthController.logout));
router.post('/refresh', validate('refresh', 'body'), handleAsyncError(AuthController.refresh));


export default router;
