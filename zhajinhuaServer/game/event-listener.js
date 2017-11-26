const EventListener = function (obj) {
    var Register = {};//注册器，Map

    obj.on = function (name, method) {
        if(!Register.hasOwnProperty(name)){   //检查注册器里有没name这个方法,没有的话加上
            Register[name] = [];
        }
        Register[name].push(method);
    };

    obj.fire = function (name) {
        if(Register.hasOwnProperty(name)){  //检查注册器里有没name方法，有的话取出
            var handleList = Register[name];
            for(var i = 0; i < handleList.length; i++){
                var handler = handleList[i];    //从列表取出的一个元素，既name方法
                var args = [];
                for(var j = 1; j < arguments.length; j++){  //遍历方法中的参数，取出，由于第一个参数是name不需要所以从j=1开始
                    args.push(arguments[j])
                }
                handler.apply(this, args);  //用apply调用
            }
        }
    };
    //
    obj.off = function (name, method) {
        if(Register.hasOwnProperty(name)){
            var handlerList = Register[name ];
            for(var i = 0; i < handlerList.length; i++){
                if(handlerList[i] === method){
                    handlerList.splice(i,1);
                }
            }
        }
    };
    //房间关闭时用这个方法
    obj.removeAllListeners = function () {
        Register = {};
    };
    return obj;
};
module.exports = EventListener;//输出当前类