import { Router } from 'express';

import GeoPointController from '../../controllers/GeoPoint.controller';
import handleAsyncError from '../../helpers/handleAsyncError';
import validate from '../../utils/routeValidation';
import CityController from '../../controllers/City.contoller';

const router = new Router();

router.get(
  '/',

  handleAsyncError(CityController.getCities),
);
router.get(
  '/:id',
  validate('getPoint', 'params'),
  handleAsyncError(GeoPointController.getPoints),
);

export default router;
