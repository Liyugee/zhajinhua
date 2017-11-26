const global = require("./global");
const EventListener = require("./event-listener");

cc.Class({
    extends: cc.Component,
    properties: {
        player_node_prefab: {
            default: null,
            type: cc.Prefab
        },
        player_pos_list: {
            default: [],
            type: cc.Node
        }
    },
    // use this for initialization
    onLoad: function () {
        global.gameEventListener = EventListener({});
        global.gameEventListener.on("sync_data", (data)=>{
            console.log("game world sync data = " + JSON.stringify(data));
            global.playerData.uid = data.uid;
            var index = 0;
            if(global.playerData.uid = data.uid){
                index = 0;
            }
            this.createPlayer(data.uid, index);
        });
        global.gameEventListener.on("player_join", (data)=>{
            console.log("客户端接收： player join " + JSON.stringfy(data));
            // this.createPlayer(data.uid, data.index);
        })
    },
    createPlayer: function (uid, index) {
        var player = cc.instantiate(this.player_node_prefab);
        player.parent = this.node;
        player.addComponent("player-node").init(uid);
        player.position = this.player_pos_list[index].position;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
