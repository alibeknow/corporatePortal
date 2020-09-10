import { Router } from 'express';

import userRoute from './user.route';

const router = new Router();

/* TODO */
router.get('/test', (req, res) => res.json('Protected route'));
router.use('/users', userRoute);

export default router;
