/**
 * Created by tiner on 2019/10/24.
 */
export var setting = {
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
                asideWidthCollapse: '65px',
                logoHeight:'120'
        },
        baseUrl:window.configs.IMG_ROOT,
        APIUrl:window.configs.API_ROOT,
        //  非必须,可以为空或者不设置
        // title:'闸门监控系统',
        themeActiveSetting:{
                backgroundImage:'',
                name:'zk-V2'
        },
        headerAsideCollapse:true,//头部是否可以伸缩
        headerAsideHeight:60
}