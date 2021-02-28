import { Router } from 'express';

import GeoPointController from '../../controllers/GeoPoint.controller';
import handleAsyncError from '../../helpers/handleAsyncError';
import validate from '../../utils/routeValidation';
import DocumentController from '../../controllers/Document.controller';
import path from 'path'

const router = new Router();



/**
 * @api {post} /api/v1.0/document Генерация pdf
 * @apiVersion 1.0.0
 * @apiName generate pdf
 * @apiGroup Documents
 * @apiParam (Body) {Object} request
 * @apiParam (Body) {Object} request.pointStart координаты начальной точки
 * @apiParam (Body) {String} request.pointStart.lat  широта начальной точки
 * @apiParam (Body) {String} request.pointStart.lng долгота начальной точки
 *  @apiParam (Body) {Object} request.pointEnd координаты конечной точки
 * @apiParam (Body) {String} request.pointEnd.lat  широта конечной точки
 * @apiParam (Body) {String} request.pointEnd.lng долгота конечной точки
 * @apiParam (Body) {String} request.distance дистанция
 *
 * @apiParamExample {json} Body
 *  {pointStart: {lat: "51.039519",
 *  lng: "71.839215"}, 
 * pointEnd: {lat: "75.76", lng: "55.57"}, 
 * distance: "1023"}
 *
 *
 * 
 * @apiSuccessExample {json} Пример ответа:
 *     HTTP/1.1 200 OK
 *    
 */



router.post(
  '/', handleAsyncError(DocumentController.PdfGenerate),
);




/**
 * @api {get} /api/v1.0/document Получение pdf
 * @apiVersion 1.0.0
 * @apiName  GetPdf
 * @apiGroup Documents
 *
 *
 * 
 * @apiSuccessExample {json} Пример ответа:
 *     HTTP/1.1 200 OK
 *    bynary формат pdf
 */






router.get('/', (req, res)=> {
    res.download(path.join(process.cwd(), 'documentTemplates', 'report-sign.pdf'))
})


export default router;