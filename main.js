
var socketHolder = require('./socketHolder');
var parser = require('./parser');
var devController = require('./devController');
var logger = require('./logger');

socketHolder.on('newData', parser.parseData);
parser.on('parsedData', function(obj){
    console.log(JSON.stringify(obj));
});
parser.on('parsedData', devController.runCmd);
devController.on('responseData', socketHolder.send);

socketHolder.start(1234);
logger.trace("service started");