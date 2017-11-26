const EventListener = function (obj) {
    let Register = {};

    obj.on =  function (name, method) {
        if (!Register.hasOwnProperty(name)){
            Register[name] = [];
        }
        Register[name].push(method);
    };

    obj.fire = function(name) {
        console.log("客户端接收: fire " + name);
        if (Register.hasOwnProperty(name)) {
            var handlerList = Register[name];
            for (let i = 0; i < handlerList.length; i++) {
                let handler = handlerList[i];
                let args = [];
                for(let j = 1; j < arguments.length; j++){
                    args.push(arguments[j]);
                }
                handler.apply(this,args);
                console.log("客户端接收 args = " + JSON.stringify(args));

            }
        }
    };

    obj.off = function () {

    };

    obj.destroy = function () {

    };
    return obj;
};
module.exports = EventListener;