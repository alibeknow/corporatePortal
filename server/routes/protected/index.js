import { Router } from 'express';

import userRoute from './user.route';
import geoPoints from './geoPoint.route';

const router = new Router();

/* TODO */
router.get('/test', (req, res) => res.json('Protected route'));
router.use('/users', userRoute);
router.use('/geopoints', geoPoints);
export default router;
