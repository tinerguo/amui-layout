/**
 * Created by tiner on 2018/12/3.
 */

/**
 * ajax请求配置
 */
const axios = require('axios')
// import {baseUrl,loginUrl} from '../config/env'
const Qs = require('qs');
var store = require('store');
import {Message,Modal} from 'iview';
// import vuexStore from '../store/index'

String.prototype.format = function() {
  if(arguments.length == 0) return this;
  var param = arguments[0];
  var s = this;
  if(typeof(param) == 'object') {
    for(var key in param)
      s = s.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
    return s;
  } else {
    for(var i = 0; i < arguments.length; i++)
      s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return s;
  }
}

/*
axios.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded"
}
//整理数据
axios.defaults.transformRequest = function (data) {
  // data = JSON.stringify(data);
  // return data;
};
*/

// axios默认配置
axios.defaults.timeout = 100000;   // 超时时间
axios.defaults.baseURL = window.configs.API_ROOT;

// todo:路由响应拦截 response 拦截器
axios.interceptors.response.use(response => {

    return response;
  },
  error => {
    return Promise.reject(error)
});

// todo:路由请求拦截 request 拦截器
axios.interceptors.request.use(_config => {
      return _config;
  },
  error => {
    return Promise.reject(error);
});

/**
 * todo:发送请求http
 * @param params
 * {
 *  method:'[POST|GET|DELETE]',
 *  head:'[form|raw]',
 *  params:{
 *    dictType:1,
 *    dictCode:2
 *  },
 *  url:'/v1/dict/{dictType}/{dictCode}',
 *  data:{
 *    xxxx
 *  }
 * }
 * @returns {Promise}
 */
function http(params) {
  //todo:设置默认值
  params.method = params.method || "POST";
  params.head = params.head || "form";

  var data;
  var headers = {};

  //todo:设置请求类型
  if (params.head == "form") {
    headers['Content-Type'] = "application/x-www-form-urlencoded";
    data = Qs.stringify(params.data)
  }
  else if (params.head == "raw") {
    headers['Content-Type'] = "application/json";
    data = JSON.stringify(params.data);
  }

//todo:设置请求参数
  if(params.data){
    if(params.method.toUpperCase() == "GET"){
      params.url += "?"+data;
    }
  }


  //todo:格式化url如:/v1/dict/{dictType}/{dictCode}
  params.url = params.url.format(params.params);
  return new Promise((resolve, reject) => {
        //todo:请求数据
        axios({
          method: params.method.toUpperCase(),//请求方式
          url: params.url,//请求地址
          data: data,//请求数据
          headers: headers//请求header
        }).then(response => {
          if(!response){
            return;
          }
          /* 请求数据 response.data
          response.status response.statusText
          response.headers response.config */
          var responseContent = response.data;
          resolve(responseContent);
        }).catch(error => {
          console.log(error);
          if( error.message == 'Network Error'){
            console.log("服务器访问失败,请检查网络连接,刷新重试!");
          }
          if(error.response.data.error)
          Message.error(error.response.data.error.message);
          //reject(error.response.data);
        });
    });
}

export  default http;
