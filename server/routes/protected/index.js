import { Router } from 'express';

const router = new Router();

/* TODO */
router.get('/test', (req, res) => res.json('Protected route'));


export default router;
