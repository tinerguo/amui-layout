/**
 * Created by tiner on 2019/6/4.
 */
(function () {
  var config = {
    site: 'http://localhost:8083/',
  }
  window.configs = {
    //控制开发模式和产品模式
    ENV:"development",//production
    //todo:网关api
    API_ROOT: config.site,
    //todo:权限系统后台API
    AUUM_ROOT: 'http://localhost:9002/',
    //todo:布局框架api - 单独配置的原因是因为有可能静态资源和服务是分开的
    IMG_ROOT:'./static/',
    //todo:当前前端服务地址
    UI_ROOT:'http://localhost:8083/',
    //cas 登录路径[非必须],如果未配置,那么系统默认弹出登录窗口进行ajax进行登录,登录成功后发送vue全局事件
    LOGIN_URL:'http://localhost:8080/cas-server/login'
  };
})();
