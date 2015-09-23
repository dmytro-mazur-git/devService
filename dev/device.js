var events = require('events');

function Device() {

    this._connected = false;
    this._connectionId = undefined;
    this._usingPort = undefined;
}

Device.prototype.getDeviceInfo = function () {

    return {
        type:this._type,
        name:this._name,
        isConnected:this._connected,
        connectionId:this._connectionId,
        port:this._usingPort
    }
};

Device.prototype._createMessage = function(message)
{
    message.uuid = this._connectionId;
    this.emit('message', message);
};

Device.prototype.probeDevice = function(command)
{
    this._connected = true;
    this._connectionId = command.uuid;
};

Device.prototype.__proto__ = events.EventEmitter.prototype;
module.exports = Device;
