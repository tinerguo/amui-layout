/**
 * Vue.use 的时候会调用install方法
 * @type {{install: ((Vue)), name: string}}
 */
import store from 'store'
const AmUI = {
        install (Vue) {
                Vue.prototype.$amui = new Vue({
                        data: {
                                breakpoint: {},
                                theme: 'default',
                                ctitle:''
                        },
                        methods:{
                                setStore:function(key,obj){
                                        store.set(this.ctitle+key, obj)
                                },
                                getStore:function(key){
                                        return store.get(this.ctitle+key);
                                }
                        },
                        created:function(){
                                var _this = this;
                                //存储系统名称
                                this.$on('setSystemName',function(p_name){
                                        _this.ctitle =  p_name;
                                });
                        },
                        mounted () {
                        },
                        beforeMount:function(){

                        }
                })
        },
        name:'AmUI'
}
export default AmUI
