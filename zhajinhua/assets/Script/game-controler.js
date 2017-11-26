const global = require("./global");
const EventListener = require("./event-listener");

cc.Class({
    extends: cc.Component,

    properties: {
        main_world_prefab: {
            default: null,
            type: cc.Prefab
        },
        game_world_prefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function() {
        global.socket = io("localhost:3000");
        global.eventlistener = EventListener({});
        global.eventlistener.on("login", function(uid) {
            console.log("客户端接收: button click uid = " + uid);
            global.socket.emit("login", uid);   //给服务器发送消息"login"
        });
        global.socket.on("sync_data", (data) => {
            console.log("sync data = " + JSON.stringify(data));
            this.enterGameWorld(data);
        });
        global.socket.on("player_join", (data)=>{
            global.gameEventListener.fire("player_join", data);
        })
        this.enterMainWorld();
    },

    enterMainWorld: function () {
        if(this.runningWorld !== undefined){
            this.runningWorld.removeFromParent(true);
        }
        this.runningWorld = cc.instantiate(this.main_world_prefab);
        this.runningWorld.parent = this.node;
    },

    enterGameWorld: function (data) {
        if(this.runningWorld !== undefined){
            this.runningWorld.removeFromParent(true);
        }
        this.runningWorld = cc.instantiate(this.game_world_prefab);
        this.runningWorld.parent = this.node;
        global.gameEventListener.fire("sync_data", data);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
