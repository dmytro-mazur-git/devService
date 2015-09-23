var Device = require('../device');

function Printer()
{
    Device.apply(this, arguments);
   this._type = 'printer';
}

Printer.prototype.probeDevice = function(command)
{
  Device.prototype.probeDevice.apply(this, arguments);
};

Printer.prototype.__proto__ = Device.prototype;
module.exports =  Printer;
