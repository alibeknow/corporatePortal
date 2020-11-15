import fs from 'fs'
import unzipper from 'unzipper'

export default function readFileAsyncUtil(from, to) {
  return new Promise((resolve, reject)=> {
    fs.createReadStream(from)
            .pipe(unzipper.Extract({ path: to }))
            .on('finish', ()=> {
              resolve()
            })


  })
}
