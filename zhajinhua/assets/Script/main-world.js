const global = require("./global");
// const EventListener = require("./event-listener");

cc.Class({
    extends: cc.Component,

    properties: {
        edit_box: {
            default: null,
            type: cc.EditBox
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    buttonClick: function (event,customData){
        console.log("客户端接收: button click = " + customData);
        console.log("客户端接收: edit box string = " + this.edit_box.string);
         if (this.edit_box.string.length !==0 ){
            // global.eventlistener = EventListener({});
            global.eventlistener.fire("login", this.edit_box.string);
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
