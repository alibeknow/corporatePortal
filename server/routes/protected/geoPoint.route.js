import { Router } from 'express';

import GeoPointController from '../../controllers/GeoPoint.controller';
import handleAsyncError from '../../helpers/handleAsyncError';
import validate from '../../utils/routeValidation';

const router = new Router();

router.post(
  '/',

  handleAsyncError(GeoPointController.saveCoordinates),
);
router.get(
  '/',

  handleAsyncError(GeoPointController.getPoints),
);

export default router;
