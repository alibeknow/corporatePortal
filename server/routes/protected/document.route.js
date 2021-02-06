import { Router } from 'express';

import GeoPointController from '../../controllers/GeoPoint.controller';
import handleAsyncError from '../../helpers/handleAsyncError';
import validate from '../../utils/routeValidation';
import DocumentController from '../../controllers/Document.controller';
import path from 'path'

const router = new Router();

router.post(
  '/', handleAsyncError(DocumentController.PdfGenerate),
);

router.get('/', (req, res)=> {
    res.download(path.join(process.cwd(), 'documentTemplates', 'report-sign.pdf'))
})


export default router;