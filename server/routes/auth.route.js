import express from 'express';
import expressJwt from 'express-jwt';

import AuthCtrl from '../controllers/Auth.controller';
import config from '../config/config';
import handleAsyncError from '../helpers/handleAsyncError';

const router = express.Router(); // eslint-disable-line new-cap

/**
 * POST /api/auth/login - Returns token if correct username and password is provided
 */

router.post('/login', handleAsyncError(AuthCtrl.login));

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header.
 * Authorization: Bearer {token}
 */
router.get(
  '/random-number',
  expressJwt({
    secret: config.jwtSecret,
    algorithms: ['RS256'],
  }),
  handleAsyncError(AuthCtrl.getRandomNumber),
);

export default router;
