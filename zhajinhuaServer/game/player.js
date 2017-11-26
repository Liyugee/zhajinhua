const Player = function (uid, socket, event) {
    var that = {};
    var _uid = uid;
    var _socket = socket;
    var _event = event;

    console.log("服务端接收: player init " + uid);

    that.sendSyncData = function (data) {
        console.log("服务端接收： send sync data = " + JSON.stringify(data));
        _socket.emit("sync_data", data);
    };

    const sendCreatePlayerMessage = function (data) {
        if(data.uid !== _uid){
            console.log("服务端接收： send create player message " + JSON.stringify(data));
            _socket.emit("player_join", data);
        }
    };

    _event.on("send_create_player_message", sendCreatePlayerMessage);

    that.destroy = function () {
        _event.off("send_create_player_message", sendCreatePlayerMessage);
    };

    that.getUid = function () {
        return _uid;
    };

    that.getIndex = function () {
        return _index
    };

    that.getCardList = function () {
        return _cardList;
    };

    return that;
};
module.exports = Player;