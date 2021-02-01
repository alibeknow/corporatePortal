const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
let ejs = require("ejs");
let pdf = require("html-pdf");

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
            "height": "11.25in",
            "width": "8.5in",
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
        pdf.create(data, options).toFile(path.join(process.cwd(), 'documentTemplates', 'report.pdf'), function (err, data) {
            if (err) {
              console.log(err)
               return new Error()
            } else {
              console.log('***********',data)
                
            //           var file = fs.createReadStream(path.join(process.cwd(), 'documentTemplates', 'report.pdf'));
            // var stat = fs.statSync(path.join(process.cwd(), 'documentTemplates', 'report.pdf'));
            // res.setHeader('Content-Length', stat.size);
            // res.setHeader('Content-Type', 'application/pdf');
            // res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
            // file.pipe(res);
               res.json({'message': 'file created'})
            }
        });
       
    }
});


 
  }
}
