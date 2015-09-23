var events = require('events');
var uuid = require('uuid');
var net = require('net');
var logger = require('./logger');

function SocketHolder() {

    events.EventEmitter.call(this);

    var server = net.createServer(newSocket);
    var socketList = [];

    var self = this;

    function newSocket(socket) {

        socket.uuid = uuid.v4();
        socketList.push(socket);

        socket.on('close', function () {

            self.emit('close', socket.uuid);
            socketList.splice(socketList.indexOf(socket), 1);
            logger.trace('connection '+socket.uuid+' closed');

        });
        socket.on('error', function (err) {
            logger.error(err);
        });

        socket.on('end', function () {
            logger.trace('connection '+socket.uuid+' end');
        });

        socket.on('data', function (data) {

            logger.trace('connection '+socket.uuid+' new data: '+data.toString());
            self.emit('newData', {uuid: socket.uuid, data: data});
        });

    }

    this.start = function (path) {
       server.listen(path);
    };

    this.send = function (message) {

        logger.trace('message for sending: '+JSON.stringify(message));

        socketList.forEach(function (socket) {
            if (socket.uuid === message.uuid) {
                socket.write(message.data);
                logger.trace('message sent');
            }
        });
    };
}

SocketHolder.prototype.__proto__ = events.EventEmitter.prototype;
module.exports = new SocketHolder();