/**
 * Vue.use 的时候会调用install方法
 * @type {{install: ((Vue)), name: string}}
 */
let color_index = 0;
import store from 'store'
const AmUI = {
        install (Vue) {
                Vue.prototype.$amui = new Vue({
                        data: {
                                breakpoint: {},
                                theme: 'default',
                                ctitle:'',
                                layoutSetting:{},
                                colors:[
                                        "#ffffff",
                                        "#000000",
                                        "#407ced",
                                        "#c6b91b",
                                        "#f7013b",
                                        "#cd0030",
                                        "#2de90e",
                                        "#127e00",
                                        "#6bb060",
                                        "#00c5fe",
                                        "#108aad",
                                        "#0c25e2",
                                        "#3d4374",
                                        "#8994ed"
                                ]
                        },
                        methods:{
                                setStore:function(key,obj){
                                        store.set(this.ctitle+key, obj)
                                },
                                getStore:function(key){
                                        return store.get(this.ctitle+key);
                                },
                                getColor(){
                                        var color = this.colors[color_index];
                                        color_index = color_index + 1;
                                        if(color_index>=13){
                                                color_index = 0;
                                        }
                                        return color;

                                },
                                initColor(){
                                        color_index = 0;
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
