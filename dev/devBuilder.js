function DevBuilder() {
    this.getDevices = function () {
        var devices = [];

        devices.push(require('./printer/k305'));
        return devices;
    }
}

module.exports = new DevBuilder();
