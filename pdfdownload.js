var https = require('https');
var http = require('http');
var fs = require('fs');
var async = require('async')
const path = '/var/pdf/';

const records = [
  {
    url : "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    name: 'test-1'
  },
  {
    url : "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    name: 'test-2'
  },
];

async.each(records,
  function(item,cb){
    var dest = path + item.name + '.pdf';
    https.get(  item.url, (res) => {
      if (res.statusCode !== 200) {
          var err = new Error('File couldn\'t be retrieved');
          err.status = res.statusCode;
          return ;
      }
      var chunks = [];
      res.setEncoding('binary');
      res.on('data', (chunk) => {
          chunks += chunk;
      }).on('end', () => {
          var stream = fs.createWriteStream(dest);
          stream.write(chunks, 'binary');
          stream.on('finish', () => {
            res.pipe(stream);
            cb;
          });
      })
    }).on('error', (e) => {
      console.log ( e );
      cb
    });
  },
  function (err){
    if ( err ){
      console.log ( err )
    } else {
      console.log('Done writing files.');
    }
  }
)
