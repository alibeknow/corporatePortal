import { Router } from 'express';

import AuthController from '../controllers/Auth.controller';
import handleAsyncError from '../helpers/handleAsyncError';
import validate from '../utils/routeValidation';

const router = new Router();
/**
 * @api {post} /api/v1.0/login Аутентификация пользователя
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Auth
 * @apiParam (Body) {Object} request
 * @apiParam (Body) {String} request.login логин пользователя
 * @apiParam (Body) {String} request.password  пароль от ad или пароль от системы
 *
 * @apiParamExample {json} Body
 *  {
 *      "login":"nauryzal",
 *      "password":"123321"
 *  }
 *
 *
 * @apiSuccess (Success 200) {Object} request
 * @apiSuccess (Success 200) {String} request.token
 * @apiSuccess (Success 200) {String} request.refreshToken
 * @apiSuccessExample {json} Пример ответа:
 *     HTTP/1.1 200 OK
 *    {
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0M2ZmNWU3LTRmNjctNDk0My05OTk2LTc5OGIwODcyN2Y2MyIsImxvZ2luIjoibmF1cnl6YWwiLCJmaW8iOm51bGwsImVtYWlsIjpudWxsLCJwaG9uZSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMC0wOS0wOFQwNToxOTo1NC41NDdaIiwidXBkYXRlZEF0IjoiMjAyMC0wOS0wOFQwNToxOTo1NC41NDdaIiwiZGVwYXJ0bWVudElkIjpudWxsLCJzdGF0dXNJZCI6bnVsbCwid29ya1Bvc2l0aW9uSWQiOm51bGwsIm1hbmFnZXJJZCI6bnVsbCwiaWF0IjoxNTk5NTU3NzUzLCJleHAiOjE1OTk5MTc3NTMsImp0aSI6IjNhMWM5YTMxLTM2M2ItNGM5YS04ZDQ5LTE4ZGY2N2MwZDM0YSJ9.HwbQyKYoI5xyR2AZQqyJ1HWnuOOmsPZsqrVMnIdFImA",
 *       "refreshToken": "6ce53547-45d3-48ac-be5c-2ac9781928d4"
 *   }
 */
router.post('/login', validate('login', 'body'), handleAsyncError(AuthController.login));
/**
 * @api {get} /api/v1.0/logout Выход из системы
 * @apiVersion 1.0.0
 * @apiName Logout
 * @apiGroup Auth
 * @apiSuccessExample {string}  Пример ответа:
 *     HTTP/1.1 200 OK
 *      OK
 */
router.get('/logout', handleAsyncError(AuthController.logout));
/**
 * @api {post} /api/v1.0/refresh Обновить токен
 * @apiVersion 1.0.0
 * @apiName RefreshToken
 * @apiGroup Auth
 *
 * @apiParam (Body) {Object} request
 * @apiParam (Body) {String} request.token
 * @apiParam (Body) {String} request.refreshToken
 *
 * @apiSuccess (Success 200) {Object} request
 * @apiSuccess (Success 200) {String} request.token
 * @apiSuccess (Success 200) {String} request.refreshToken
 *
 * @apiSuccessExample {json}  Пример ответа:
 *     HTTP/1.1 200 OK
 *    {
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0M2ZmNWU3LTRmNjctNDk0My05OTk2LTc5OGIwODcyN2Y2MyIsImxvZ2luIjoibmF1cnl6YWwiLCJmaW8iOm51bGwsImVtYWlsIjpudWxsLCJwaG9uZSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMC0wOS0wOFQwNToxOTo1NC41NDdaIiwidXBkYXRlZEF0IjoiMjAyMC0wOS0wOFQwNToxOTo1NC41NDdaIiwiZGVwYXJ0bWVudElkIjpudWxsLCJzdGF0dXNJZCI6bnVsbCwid29ya1Bvc2l0aW9uSWQiOm51bGwsIm1hbmFnZXJJZCI6bnVsbCwiaWF0IjoxNTk5NTU3NzUzLCJleHAiOjE1OTk5MTc3NTMsImp0aSI6IjNhMWM5YTMxLTM2M2ItNGM5YS04ZDQ5LTE4ZGY2N2MwZDM0YSJ9.HwbQyKYoI5xyR2AZQqyJ1HWnuOOmsPZsqrVMnIdFImA",
 *       "refreshToken": "6ce53547-45d3-48ac-be5c-2ac9781928d4"
 *   }
 */
router.post('/refresh', validate('refresh', 'body'), handleAsyncError(AuthController.refresh));

export default router;
