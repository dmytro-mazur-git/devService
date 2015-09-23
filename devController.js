var events = require('events');
var builder = require('./dev/devBuilder');
var logger = require('./logger');

function DevController()
{
    events.EventEmitter.call(this);

    var self = this;
    var devices = builder.getDevices(this);

    logger.trace('built devices: '+JSON.stringify(devices));

    subscribeOnDevEvent();

    this.test = function()
    {
        var t = devices[0].probeDevice('cmd');
        devices[0].test();
    };



    this.sendDeviceInfos = function (uuid)
    {
        logger.trace('run sendDeviceInfos');
        var infos = getDeviceTypes();
    };

    function getDeviceTypes()
    {
        var infos = [];
        devices.forEach(function(device)
        {
            infos.push( device.getDeviceInfo());
        });

        return infos;
    }

    function subscribeOnDevEvent()
    {
        devices.forEach(function(device){
            device.on('message', function(message){
                self.emit('responseData', message);
            })
        })
    }
}

DevController.prototype.runCmd = function(request)
{
    try{
        var command = request.command;
        if(command.$.destination==='node-service')
        {
            switch (command.$.name)
            {
                case 'get-device-types': this.sendDeviceInfos(request.uuid);
                    break;
            }

        }
    }
    catch(error)
    {
        logger.error(JSON.stringify(error));
    }
};

DevController.prototype.__proto__ = events.EventEmitter.prototype;
module.exports = new DevController();