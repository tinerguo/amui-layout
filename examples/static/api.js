/**
 * Created by tiner on 2019/6/4.
 */
(function () {
  var config = {
    site: 'localhost:8080',
  }
  window.configs = {
    API_ROOT: 'http://'.concat(config.site),
    IMG_ROOT:'http://'.concat(config.site)+"/static/"
  };
})();
