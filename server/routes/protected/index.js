import { Router } from 'express';

import userRoute from './user.route';
import geoPoints from './geoPoint.route';
import cityRoute from './cityRoute';
import documentRoute from './document.route'

const router = new Router();

/* TODO */
router.get('/test', (req, res) => res.json('Protected route'));
router.use('/users', userRoute);
router.use('/geopoints', geoPoints);
router.use('/city', cityRoute);
router.use('/document', documentRoute)
export default router;
