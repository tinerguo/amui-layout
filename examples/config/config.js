

import http from 'ex/utils/http'


export  default {

  'header-menu.json' : params => http(Object.assign({
    url: './static/json/v2/header-menu.json' ,
    method: 'get'
  },params)),
  'tableMenuData1.json' : params => http(Object.assign({
    url: './static/json/v2/tableMenuData1.json' ,
    method: 'get'
  },params)),
  'tableMenuData2.json' : params => http(Object.assign({
    url: './static/json/v2/tableMenuData2.json' ,
    method: 'get'
  },params)),
  'tableMenuData3.json' : params => http(Object.assign({
    url: './static/json/v2/tableMenuData3.json' ,
    method: 'get'
  },params)),
  'tableMenuData4.json' : params => http(Object.assign({
    url: './static/json/v2/tableMenuData4.json' ,
    method: 'get'
  },params)),

}
