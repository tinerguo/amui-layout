var setting = {
  // 侧边栏默认折叠状态
  menu: {
    // 顶栏菜单
    header: [],
    currentHeader:'',
    // 侧栏菜单
    aside: [],
    // [侧边栏宽度] 正常状态
    asideWidth: '220px',
    // [侧边栏宽度] 折叠状态
    asideWidthCollapse: '65px'
  },
  baseUrl:window.configs.IMG_ROOT,
  APIUrl:window.configs.API_ROOT,
  //  非必须,可以为空或者不设置
  title:'策勒县农村饮水安全系统',
  themeActiveSetting:{
    backgroundImage:'',
    name:'zk'
  },
  headerAsideCollapse:false,//头部是否可以伸缩
  headerAsideHeight:60
}


var theme = {
  list: [
    {
      title: '农饮项目-经典',
      name: 'ny',
      preview: 'images/theme/ny/preview@2x.png'
    },
    {
      title: '农饮项目-蓝色',
      name: 'ny-V2',
      preview: 'images/theme/ny-V2/preview@2x.png'
    },
    {
      title: '闸控项目-经典',
      name: 'zk',
      preview: 'images/theme/zk/preview@2x.png'
    },
    {
      title: '闸控项目-经典V2',
      name: 'zk-V2',
      preview: 'images/theme/zk/preview@2x.png'
    },

    {
      title: 'd2admin 经典',
      name: 'd2',
      preview: 'images/theme/d2/preview@2x.png'
    },
    {
      title: '紫罗兰',
      name: 'violet',
      preview: 'images/theme/violet/preview@2x.png'
    },
    {
      title: '简约线条',
      name: 'line',
      backgroundImage: 'images/theme/line/bg.jpg',
      preview: 'images/theme/line/preview@2x.png'
    },
    {
      title: '流星',
      name: 'star',
      backgroundImage: 'images/theme/star/bg.jpg',
      preview: 'images/theme/star/preview@2x.png'
    },
    {
      title: 'Tomorrow Night Blue (vsCode)',
      name: 'tomorrow-night-blue',
      preview: 'images/theme/tomorrow-night-blue/preview@2x.png'
    }
  ]
}
