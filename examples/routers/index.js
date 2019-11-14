import Vue from 'vue'
import Router from 'vue-router'
import index from '../view/index'

/******** todo:测试 *******/
//模板页面
import test from '../test/demo/test.vue'
import test2 from '../test/demo/test2.vue'
//flex.css 测试
import flexDemo1 from '../test/flexCSS/demo1.vue'


/******** todo:测试 *******/
//布局编辑器
import layout from '../view/layout.vue'
//基层防汛页面
import jcfx from '../view/jcfx.vue'


/******** todo:测试 *******/
//d2Admin 模板
//农饮项目
import ny from '../view/ny/ny.vue'
//惠农项目
import hn from '../view/hn/hn.vue'
//闸门监控
import zk from '../view/zk/zk.vue'
//登录模板01
import login01 from '../view/login01/page.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: ny
    },
    {
      path: '/jcfx',
      name: 'jcfx',
      component: jcfx
    },
    {
      path: '/layout',
      name: 'layout',
      component: index
    },{
      path:'/flexDemo1',
      name:'flexDemo1',
      component: flexDemo1,
    },
    /******农饮系统demo********/
    {
      path:'/ny',
      name:'ny',
      component: ny,
    },
    /******布局样式router********/
    {
      path:'/hn',
      name:'hn',
      component: hn
    },
    /******闸空router********/
    {
      path:'/zk',
      name:'zk',
      component: zk
    },
    {
      path:'/login01',
      name:'login01',
      component: login01
    },
    {
      path: '/pages',
      name: 'pages',
      component: layout,
      children: [
        {
          path: 'test',
          name: 'test',
          component: test
        },
        {
          path: 'test2',
          name: 'test2',
          component: test2
        }
      ]
    }
  ]
})
