const log4js = require('log4js');

log4js.configure({
    appenders: { 
        combined: { type: 'file', filename: 'combined.log' },  
        console: { type: 'console'},
        logstash: {type: 'logstashHTTP', url: 'http://localhost:5555/', timeout: '60000' }
    },
    categories: { default: { appenders: ['combined', 'console', 'logstash'], level: 'debug' } }
  });

const logger = log4js.getLogger('combined');  

module.exports = {
    logger
}