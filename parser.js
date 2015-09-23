var events = require('events');
var xml2js = require('xml2js');
var logger = require('./logger');

function Parser()
{
    events.EventEmitter.call(this);

    var self = this;

    this.parseData = function(message)
    {
        var parser = new xml2js.Parser();
        parser.parseString(message.data, callback);

        function callback(err, obj)
        {
            if(!err)
            {
                obj.uuid = message.uuid;

                logger.trace('xml parsed: '+JSON.stringify(obj));
                self.emit('parsedData', obj);
            }
            else{
                logger.error('parser error: '+JSON.stringify(err));
            }

        }
    };
}

Parser.prototype.__proto__ = events.EventEmitter.prototype;
module.exports = new Parser();