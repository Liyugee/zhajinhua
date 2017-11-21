const Socket = require("socket.io");//引用socket.io
const Room = require("./room");

const SocketServer = function (server) {
    var that = Socket(server);
    var _roomList = [];//房间列表管理房间
    that.on("connection",function (socket) {
        console.log("服务端接收: a user connection");

        socket.on("login",function (uid) {
            console.log("服务端接收: 玩家注册 " + uid);

            //房间里没有玩家，创建房间
            if(_roomList.length === 0){
                _roomList.push(Room());
            }

            //如果房间中人数大于6人，则创建新房间
            if(_roomList[_roomList.length-1].getPlayerCount() > 6){
                _roomList.push(Room());
            }
            _roomList[_roomList.length-1].createPlayer(uid,socket);//在房间列表最后添加玩家
        })
    });
    return that;
};
module.exports = SocketServer;