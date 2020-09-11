import { Router } from 'express';

import UserController from '../../controllers/User.controller';
import handleAsyncError from '../../helpers/handleAsyncError';
import validate from '../../utils/routeValidation';

const router = new Router();

/**
 * @api {post} /get-users Список пользователей
 * @apiName /get-users
 * @apiGroup users
 * @apiVersion 1.0.0

 * @apiParam (Body) {Object} request - не обязательный параметр
 * @apiParam (Body) {number} request.page default 1
 * @apiParam (Body) {number} request.limit default 50
 * @apiParam (Body) {Object} request.filters - не обязательный параметр
 * @apiParam (Body) {String} request.filters.fio фамилия имя отчество
 * @apiParam (Body) {String} request.filters.departmentName  наименование департамента
 * @apiParam (Body) {String} request.filters.phone  номер телефона

 *
 * @apiParamExample {json} Body
 *      {
 *    "filters":{
 *    "departmentName":'Бухгалтерия',
 *    "fio":'Иванов иван иванович',
 *    "phone":"87570999431",
 *    },
 *    "page":1,
 *    "limit":50
 *
 *      }
 *
 *
 * @apiSuccess (Success 200) {Object} request
 * @apiSuccess (Success 200) {number} request.totalItems
 * @apiSuccess (Success 200) {array}  request.tutorials
 * @apiSuccess (Success 200) {string}  request.tutorials[0].fio
 * @apiSuccess (Success 200) {string}  request.tutorials[0].phone
 * @apiSuccess (Success 200) {object}  request.tutorials[0].userdata
 * @apiSuccess (Success 200) {string}  request.tutorials[0].userdata.registration
 * @apiSuccess (Success 200) {object}  request.tutorials[0].workPosition
 * @apiSuccess (Success 200) {string}  request.tutorials[0].workPosition.name
 * @apiSuccess (Success 200) {object}  request.tutorials[0].department
 * @apiSuccess (Success 200) {string}  request.tutorials[0].department.name
 * @apiSuccessExample {json} Пример ответа:
 *     HTTP/1.1 200 OK
 *   {
 *   "count": 11,
 *   "rows": [
 *       {
 *           "fio": null,
 *           "phone": null,
 *           "workPosition": null,
 *           "userData": null,
 *           "department": null
 *       },
 *       {
 *           "fio": "Белова Tressa",
 *           "phone": "(961)268-74-07",
 *           "workPosition": null,
 *           "userData": {
 *               "registration": "Suite 219"
 *           },
 *           "department": null
 *       }
 *     ]
 */
router.post('/get-users', validate('getUsers', 'body'),
  handleAsyncError(UserController.getUsers));

/**
 * @api {post} /:id детальная информация пользователя
 * @apiName findbyPk
 * @apiGroup Users
 * @apiVersion 1.0.0

 * @apiParam (Body) {string} id - ID пользователя
 *
 *
 *
 * @apiSuccess (Success 200) {Object} request
 * @apiSuccess (Success 200) {number} request.totalItems
 * @apiSuccess (Success 200) {array}  request.tutorials
 * @apiSuccess (Success 200) {string}  request.tutorials[0].fio
 * @apiSuccess (Success 200) {string}  request.tutorials[0].phone
 * @apiSuccess (Success 200) {object}  request.tutorials[0].userdata
 * @apiSuccess (Success 200) {string}  request.tutorials[0].userdata.registration
 * @apiSuccess (Success 200) {object}  request.tutorials[0].workPosition
 * @apiSuccess (Success 200) {string}  request.tutorials[0].workPosition.name
 * @apiSuccess (Success 200) {object}  request.tutorials[0].department
 * @apiSuccess (Success 200) {string}  request.tutorials[0].department.name
 * @apiSuccessExample {json} Пример ответа:
 *     HTTP/1.1 200 OK
 *   {
 *   "count": 11,
 *   "rows": [
 *       {
 *           "fio": null,
 *           "phone": null,
 *           "workPosition": null,
 *           "userData": null,
 *           "department": null
 *       },
 *       {
 *           "fio": "Белова Tressa",
 *           "phone": "(961)268-74-07",
 *           "workPosition": null,
 *           "userData": {
 *               "registration": "Suite 219"
 *           },
 *           "department": null
 *       }
 *     ]
 */
router.get('/:id', validate('getUser', 'params'),
  handleAsyncError(UserController.getUser));
export default router;
