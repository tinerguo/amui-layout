webpackJsonp_name_([5],{550:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(578),a=function(t){return t&&t.__esModule?t:{default:t}}(o);a.default.install=function(t){t.component(a.default.name,a.default)},e.default=a.default},561:function(t,e,n){"use strict";function o(t,e,n){var a=this;this.$children.forEach(function(r){(0,i.default)(this,a),r.$options.name===t?r.$emit.apply(r,[e].concat(n)):o.apply(r,[t,e].concat([n]))}.bind(this))}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),i=function(t){return t&&t.__esModule?t:{default:t}}(a);e.default={methods:{dispatch:function(t,e,n){for(var o=this.$parent||this.$root,a=o.$options.name;o&&(!a||a!==t);)(o=o.$parent)&&(a=o.$options.name);o&&o.$emit.apply(o,[e].concat(n))},broadcast:function(t,e,n){o.call(this,t,e,n)},hasChild:function(t){for(var e=!1,n=0;n<this.$children.length;n++){var o=this.$children[n],a=o.$options.name;if(console.log(a),"LayoutFooter"==a){e=!0;break}}return e}}}},578:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(2),i=o(a),r=n(579),s=n(561),u=o(s);e.default={name:"app",mixins:[u.default],data:function(){return{normal:!0,LayoutFooter:!0,name:String}},props:{id:{type:String,default:"app-am"},theme:String},created:function(){var t=this;this.$amui.$on("contentBeyond",function(e){t.onContentBeyond(e.contentHeight)})},mounted:function(){var t=this;this.LayoutFooter=!this.hasChild("LayoutFooter"),(0,r.receiveMessage)(function(e){try{var n=JSON.parse(e.data);t.$amui.$emit("iframeSendMsg",n)}catch(e){}})},computed:{classes:function(){var t;return t={},(0,i.default)(t,"theme-"+this.theme,!0),(0,i.default)(t,"normal",this.normal),(0,i.default)(t,"no-footer",this.LayoutFooter),t}},methods:{onContentBeyond:function(t){t>document.documentElement.clientHeight-100?this.normal=!1:this.normal=!0}},watch:{theme:function(){}},render:function(t){return t("div",{staticClass:"application",class:this.classes,attrs:{"data-app":!0},domProps:{id:this.id}},this.$slots.default)}}},579:function(t,e,n){"use strict";function o(t,e,n){e&&(t="string"==typeof t?t:(0,d.default)(t),n=n||parent,m?n[o](t,e.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):e&&(n.location=e.replace(/#.*$/,"")+"#"+ +new Date+f+++"&"+t))}function a(t){return"function"===(null==t?String(t):class2type[toString.call(t)]||"object")}function i(t,e,n){m?(t&&(u&&c(),u=function(n){if("string"==typeof e&&n.origin!==e||a(e)&&e(n.origin)===h)return h;t(n)}),window[p]?window[t?p:"removeEventListener"]("message",u,h):window[t?"attachEvent":"detachEvent"]("onmessage",u)):(r&&clearInterval(r),r=null,t&&(n="number"==typeof e?e:"number"==typeof n?n:100,r=setInterval(function(){var e=document.location.hash,n=/^#?\d+&/;e!==s&&n.test(e)&&(s=e,t({data:e.replace(n,"")}))},n)))}Object.defineProperty(e,"__esModule",{value:!0}),e.receiveMessage=e.postMessage=void 0;var r,s,u,c,l=n(52),d=function(t){return t&&t.__esModule?t:{default:t}}(l),f=1,h=!1,o="postMessage",p="addEventListener",m=!0;e.postMessage=o,e.receiveMessage=i}});