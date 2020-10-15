import { Router } from "express";

import GeoPointController from "../controllers/GeoPoint.controller";
import handleAsyncError from "../helpers/handleAsyncError";
import validate from "../utils/routeValidation";

const router = new Router();

router.post(
  "/geopoint",
  validate("savePoint", "body"),
  handleAsyncError(GeoPointController.saveCoordinates)
);
router.get(
  "/geopoint",
  validate("getPoint", "params"),
  handleAsyncError(GeoPointController.getPoints)
);
