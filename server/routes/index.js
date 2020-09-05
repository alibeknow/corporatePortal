import { Router } from 'express';

import { isAuthenticated } from '../middlewares';

import authRoutes from './auth.route';
import protectedRoutes from './protected';

const router = new Router();

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);

/* Все остальные роуты делаем защищенными */
router.use('/', isAuthenticated, protectedRoutes);

export default router;
