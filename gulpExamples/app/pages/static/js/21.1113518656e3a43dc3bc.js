webpackJsonp([21],{"3cXf":function(e,t,i){e.exports={default:i("Bdoc"),__esModule:!0}},Bdoc:function(e,t,i){var n=i("uedQ"),a=n.JSON||(n.JSON={stringify:JSON.stringify});e.exports=function(e){return a.stringify.apply(a,arguments)}},Dm7C:function(e,t,i){t=e.exports=i("YfG4")(!1),t.push([e.i,"\n.filter-tree {\n\theight: 300px;\n\toverflow-y: auto;\n\tmargin-bottom: 15px;\n}\n/*.dialog {\n\twidth: 1000px;\n\theight: 500px;\n}*/\n.dialogAdd-footer {\n\tpadding-top: 40px;\n\tpadding-right: 40px;\n}\n/*.dialog-footer {\n\tpadding-right: 40px;\n}*/\n",""])},QPKY:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("4YfN"),a=i.n(n),o=i("Raaa"),l=i("lQSI");t.default={name:"groupType",data:function(){return{typeOptions:["groupType","dirt"],treeData:[],defaultProps:{children:"children",label:"name"},currentId:-1,formEdit:!0,formStatus:"",form:{name:void 0,type:void 0,code:void 0,irptId:void 0},info:{name:void 0},role:{id:null,name:null,type:null,code:null,irptId:null},itemTypes:[],rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}],code:[{required:!0,message:"请输入报表编码",trigger:"blur"}],irptId:[{required:!0,message:"请输入报表ID",trigger:"blur"}]},rule:{name:[{required:!0,message:"请输入名称",trigger:"blur"}],type:[{required:!0,message:"请选择报表类型",trigger:"change"}],code:[{required:!0,message:"请输入报表编码",trigger:"blur"}],irptId:[{required:!0,message:"请输入报表ID",trigger:"blur"}]},ids:[],check:[],list:null,total:null,listLoading:!0,page:{page:1,size:10,limit:null},dialogFormVisible:!1,dialogStatus:"",dialogAddStatus:"",dialogFormAddVisible:!1,groupTypeManager_btn_edit:!1,groupTypeManager_btn_del:!1,groupTypeManager_btn_add:!1,textMap:{update:"编辑",create:"创建"},tableKey:0,cities:[{value:"1",label:"国家统计报表"},{value:"2",label:"省级制定"},{value:"3",label:"临时任务"},{value:"4",label:"网上申报"}],type:null}},created:function(){this.getList(),this.getSelectListFn()},computed:a()({},i.i(l.b)(["elements"])),methods:{getList:function(){var e=this;this.listLoading=!0,i.i(o.a)(this.page,this.info.name).then(function(t){e.list=t.data.list,e.total=t.data.totalElements,e.list=t.data.content,e.listLoading=!1})},getSelectListFn:function(){var e=this;i.i(o.b)().then(function(t){e.itemTypes=t.data})},handleFilter:function(){this.getListOption()},getListOption:function(){var e=this;this.listLoading=!0,i.i(o.c)(this.page,this.info.name).then(function(t){e.list=t.data.content,e.total=t.data.totalElements,e.page.size=t.data.size,e.listLoading=!1})},handleSizeChange:function(e){this.page.size=e,this.page.limit=e,this.getList()},handleCurrentChange:function(e){this.page.page=e,this.getList()},handleCreate:function(){this.dialogAddStatus="create",this.dialogFormAddVisible=!0},create:function(e){var t=this;console.log(this.form),this.$refs[e].validate(function(e){e&&i.i(o.d)(t.form,t.ids).then(function(e){300==e.infoCode?t.$notify({title:"失败",message:"请求条件错误，名字已存在",type:"warning",duration:2e3}):(t.getList(),t.resetTemp(),t.dialogFormAddVisible=!1,t.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3}))})})},handleUpdate:function(e){this.dialogFormVisible=!0,this.role.id=Number(e.id),this.role.name=e.name,this.role.type=e.type,this.role.code=e.code,this.role.irptId=e.irptId},update:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;i.i(o.e)(t.role,t.ids).then(function(e){t.dialogFormVisible=!1,t.ids=[],t.resetTemp(),204==e.infoCode?t.$notify({title:"失败",message:"角色名称已存在",type:"warning",duration:2e3}):(t.getList(),t.ids=[],t.$notify({title:"成功",message:"更新成功",type:"success",duration:2e3}),t.dialogFormVisible=!1)})})},handleDelete:function(e){var t=this;console.log(e.id),this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.ids.push(Number(e.id)),i.i(o.f)(t.ids).then(function(){t.getList(),t.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3}),t.ids=[];var i=t.list.indexOf(e);t.list.splice(i,1)}),t.ids=[]})},cancelAdd:function(e){this.dialogFormAddVisible=!1,this.$refs[e].resetFields()},cancel:function(e){this.dialogFormVisible=!1,this.$refs[e].resetFields()},resetTemp:function(){this.form={name:void 0,type:void 0,code:void 0,irptId:void 0},this.role={name:void 0,type:void 0,code:void 0,irptId:void 0},this.check=[]},change:function(){}}}},Raaa:function(e,t,i){"use strict";function n(e,t){return i.i(p.a)({url:u.b+"/irpt/findByPage/"+e.page+"/"+e.size,method:"post",data:{name:t}})}function a(e,t){return i.i(p.a)({url:u.b+"/irpt/findByPage/"+e.page+"/"+e.size,method:"post",data:{name:t}})}function o(e){return i.i(p.a)({url:u.b+"/irpt/save",method:"post",data:c()(e)})}function l(e){return i.i(p.a)({url:u.b+"/irpt/deletes",method:"delete",data:e})}function r(e){return i.i(p.a)({url:u.b+"/irpt/update",method:"post",data:c()(e)})}function s(){return i.i(p.a)({url:u.b+"/dict/findByGroupName/报表类型",method:"get"})}t.a=n,t.c=a,t.d=o,t.f=l,t.e=r,t.b=s;var d=i("3cXf"),c=i.n(d),u=i("gyMJ"),p=i("Vo7i")},TP7a:function(e,t,i){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container calendar-list-container"},[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"报表表名"},model:{value:e.info.name,callback:function(t){e.info.name=t},expression:"info.name"}}),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"search"},on:{click:e.handleFilter}},[e._v("搜索")]),e._v(" "),e.groupTypeManager_btn_add?e._e():i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"edit"},on:{click:e.handleCreate}},[e._v("添加")])],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{align:"center",label:"报表表名"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v("\n            "+e._s(t.row.name)+"\n          ")])]}}])}),e._v(" "),i("el-table-column",{staticStyle:{"font-size":"16px"},attrs:{align:"center",label:"报表类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v("\n            "+e._s(t.row.type)+"\n          ")])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"报表编码"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v("\n            "+e._s(t.row.code)+"\n          ")])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"报表ID"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v("\n            "+e._s(t.row.irptId)+"\n          ")])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.groupTypeManager_btn_edit?e._e():i("el-button",{attrs:{size:"small",type:"success"},on:{click:function(i){e.handleUpdate(t.row)}}},[e._v("\n\t\t\t\t\t\t编辑\n\t\t\t\t\t")]),e._v(" "),e.groupTypeManager_btn_del?e._e():i("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(i){e.handleDelete(t.row)}}},[e._v("\n\t\t\t\t\t\t删除\n\t\t\t\t\t")])]}}])})],1),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[i("el-pagination",{attrs:{"current-page":e.page.page,"page-sizes":[10,20,30,40],"page-size":e.page.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.page.page=t}}})],1),e._v(" "),i("el-dialog",{attrs:{title:e.textMap[e.dialogAddStatus],visible:e.dialogFormAddVisible,"custom-class":"dialog","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogFormAddVisible=t}}},[i("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"报表名称",prop:"name"}},[i("el-input",{attrs:{placeholder:"请输入名称"},model:{value:e.form.name,callback:function(t){e.form.name=t},expression:"form.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"报表类型",prop:"type"}},[i("el-select",{attrs:{placeholder:"请选择活动区域"},model:{value:e.form.type,callback:function(t){e.form.type=t},expression:"form.type"}},e._l(e.itemTypes,function(e,t){return i("el-option",{key:t,attrs:{label:e.dictName,value:e.dictName}})}))],1),e._v(" "),i("el-form-item",{attrs:{label:"报表编码",prop:"code"}},[i("el-input",{attrs:{placeholder:"请输入名称"},model:{value:e.form.code,callback:function(t){e.form.code=t},expression:"form.code"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"报表ID",prop:"irptId"}},[i("el-input",{attrs:{placeholder:"请输入描述"},model:{value:e.form.irptId,callback:function(t){e.form.irptId=t},expression:"form.irptId"}})],1),e._v(" "),i("el-form-item",[i("el-button",{on:{click:function(t){e.cancelAdd("form")}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.create("form")}}},[e._v("确 定")])],1)],1)],1),e._v(" "),i("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible,"custom-class":"dialog","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("el-form",{ref:"role",attrs:{model:e.role,rules:e.rule,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"报表名称",prop:"name"}},[i("el-input",{attrs:{placeholder:"请输入名称"},model:{value:e.role.name,callback:function(t){e.role.name=t},expression:"role.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"报表类型",prop:"type"}},[i("el-select",{attrs:{placeholder:"请选择活动区域"},model:{value:e.role.type,callback:function(t){e.role.type=t},expression:"role.type"}},e._l(e.itemTypes,function(e,t){return i("el-option",{key:t,attrs:{label:e.dictName,value:e.dictName}})}))],1),e._v(" "),i("el-form-item",{attrs:{label:"报表编码",prop:"code"}},[i("el-input",{attrs:{placeholder:"请输入名称"},model:{value:e.role.code,callback:function(t){e.role.code=t},expression:"role.code"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"报表ID",prop:"irptId"}},[i("el-input",{attrs:{placeholder:"请输入描述"},model:{value:e.role.irptId,callback:function(t){e.role.irptId=t},expression:"role.irptId"}})],1),e._v(" "),i("el-form-item",[i("el-button",{on:{click:function(t){e.cancel("role")}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update("role")}}},[e._v("确 定")])],1)],1)],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},YTY1:function(e,t,i){var n=i("Dm7C");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);i("XkoO")("38ec410c",n,!1)},hrvb:function(e,t,i){function n(e){a||i("YTY1")}var a=!1,o=i("Alxp")(i("QPKY"),i("TP7a"),n,null,null);o.options.__file="/Users/tiner/project/atkm/农业项目/web/web/src/views/admin/reportform/index.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports}});