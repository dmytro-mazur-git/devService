var log4js = require('log4js');

var logger;
function Logger()
{
    log4js.configure({
        appenders: [
            { type: 'console' },
            { type: 'file', filename: 'log', category: 'log' }
        ]
    });
    logger = log4js.getLogger('log');
    logger.setLevel('TRACE');

}

Logger.prototype.trace = function(log)
{
    logger.trace(log);
};

Logger.prototype.error = function(log)
{
    logger.error(log);
};

module.exports = new Logger();