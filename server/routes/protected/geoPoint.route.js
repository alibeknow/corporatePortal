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

router.get(
  '/:id',

  handleAsyncError(GeoPointController.getPointsByCity),
);

router.post(
  '/image',
  handleAsyncError(GeoPointController.getImage)
)

router.post('/upload',
  handleAsyncError(GeoPointController.uploadFile));

router.post('/roadRoute', 
handleAsyncError(GeoPointController.roadRoute));

export default router;
