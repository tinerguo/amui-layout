export default {
  // 快捷键
  // 支持快捷键 例如 ctrl+shift+s
  hotkey: {
    search: {
      open: 's',
      close: 'esc'
    }
  },
  // 侧边栏默认折叠状态
  menu: {
    asideCollapse: false,
    // [侧边栏宽度] 正常状态
    asideWidth: '240px',
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
    name:'am'
  }
}
