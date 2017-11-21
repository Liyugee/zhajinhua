const Player = function (uid, socket) {
    var that = {};
    var _uid = uid;
    var _socket = socket;

    console.log("服务端接收: player init" + uid);
    return that;
};
module.exports = Player;