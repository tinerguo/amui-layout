function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        const name = child.$options.name;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            // todo 如果 params 是空数组，接收到的会是 undefined
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}
export default {
    methods: {
        //向父组件传递消息
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        //给子组件传递消息
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        },
        //是否拥有子组件
        hasChild(componentName){
            var tempObj = {
                hashChild:false,
                child:{}
            };
            var hashChild = false;
            for(var i =0;i<this.$children.length;i++){
                var child = this.$children[i];
                const name = child.$options.name;
                // console.log(name);
                if(name == componentName){
                    tempObj.hashChild = true;
                    tempObj.child  = child;
                    break;
                }
            }
            return tempObj;
        }
    }
};