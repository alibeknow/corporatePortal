import express from 'express';
import { validate } from 'express-validation';

import paramValidation from '../config/param-validation';
import UserCtrl from '../controllers/User.controller';
import handleAsyncError from '../helpers/handleAsyncError';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', handleAsyncError(UserCtrl.list));
router.post(
  '/',
  validate(paramValidation.createUser),
  handleAsyncError(UserCtrl.create),
);

router.get('/:userId', handleAsyncError(UserCtrl.get));

router.put(
  '/:userId',
  validate(paramValidation.updateUser),
  handleAsyncError(UserCtrl.update),
);

router.delete('/:userId', handleAsyncError(UserCtrl.remove));

/** Load user when API with userId route parameter is hit */
router.param('userId', handleAsyncError(UserCtrl.load));

export default router;
