import { Router } from 'express';

import GeoPointController from '../../controllers/GeoPoint.controller';
import handleAsyncError from '../../helpers/handleAsyncError';
import validate from '../../utils/routeValidation';

const router = new Router();



/**
 * @api {post} /api/v1.0/geopoints Сохранение маркеров
 * @apiVersion 1.0.0
 * @apiName SavePoint
 * @apiGroup Geopoints
 * @apiParam (Body) {Object} request
 * @apiParam (Body) {String} request.coordinates координаты точки
 * @apiParam (Body) {String} request.name  название точки
 * @apiParam (Body) {String} request.userId id пользователя
 * @apiParam (Body) {String} request.cityId id города
 *
 * @apiParamExample {json} Body
 *  {coordinates: "{"type":"Point","coordinates":[67.37372781934197,50.90264982537054]}", name: "",…}
 *  cityId: "f49475bc-806a-490b-bef6-548896e3707c"
 *  coordinates: "{"type":"Point","coordinates":[67.37372781934197,50.90264982537054]}"
 *  name: ""
 *    userId: "ac4c2ae2-da4d-4180-b8ad-9fd5ff1f1af6"
 *   }
 *
 *
 * 
 * @apiSuccessExample {json} Пример ответа:
 *     HTTP/1.1 200 OK
 *    
 */


router.post(
  '/',

  handleAsyncError(GeoPointController.saveCoordinates),
);


/**
 * @api {get} /api/v1.0/geopoints Получение маркеров
 * @api {get} /api/v1.0/geopoints?include=["dc4da5bb-b982-42db-9aa6-8bc912ef63bf"] Получение маркеров с параметрами (id фильтров находятся в ручке /filterList)
 * @apiVersion 1.0.0
 * @apiName GetPoint
 * @apiGroup Geopoints
 * @apiParam (Query) {Object} request
 * @apiParam (Body) {Object} request.include фильтры для исключения точек из отображения
 *
 * @apiSuccessExample {string}  Пример ответа :
 *     HTTP/1.1 200 OK
 * {
 *       "id": "d6c13e05-9567-421f-87cf-269bf90ae36c",
 *       "name": "АЗС",
       "coordinates": {
            "crs": {
                "type": "name",
                "properties": {
                    "name": "EPSG:4326"
                }
            },
            "type": "Point",
            "coordinates": [
                66.490531,
                44.309747
            ]
        },
        "description": [
            {
                "description": "а/д М-32 \"Самара - Шымкент\" км 1912"
            },
            {
                "description": "•\tАЗС"
            },
            {
                "description": "•\tБлагоустроенный туалет"
            },
            {
                "description": "•\tПункт питания"
            },
            {
                "description": "•\tПункт торговли"
            }
        ],
        "google_link": "https://doc-0k-74-mymaps.googleusercontent.com/untrusted/hostedimage/4rqmfusq8uon05u629sqh6vmnc/e165uorjcn5cq7kkovan3amdlg/1612011631750/gQiRn_6Omltyf39wfZq2etj-mkyk2Kep/16939438719077467790/5AF2TALq9zpmB9iSn1Dt2HoMt-OxU1VrvL0fcQaVKCgAjKqdGq-Wyze9GF9qRh6XAkv9AmZKg90u4zfwcb2rgKXOu01Q8W-SGACelZ6xq_RZOSFGywXU-6AJHiAJTdxU3_2zt3SGin1T3Fl9k6NESkbJ79ofDDCuhGO-7k1G0iIqAgTGYOI9X53b4BkbN6-X7sSxar-j22eM3SLUMpPfUiSBKarpZnAoL4XEe1pwHwhevwq9vWgYL-cxY5i_BhH_WcdbS5PcH2i03K9U3snELkpLZqSSpRmri8g?session=0&fife",
        "file_id": "16494d5a-33b6-4582-95d9-8c6269e78e66",
        "file_name": "Карта Объектов придорожного сервиса Жол бойындағы сервис объектілерінің картасыRoadside service facilities.kmz",
        "createdAt": "2021-02-24T09:27:32.938Z",
        "updatedAt": "2021-02-24T09:27:32.938Z",
        "cityId": null,
        "userId": "ac4c2ae2-da4d-4180-b8ad-9fd5ff1f1af6",
        "uploads": [
            {
                "id": "8c5bab8d-92cf-4817-b3d9-a66c3de55a2f",
                "image": "9489dd0d-576f-4f8d-b99f-ad1e669ef5eb.png",
                "createdAt": "2021-02-24T09:27:36.398Z",
                "updatedAt": "2021-02-24T09:27:36.398Z",
                "geoPointId": "d6c13e05-9567-421f-87cf-269bf90ae36c"
            }
        ]
    },
 *      
 */


 /**
 * @api {get} /api/v1.0/geopoints Получение маркеров
 * @apiVersion 1.0.0
 * @apiName GetPoinеNoParams
 * @apiGroup Geopoints
 *
 * @apiSuccessExample {string}  Пример ответа :
 *     HTTP/1.1 200 OK
 * {
        "id": "d6c13e05-9567-421f-87cf-269bf90ae36c",
        "name": "АЗС",
        "coordinates": {
            "crs": {
                "type": "name",
                "properties": {
                    "name": "EPSG:4326"
                }
            },
            "type": "Point",
            "coordinates": [
                66.490531,
                44.309747
            ]
        },
        "description": [
            {
                "description": "а/д М-32 \"Самара - Шымкент\" км 1912"
            },
            {
                "description": "•\tАЗС"
            },
            {
                "description": "•\tБлагоустроенный туалет"
            },
            {
                "description": "•\tПункт питания"
            },
            {
                "description": "•\tПункт торговли"
            }
        ],
        "google_link": "https://doc-0k-74-mymaps.googleusercontent.com/untrusted/hostedimage/4rqmfusq8uon05u629sqh6vmnc/e165uorjcn5cq7kkovan3amdlg/1612011631750/gQiRn_6Omltyf39wfZq2etj-mkyk2Kep/16939438719077467790/5AF2TALq9zpmB9iSn1Dt2HoMt-OxU1VrvL0fcQaVKCgAjKqdGq-Wyze9GF9qRh6XAkv9AmZKg90u4zfwcb2rgKXOu01Q8W-SGACelZ6xq_RZOSFGywXU-6AJHiAJTdxU3_2zt3SGin1T3Fl9k6NESkbJ79ofDDCuhGO-7k1G0iIqAgTGYOI9X53b4BkbN6-X7sSxar-j22eM3SLUMpPfUiSBKarpZnAoL4XEe1pwHwhevwq9vWgYL-cxY5i_BhH_WcdbS5PcH2i03K9U3snELkpLZqSSpRmri8g?session=0&fife",
        "file_id": "16494d5a-33b6-4582-95d9-8c6269e78e66",
        "file_name": "Карта Объектов придорожного сервиса Жол бойындағы сервис объектілерінің картасыRoadside service facilities.kmz",
        "createdAt": "2021-02-24T09:27:32.938Z",
        "updatedAt": "2021-02-24T09:27:32.938Z",
        "cityId": null,
        "userId": "ac4c2ae2-da4d-4180-b8ad-9fd5ff1f1af6",
        "uploads": [
            {
                "id": "8c5bab8d-92cf-4817-b3d9-a66c3de55a2f",
                "image": "9489dd0d-576f-4f8d-b99f-ad1e669ef5eb.png",
                "createdAt": "2021-02-24T09:27:36.398Z",
                "updatedAt": "2021-02-24T09:27:36.398Z",
                "geoPointId": "d6c13e05-9567-421f-87cf-269bf90ae36c"
            }
        ]
    },
 *      
 */


router.get(
  '/',

   handleAsyncError(GeoPointController.getPointsByCity),
);


/**
 * @api {post} /api/v1.0/geopoints/image Получение картинок для маркера
 * @apiVersion 1.0.0
 * @apiName Image
 * @apiGroup Geopoints
 * @apiParam (Body) {Object} request
 * @apiParam (Body) {String} request.id  id маркера для которого получаем картинки
 *
 * @apiParamExample {json} Body
 * {"id":"a10a781b-e996-4c80-919c-964bfc40724b"}
 *
 *
 * 
 * @apiSuccessExample {json} Пример ответа:
 *     HTTP/1.1 200 OK
 *    
 */


router.post(
  '/image',
  handleAsyncError(GeoPointController.getImage)
)


/**
 * @api {post} /api/v1.0/geopoints/saveImage Сохранение картинки для маркера
 * @apiVersion 1.0.0
 * @apiName SaveImage
 * @apiGroup Geopoints
 * @apiParam (Body) {Object} request
 * @apiParam (Body) {Binary} request.file картинка расширение .png
 * @apiParam (Body) {String} request.pointId  id маркера для которой сохраняется картинка тип uuid
 *
 * @apiParamExample {json} Body
 * { 
 *  file: (binary)
 *  pointId: a10a781b-e996-4c80-919c-964bfc40724b
 * }
 *
 *
 * 
 * @apiSuccessExample {json} Пример ответа:
 *     HTTP/1.1 200 OK
 *    
 */

router.post(
  '/saveImage',
  handleAsyncError(GeoPointController.saveImage)
)


/**
 * @api {post} /api/v1.0/geopoints/upload Сохранение файла точек формата kml kmz
 * @apiVersion 1.0.0
 * @apiName Upload
 * @apiGroup Geopoints
 * @apiParam (Body) {Object} request
 * @apiParam (Body) {Binary} request.file файл точек расширение kml, kmz
 * @apiParam (Body) {String} request.userId  id пользователя, сохраняющего файл тип uuid
 *
 * @apiParamExample {json} Body
 * { 
 *  file: (binary)
 *  userId: ac4c2ae2-da4d-4180-b8ad-9fd5ff1f1af6
 * }
 *
 *
 * 
 * @apiSuccessExample {json} Пример ответа:
 *     HTTP/1.1 200 OK
 *    
 */

router.post('/upload',
  handleAsyncError(GeoPointController.uploadFile));


  /**
 * @api {post} /api/v1.0/geopoints/roadRoute Построение маршрута
 * @apiVersion 1.0.0
 * @apiName roadRoute
 * @apiGroup Geopoints
 * @apiParam (Body) {Object} request
 * @apiParam (Body) {Binary} request.lat1 широта начальной точки
 * @apiParam (Body) {String} request.lat2  широта конечной точки
 * @apiParam (Body) {Binary} request.lng1 долгота начальной точки
 * @apiParam (Body) {String} request.lng2  долгота конечной точки
 *
 * @apiParamExample {json} Body
 * { 
 *  lat1: 51.14744837774378
 *   lat2: 50.7500710309029
 *   lng1: 71.62926251226952
 *   lng2: 72.27628391490687
 * }
 *
 *
 * 
 * @apiSuccessExample {json} Пример ответа:
 *     HTTP/1.1 200 OK
 *    {"result":{"hints":{"visited_nodes.sum":103,"visited_nodes.average":103},
 *      "info":{"copyrights":["GraphHopper","OpenStreetMap contributors"],
 *      "took":239},"paths":[{"distance":66138.204,"weight":2274.192053,"time":2274150,
 * "transfers":0,"points_encoded":false,"bbox":[71.618199,50.750117,72.276368,51.147624],
 * "points":{"type":"LineString","coordinates":[[71.630605,51.147624],[71.630731,51.147245],
 * [71.630841,51.146788],[71.630883,51.146276],[71.630902,51.145767]]},
 * "instructions":[{"distance":2586.345,"heading":168.22,"sign":0,"interval":[0,14],
 * "text":"Продолжите движение по Объездная улица, 
 * P-10","time":122027,"street_name":"Объездная улица, P-10"},
 * {"distance":63551.859,"sign":7,"interval":[14,104],
 * "text":"Держитесь правее на M-36","time":2152123,"street_name":"M-36"},
 * {"distance":0,"sign":4,"last_heading":139.08550476800735,"interval":[104,104],"text":"Цель достигнута!","time":0,"street_name":""}],
 * "legs":[],"details":{},"ascend":0,"descend":0,"snapped_waypoints":{"type":"LineString","coordinates":[[71.630605,51.147624],[72.276368,50.750117]]}}]}}
 */



router.post('/roadRoute', 
handleAsyncError(GeoPointController.roadRoute));




 /**
 * @api {get} /api/v1.0/filterList Получение списка фильтров (нужно для получения маркеров с параметрами)
 * @apiVersion 1.0.0
 * @apiName FilterList
 * @apiGroup Geopoints
 *
 * @apiSuccessExample {string}  Пример ответа :
 *     HTTP/1.1 200 OK
 * [
 * {
 * "file_id":"872beb0a-5d43-4472-aa24-e3d2b205de63",
 * "file_name":"Карта Объектов придорожного сервиса Жол бойындағы сервис объектілерінің картасыRoadside service facilities.kmz"},{"file_id":"4ee5a1ef-171e-4142-8e6b-c21d0dfcfcf2","file_name":"Карта  Map.kmz"},
 * {"file_id":null,"file_name":null},
 * {"file_id":"16494d5a-33b6-4582-95d9-8c6269e78e66",
 * "file_name":"Карта Объектов придорожного сервиса Жол бойындағы сервис объектілерінің картасыRoadside service facilities.kmz"
 * }
 * ]
 *      
 */





router.get(
  '/filterList',
  handleAsyncError(GeoPointController.getGeoPointFilter),
);

export default router;
