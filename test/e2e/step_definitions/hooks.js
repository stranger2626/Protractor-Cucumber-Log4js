"use strict";
const {After, Before, Status} = require('cucumber');
const {setDefaultTimeout} = require('cucumber'); 
const fs = require('fs');
const logger = require('../config/loggerConfig.js').logger;
setDefaultTimeout(60 * 1000);

After(function (testCase) {
    if (testCase.result.status === Status.FAILED) {
        return browser.takeScreenshot().then((screenShot) => {
            logger.debug(`Preparing to take a screenshot`);
            fs.existsSync("screenshots") || fs.mkdirSync("screenshots");
            let decodedImage = new Buffer(screenShot, 'base64');    
            let stream = fs.createWriteStream(`./screenshots/${testCase.pickle.name}.png`);
            stream.write(new Buffer(screenShot, 'base64'));
            stream.end();
            logger.debug(`Screenshot taken and saved`);
            return this.attach(decodedImage, 'image/png');
        });
    }
});