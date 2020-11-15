import request from 'request'
import fs from 'fs'

export default function (uri, filename) {
  return new Promise((resolve, reject)=> {
    if(!uri) return
    request.head(uri, (err, res, body) => {
      console.log(body);
      if(!res) return
      request(uri).pipe(fs.createWriteStream(`${process.cwd()}/uploads/${filename}.${res.headers['content-type'].split('/')[1]}`)
      .on('finish', ()=> resolve(`${filename}.${res.headers['content-type'].split('/')[1]}`)));
     console.log(res.headers['content-type'])
      console.log('--------',filename)

    });
  })

}
