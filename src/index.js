/**
 * Created by tiner on 2018/10/22.
 */
import AmUI from './components/AmUI';
import {contentV1} from './components/content';
import {headerV1,headerContentV1} from './components/header';
import {layoutV1,layoutD2admin} from './components/layout';
import {siderV1,siderV2} from './components/sider';
import {menuV1,menuV2,menuV3} from './components/menu';
import {footerV1} from './components/footer';
import {tabD2admin} from './components/tab';

import {d2Headerullscreen,headerMenu,d2HeaderTheme} from './widgets/index';
import '@/assets/style/flex.css'
import '@/assets/style/public-class.scss'
const components = {
    "am-contentv1":contentV1,
    "am-footerv1":footerV1,
    "am-headerv1":headerV1,
    "am-header-contentv1":headerContentV1,
    "am-layoutv1":layoutV1,
    "am-menuv1":menuV1,
    "am-siderv1":siderV1,
    "am-menu":menuV1,
    "am-menuV2":menuV2,
    "am-menuv3":menuV3,

    "layout-d2admin":layoutD2admin,
    "d2-header-fullscreen":d2Headerullscreen,
    "d2-tabs":tabD2admin,
    "header-menu":headerMenu,
    "d2-header-theme":d2HeaderTheme

}

const install = function(Vue, opts) {
    if (install.installed) return;
    Vue.use(AmUI);
    Object.keys(components).forEach(key => {
        Vue.component(key,components[key]);
    });
}

const API = {
    install,
    ...components
};

//自动安装
/****/
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue,window.opts);
}


export default API
