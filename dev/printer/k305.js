var Printer = require('./printer');

function K305() {

    Printer.apply(this, arguments);

    this._name = 'K305';
}

K305.prototype.test = function()
{
    this._createMessage({text:'test'});
};

K305.prototype.probeDevice = function(command)
{
    Printer.prototype.probeDevice.apply(this, arguments);
};

K305.prototype.__proto__ = Printer.prototype;
module.exports = new K305();
