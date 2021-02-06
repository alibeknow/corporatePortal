const fetch = require('node-fetch');

const FormData = require('form-data');
const fs = require('fs')
const path = require('path')

const form = new FormData();


export async function signPdf({filename}) {
    return new Promise(async (resolve, reject)=> {
      if(!filename) return


      const form = new FormData();
form.append('file', fs.createReadStream(filename));
form.append('p12', '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');
form.append('password', 'Aa123456');
const response = await fetch('http://10.0.85.60:8080/file/v1/uploadFile', {method: 'POST', body: form});

response.body.pipe(fs.createWriteStream(path.join(process.cwd(), 'documentTemplates', 'report-sign.pdf')))
.on('finish', ('finish', ()=> {resolve(path.join(process.cwd(), 'documentTemplates', 'report-sign.pdf'))}))

   
    })
    }