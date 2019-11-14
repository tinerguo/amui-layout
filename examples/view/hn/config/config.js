

import http from 'ex/utils/http'


export  default {

  'header-menu.json' : params => http(Object.assign({
    url: window.configs.UI_ROOT+'/static/json/ny/header-menu.json' ,
    method: 'get'
  },params)),
  'tableMenuData1.json' : params => http(Object.assign({
    url: window.configs.UI_ROOT+'/static/json/ny/tableMenuData1.json' ,
    method: 'get'
  },params)),
  'tableMenuData2.json' : params => http(Object.assign({
    url: window.configs.UI_ROOT+'/static/json/ny/tableMenuData2.json' ,
    method: 'get'
  },params)),
  'tableMenuData3.json' : params => http(Object.assign({
    url: window.configs.UI_ROOT+'/static/json/ny/tableMenuData3.json' ,
    method: 'get'
  },params)),
  'tableMenuData4.json' : params => http(Object.assign({
    url: window.configs.UI_ROOT+'/static/json/ny/tableMenuData4.json' ,
    method: 'get'
  },params)),

  /** 惠农系统菜单 **/
  'hn/getMenuData/app1.json' : params => http(Object.assign({
    url: window.configs.UI_ROOT+'/static/json/hn/1/tableMenuData.json' ,
    method: 'get'
  },params)),
  'hn/getMenuData/app2.json' : params => http(Object.assign({
    url: window.configs.UI_ROOT+'/static/json/hn/2/tableMenuData.json' ,
    method: 'get'
  },params)),
  'hn/getMenuData/app3.json' : params => http(Object.assign({
    url: window.configs.UI_ROOT+'/static/json/hn/3/tableMenuData.json' ,
    method: 'get'
  },params)),
  'hn/getMenuData/app4.json' : params => http(Object.assign({
    url: window.configs.UI_ROOT+'/static/json/hn/4/tableMenuData.json' ,
    method: 'get'
  },params)),
  'hn/getMenuData/app5.json' : params => http(Object.assign({
    url: window.configs.UI_ROOT+'/static/json/hn/5/tableMenuData.json' ,
    method: 'get'
  },params)),
  'hn/getMenuData/app6.json' : params => http(Object.assign({
    url: window.configs.UI_ROOT+'/static/json/hn/6/tableMenuData.json' ,
    method: 'get'
  },params)),
  'hn/getMenuData/app7.json' : params => http(Object.assign({
    url: window.configs.UI_ROOT+'/static/json/hn/7/tableMenuData.json' ,
    method: 'get'
  },params)),
}
