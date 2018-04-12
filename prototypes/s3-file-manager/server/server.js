const express = require('express')

const cors = require('cors')
const AWS = require('aws-sdk');

var credentials = new AWS.SharedIniFileCredentials({profile: 'labapp'})
AWS.config.credentials = credentials
const s3 = new AWS.S3()


const app = express()
const bucket = 'labapp-uploads'


app.use(cors())

app.get('/', (req, res) => {

  s3.listObjectsV2({Bucket: bucket}, (err,data)=>{
    if(err) {
      console.log(err)
      res.json(err)
    } else{
      res.json(data)
    }
  })

})
app.get('/:key', (req, res) => {
  //https://stackoverflow.com/questions/35782434/streaming-file-from-s3-with-express-including-information-on-length-and-filetype
  console.log("getting:", req.params.key)
  var params = {
    Bucket: bucket,
    Key: req.params.key
  }
  s3.headObject(params, (err,data)=>{
    if(err) {
      console.log(err)
      res.json(err)
    } else{
      var stream = s3.getObject(params).createReadStream()

      //res.set('Content-Type', mime.lookup(key));
      res.set('Content-Length', data.ContentLength);
      res.set('Last-Modified', data.LastModified);
      res.set('ETag', data.ETag);

      res.attachment(req.params.key)
      stream.pipe(res)
    }
  })

})


app.listen(9000, () => console.log('Example app listening on port 9000!'))
