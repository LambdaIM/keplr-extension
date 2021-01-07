const os = require("os");
var zip = require("cross-zip");
var path = require("path");
var manifest = require('./src/manifest.json');
var version =manifest.version;
var fs = require('fs');

function compression() {
    // await zip('./dist', './dist.zip');

    var inPath = path.join(__dirname, "LAMB-Wallet-Chrome"); // folder to zip
    var outPath = path.join(__dirname, "LAMB-Wallet-Chrome.zip"); // name of output zip file
    if(fs.existsSync(outPath)){
        fs.unlinkSync(outPath);
    }
  
    zip.zipSync(inPath, outPath);
    console.log('zip end')
  }

compression();