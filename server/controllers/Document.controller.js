import DocumentService from '../services/Document.service';
import path from 'path'
import fs from 'fs'


export default class DocumentController {
  static async PdfGenerate(req, res) {
    console.log('pdf controller');
    const result = await DocumentService.PdfGenerate(req.body, res);
//     var file = fs.createReadStream(path.join(process.cwd(), 'documentTemplates', 'report.pdf'));
// var stat = fs.statSync(path.join(process.cwd(), 'documentTemplates', 'report.pdf'));
// res.setHeader('Content-Length', stat.size);
// res.setHeader('Content-Type', 'application/pdf');
// res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
// file.pipe(res);
    //res.download(path.join(process.cwd(), 'documentTemplates', 'report.pdf'))
  }
}