const Player = require("./Player");
const EventListener = require("./event-listener");

const Room = function () {
    var that = {};
    var _playerList = [];   //每个房间都有个_playerList管理玩家
    var _event = EventListener({}); //创建一个监听器，参数为空对象

    //创建新玩家
    that.createPlayer = function (uid, socket) {
        console.log("服务端接收: create player " + uid);
        var player = Player(uid, socket, _event);

        player.sendSyncData({
            uid: uid,
            player_list: _playerList
        });

        _playerList.push(Player);
        _event.fire("send_create_player_message",{
            uid: uid,
            index: _playerList.length - 1
        });
    };
    
    that.getPlayerCount = function () {
        return _playerList.length;
    };
    return that;
};
module.exports = Room;