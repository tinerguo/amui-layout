/**
 * Created by tiner on 2018/10/22.
 */
import 'babel-polyfill';

import Vue from 'vue';
import App from './app.vue'
import router from './routers/index'
import iView from 'iView';
import locale from 'iView/src/locale/lang/en-US';
import 'iview/dist/styles/iview.css';
import AMLayout from '../src/index';

// require('./iconfont/style.css');
Vue.use(iView, { locale });
Vue.use(AMLayout);

var app = new Vue({
    el: '#app',
    router,
    components: { App },
    // store,
    template: '<App/>'
});
