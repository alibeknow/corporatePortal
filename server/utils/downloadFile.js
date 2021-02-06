import request from 'request'
import fs from 'fs'

export default function (uri, filename) {
  return new Promise((resolve, reject)=> {
    if(!uri) return
    request.head(uri, (err, res, body) => {
      console.log(res.headers['content-type'].split('/')[1]);
      if(!res || res.headers['content-type'].split('/')[1] !== 'png') {
        console.log('This is html page***')
        resolve(null)
      }else {
        request(uri).pipe(fs.createWriteStream(`${process.cwd()}/uploads/${filename}.${res.headers['content-type'].split('/')[1]}`)
        .on('finish', ()=> resolve(`${filename}.${res.headers['content-type'].split('/')[1]}`)));
      
      }
     

    });
  })

}
