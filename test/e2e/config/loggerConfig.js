const log4js = require('log4js');

log4js.configure({
    appenders: { combined: { type: 'file', filename: 'combined.log' },  
    console: { type: 'console'} },
    categories: { default: { appenders: ['combined', 'console'], level: 'info' } }
  });

const logger = log4js.getLogger('combined');  

module.exports = {
    logger
}