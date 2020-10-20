import { Router } from 'express';

import GeoPointController from '../../controllers/GeoPoint.controller';
import handleAsyncError from '../../helpers/handleAsyncError';
import validate from '../../utils/routeValidation';

const router = new Router();

router.post(
  '/',
  validate('savePoint', 'body'),
  handleAsyncError(GeoPointController.saveCoordinates),
);
router.get(
  '/:id',
  validate('getPoint', 'params'),
  handleAsyncError(GeoPointController.getPoints),
);

export default router;
