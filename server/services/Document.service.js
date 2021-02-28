const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const pdf = require("html-pdf");
var conversion = require("phantom-html-to-pdf")();
const {signPdf} = require("../utils/signPDF")

export default class DocumentService {
  static async PdfGenerate(data, res) {
   console.log(data)
  //  

console.log(path.join(process.cwd(), 'views', 'report-template.ejs'))
   ejs.renderFile(path.join(process.cwd(), 'documentTemplates', 'report-template.ejs'), {data: data}, (err, data) => {
     console.log('render pdf')
    if (err) {
      console.log('error', err)
          return new Error()
    } else {
        let options = {
            "height": "297mm",
            "width": "210mm",
            "header": {
                "height": "20mm"
            },
            "footer": {
                "height": "20mm",
            },
        };
        console.log('create pdf')
        // if (fs.existsSync(path.join(process.cwd(), 'documentTemplates', 'report.pdf'))) {
        //   fs.unlink(path.join(process.cwd(), 'documentTemplates', 'report.pdf'), (err) => {
        //     if (err) throw err;
        //   });
        // }
        pdf.create(data, options).toFile(path.join(process.cwd(), 'documentTemplates', 'report.pdf'), async function (err, data) {
            if (err) {
              console.log(err)
               return new Error()
            } else {

          const response =  await  signPdf(data) 
          console.log(response)
            //           var file = fs.createReadStream(path.join(process.cwd(), 'documentTemplates', 'report.pdf'));
            // var stat = fs.statSync(path.join(process.cwd(), 'documentTemplates', 'report.pdf'));
            // res.setHeader('Content-Length', stat.size);
            // res.setHeader('Content-Type', 'application/pdf');
            // res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
            // file.pipe(res);
               res.json({'message': 'ok'})
            }
        });
       
    }
});


 
  }
}
