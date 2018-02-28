"use strict";
const {After, Before, Status} = require('cucumber');
const {setDefaultTimeout} = require('cucumber'); 
const fs = require('fs');
setDefaultTimeout(60 * 1000);

After(function (testCase) {
    if (testCase.result.status === Status.FAILED) {
        return browser.takeScreenshot().then((screenShot) => {
            let decodedImage = new Buffer(screenShot, 'base64');    
            let stream = fs.createWriteStream(`./screenshots/${testCase.pickle.name}.png`);
            stream.write(new Buffer(screenShot, 'base64'));
            stream.end();
            return this.attach(decodedImage, 'image/png');
        });
    }
});