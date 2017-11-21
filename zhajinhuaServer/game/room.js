const Player = require("./Player");
const Room = function () {
    var that = {};
    var _playerList = [];//每个房间都有个_playerList管理玩家
    that.createPlayer = function (uid,socket) {
        console.log("服务端接收: create player" + uid);
        _playerList.push(Player(uid,socket));
    };
    
    that.getPlayerCount = function () {
        return _playerList.length;
    };
    return that;
};
module.exports = Room;