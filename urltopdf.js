// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const puppeteer = require('puppeteer');
const path = '/var/pdf/';
const records = [
  {
    url : "https://google.com",
    name: 'test-1'
  },
  {
    url : "https://antonionardone.com",
    name: 'test-2'
  },
];

async function download(){
  for ( var i=0 ; i < records.length ; i++){
    let record = records[i]

    try {

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2});
      await page.goto ( record.url , { waitUntil: 'networkidle2' } );
      await page.setJavaScriptEnabled(false);
      await page.emulateMedia('screen');
      await page.pdf (
        {
          path: path + record.name + '.pdf',
          pageRanges: "",
          format: 'A4',
          printBackground: true
        }
      );
      await browser.close();
    } catch ( error ){
      console.log ( error );
    }
  }
}
download(records);
