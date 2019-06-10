var https = require('https');
var fs = require('fs');
var async = require('async');
const path = '/var/img/';
const records = [
  {
    url : "https://sample-videos.com/img/Sample-jpg-image-100kb.jpg",
    name: 'img_1'
  },
  {
    url : "https://sample-videos.com/img/Sample-jpg-image-500kb.jpg",
    name: 'img_2'
  },
];

async.each(records,

  function(item,cb){
        var dest = path + item.name + '.jpg';
        https.get(  item.url , (res) => {
          if (res.statusCode !== 200) {
              var err = new Error('File couldn\'t be retrieved');
              err.status = res.statusCode;
              return ;
          }
          var file = fs.createWriteStream(dest);
          res.pipe(file);
          cb;
        }).on('error', (e) => {
          console.log ( e );
          cb;
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
