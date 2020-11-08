

export default function (uri, filename, callback) {
  new Promise((resolve, reject)=> {
    request.head(uri, (err, res, body) => {
      console.log(body);
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  })
  
}
