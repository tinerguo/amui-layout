

import http from 'ex/utils/http'


export  default {

  'getMenuData.json' : params => http(Object.assign({
    url: window.configs.UI_ROOT+'/static/json/zk/tableMenuData.json' ,
    method: 'get'
  },params))
}
