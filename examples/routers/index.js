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
import d2Admin from '../view/d2Admin/d2Admin.vue'
import d2AdminLayout from '../view/d2Admin/d2AdminLayout.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: index
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
    /******布局样式DEMO1********/
    {
      path:'/d2Admin',
      name:'d2Admin',
      component: d2Admin,
    },
    /******布局样式-有tab********/
    /******布局样式-无tab********/
    /******布局样式router********/
    {
      path:'/d2AdminLayout',
      name:'d2AdminLayout',
      component: d2AdminLayout,
      children: [
        {
          path: 'test1',
          name: 'test1',
          component: test
        },
        {
          path: 'test2',
          name: 'test2',
          component: test2
        }
      ]
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


