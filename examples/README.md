
~~~
var setting = {
  // 侧边栏默认折叠状态
  menu: {
    // 顶栏菜单
    header: [],
    currentHeader:'',
    // 侧栏菜单
    aside: [],
    // [侧边栏宽度] 正常状态
    asideWidth: '300px',
    // [侧边栏宽度] 折叠状态
    asideWidthCollapse: '65px'
  },
  // 在读取持久化数据失败时默认页面
  page: {
    opened: [
      {
        name: 'index',
        meta: {
          title: '首页',
          requiresAuth: false
        }
      }
    ]
  },
  // 菜单搜索
  search: {
    enable: true
  },
  // 是否默认开启页面切换动画
  transition: {
    active: true
  },
  // 在读取持久化数据失败时默认用户信息
  user: {
    info: {
      name: 'Ghost'
    }
  },
  //  非必须,可以为空或者不设置
  title:'',
  themeActiveSetting:{
    backgroundImage:'images/theme/line/bg.jpg',
    name:'d2'
  }
}


~~~
