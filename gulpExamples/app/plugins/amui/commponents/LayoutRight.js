webpackJsonp_name_([3],{556:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i(572),a=i.n(o);for(var n in o)"default"!==n&&function(t){i.d(e,t,function(){return o[t]})}(n);var r=i(590),s=i.n(r),l=i(0),d=l(a.a,s.a,!1,null,null,null);d.options.__file="src/amui/components/layout/right/rightWindow.vue",e.default=d.exports},561:function(t,e,i){"use strict";function o(t,e,i){var a=this;this.$children.forEach(function(r){(0,n.default)(this,a),r.$options.name===t?r.$emit.apply(r,[e].concat(i)):o.apply(r,[t,e].concat([i]))}.bind(this))}Object.defineProperty(e,"__esModule",{value:!0});var a=i(1),n=function(t){return t&&t.__esModule?t:{default:t}}(a);e.default={methods:{dispatch:function(t,e,i){for(var o=this.$parent||this.$root,a=o.$options.name;o&&(!a||a!==t);)(o=o.$parent)&&(a=o.$options.name);o&&o.$emit.apply(o,[e].concat(i))},broadcast:function(t,e,i){o.call(this,t,e,i)},hasChild:function(t){for(var e=!1,i=0;i<this.$children.length;i++){var o=this.$children[i],a=o.$options.name;if(console.log(a),"LayoutFooter"==a){e=!0;break}}return e}}}},565:function(e,i,o){"use strict";!function(e){e.fn.extend({slimScroll:function(i){var o={width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px",complate:null},a=e.extend(o,i),n=this,r=0;return this.each(function(){function o(t){if(u){var t=t||window.event,i=0;t.wheelDelta&&(i=-t.wheelDelta/120),t.detail&&(i=t.detail/3);var o=t.target||t.srcTarget||t.srcElement;e(o).closest("."+a.wrapperClass).is(x.parent())&&s(i,!0),t.preventDefault&&!S&&t.preventDefault(),S||(t.returnValue=!1)}}function s(t,e,i){S=!1;var o=t,n=x.outerHeight()-E.outerHeight();if(e&&(o=parseInt(E.css("top"))+t*parseInt(a.wheelStep)/100*E.outerHeight(),o=Math.min(Math.max(o,0),n),o=t>0?Math.ceil(o):Math.floor(o),E.css({top:o+"px"})),b=parseInt(E.css("top"))/(x.outerHeight()-E.outerHeight()),o=b*(x[0].scrollHeight-x.outerHeight()),i){o=t;var r=o/x[0].scrollHeight*x.outerHeight();r=Math.min(Math.max(r,0),n),E.css({top:r+"px"})}x.scrollTop(o),x.trigger("slimscrolling",~~o),d(),c()}function l(){v=Math.max(x.outerHeight()/x[0].scrollHeight*x.outerHeight(),y),E.css({height:v+"px"});var t=v==x.outerHeight()?"none":"block";E.css({display:t})}function d(){if(l(),clearTimeout(f),b==~~b){if(S=a.allowPageScroll,m!=b){var t=0==~~b?"top":"bottom";x.trigger("slimscroll",t)}}else S=!1;if(m=b,v>=x.outerHeight())return void(S=!0);E.stop(!0,!0).fadeIn("fast"),a.railVisible&&$.stop(!0,!0).fadeIn("fast")}function c(){a.alwaysVisible||(f=setTimeout(function(){a.disableFadeOut&&u||h||p||(E.fadeOut("slow"),$.fadeOut("slow"))},1e3))}r++;var u,h,p,f,g,v,b,m,w="<div></div>",y=30,S=!1,x=e(this);if(x.parent().hasClass(a.wrapperClass)){var C=x.scrollTop();if(E=x.siblings("."+a.barClass),$=x.siblings("."+a.railClass),l(),e.isPlainObject(i)){if("height"in i&&"auto"==i.height){x.parent().css("height","auto"),x.css("height","auto");var R=x.parent().parent().height();x.parent().css("height",R),x.css("height",R)}else if("height"in i){var W=i.height;x.parent().css("height",W),x.css("height",W)}if("scrollTo"in i)C=parseInt(a.scrollTo);else if("scrollBy"in i)C+=parseInt(a.scrollBy);else if("destroy"in i)return E.remove(),$.remove(),void x.unwrap();s(C,!1,!0)}}else if(!(e.isPlainObject(i)&&"destroy"in i)){a.height="auto"==a.height?x.parent().height():a.height;var M=e(w).addClass(a.wrapperClass).css({position:"relative",overflow:"hidden",width:a.width,height:a.height});x.css({overflow:"hidden",width:a.width,height:a.height});var $=e(w).addClass(a.railClass).css({width:a.size,height:"100%",position:"absolute",top:0,display:a.alwaysVisible&&a.railVisible?"block":"none","border-radius":a.railBorderRadius,background:a.railColor,opacity:a.railOpacity,zIndex:90}),E=e(w).addClass(a.barClass).css({background:a.color,width:a.size,position:"absolute",top:0,opacity:a.opacity,display:a.alwaysVisible?"block":"none","border-radius":a.borderRadius,BorderRadius:a.borderRadius,MozBorderRadius:a.borderRadius,WebkitBorderRadius:a.borderRadius,zIndex:99}),I="right"==a.position?{right:a.distance}:{left:a.distance};$.css(I),E.css(I),x.wrap(M),x.parent().append(E),x.parent().append($),a.railDraggable&&E.bind("mousedown",function(i){var o=e(document);return p=!0,t=parseFloat(E.css("top")),pageY=i.pageY,o.bind("mousemove.slimscroll",function(e){currTop=t+e.pageY-pageY,E.css("top",currTop),s(0,E.position().top,!1)}),o.bind("mouseup.slimscroll",function(t){p=!1,c(),o.unbind(".slimscroll")}),!1}).bind("selectstart.slimscroll",function(t){return t.stopPropagation(),t.preventDefault(),!1}),$.hover(function(){d()},function(){c()}),E.hover(function(){h=!0},function(){h=!1}),x.hover(function(){u=!0,d(),c()},function(){u=!1,c()}),x.bind("touchstart",function(t,e){t.originalEvent.touches.length&&(g=t.originalEvent.touches[0].pageY)}),x.bind("touchmove",function(t){if(S||t.originalEvent.preventDefault(),t.originalEvent.touches.length){s((g-t.originalEvent.touches[0].pageY)/a.touchScrollStep,!0),g=t.originalEvent.touches[0].pageY}}),l(),"bottom"===a.start?(E.css({top:x.outerHeight()-E.outerHeight()}),s(0,!0)):"top"!==a.start&&(s(e(a.start).position().top,null,!0),a.alwaysVisible||E.hide()),function(t){window.addEventListener?(t.addEventListener("DOMMouseScroll",o,!1),t.addEventListener("mousewheel",o,!1)):document.attachEvent("onmousewheel",o)}(this),r>=n.length&&a.complate&&a.complate()}}),this}}),e.fn.extend({slimscroll:e.fn.slimScroll})}(jQuery)},566:function(t,e,i){"use strict";var o=i(11),a=function(t){return t&&t.__esModule?t:{default:t}}(o);!function(t){jQuery.fn.extend({slimScrollHorizontal:function(e){var i={wheelStep:20,height:"auto",width:"250px",size:"7px",color:"#000",position:"bottom",distance:"1px",start:"left",opacity:.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:"0.2",railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,scroll:0,touchScrollStep:200},o=t.extend(i,e);return this.each(function(){function e(t,e,i){var a=t;if("auto"==S.css("left")&&S.css("left","0px"),e){a=parseInt(S.css("left"))+t*parseInt(o.wheelStep)/100*S.outerWidth();var s=m.outerWidth()-S.outerWidth();a=Math.min(Math.max(a,0),s),S.css({left:a+"px"})}if(p=parseInt(S.css("left"))/(m.outerWidth()-S.outerWidth()),a=p*(m[0].scrollWidth-m.outerWidth()),i){a=t;var l=a/m[0].scrollWidth*m.outerWidth();S.css({left:l+"px"})}m.scrollLeft(a),n(),r()}function i(){h=Math.max(m.outerWidth()/m[0].scrollWidth*m.outerWidth(),v),S.css({width:h+"px"})}function n(){if(i(),clearTimeout(c),p==~~p&&(b=o.allowPageScroll,f!=p)){var t=0==~~p?"left":"right";m.trigger("slimscroll",t)}if(f=p,h>=m.outerWidth())return void(b=!0);S.stop(!0,!0).fadeIn("fast"),o.railVisible&&y.stop(!0,!0).fadeIn("fast")}function r(){o.alwaysVisible||(c=setTimeout(function(){o.disableFadeOut&&s||l||d||(S.fadeOut("slow"),y.fadeOut("slow"))},1e3))}var s,l,d,c,u,h,p,f,g="<div></div>",v=30,b=!1,m=t(this);if(m.parent().hasClass("slimScrollDiv"))return void(scroll&&(S=m.parent().find(".slimScrollBar"),y=m.parent().find(".slimScrollRail"),e(m.scrollLeft()+parseInt(scroll),!1,!0)));var w=t(g).addClass(o.wrapperClass).css({position:"relative",overflow:"hidden",width:o.width,height:o.height});m.css({overflow:"hidden",width:o.width,height:o.height});var y=t(g).addClass(o.railClass).css({width:"100%",height:o.size,position:"absolute",bottom:0,display:o.alwaysVisible&&o.railVisible?"block":"none","border-radius":o.size,background:o.railColor,opacity:o.railOpacity,zIndex:90}),S=t(g).addClass(o.barClass).css({background:o.color,height:o.size,position:"absolute",bottom:0,opacity:o.opacity,display:o.alwaysVisible?"block":"none","border-radius":o.size,BorderRadius:o.size,MozBorderRadius:o.size,WebkitBorderRadius:o.size,zIndex:99}),x="top"==o.position?{top:o.distance}:{bottom:o.distance};y.css(x),S.css(x),m.wrap(w),m.parent().append(S),m.parent().append(y),S.draggable({axis:"x",containment:"parent",start:function(){d=!0},stop:function(){d=!1,r()},drag:function(i){e(0,t(this).position().left,!1)}}),y.hover(function(){n()},function(){r()}),S.hover(function(){l=!0},function(){l=!1}),m.hover(function(){s=!0,n(),r()},function(){s=!1,r()}),m.bind("touchstart",function(t,e){t.originalEvent.touches.length&&(u=t.originalEvent.touches[0].pageX)}),m.bind("touchmove",function(t){if(t.originalEvent.preventDefault(),t.originalEvent.touches.length){e((u-t.originalEvent.touches[0].pageX)/o.touchScrollStep,!0)}});var C=function(t){if(s){var t=t||window.event,i=0;t.wheelDelta&&(i=-t.wheelDelta/120),t.detail&&(i=t.detail/3),e(i,!0),t.preventDefault&&!b&&t.preventDefault(),b||(t.returnValue=!1)}};!function(){window.addEventListener?(this.addEventListener("DOMMouseScroll",C,!1),this.addEventListener("mousewheel",C,!1)):document.attachEvent("onmousewheel",C)}(),i(),"right"==o.start?(S.css({left:m.outerWidth()-S.outerWidth()}),e(0,!0)):"object"==(0,a.default)(o.start)&&(e(t(o.start).position().left,null,!0),o.alwaysVisible||S.hide())}),this}}),jQuery.fn.extend({slimscrollHorizontal:jQuery.fn.slimScrollHorizontal})}(jQuery)},572:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),i(565),i(566);var o=i(561),a=function(t){return t&&t.__esModule?t:{default:t}}(o);e.default={name:"LayoutWindow",mixins:[a.default],props:{width:{type:[Number,String],default:210},url:{type:String,default:""}},data:function(){return{hideSidebar:!0,sidebarixed:!1,contentURL:this.url,windWidth:this.width}},methods:{toggleSidebar:function(t){this.hideSidebar=!this.hideSidebar},domainURI:function(t){var e=/http:\/\/([^\/]+)/i,i=t.match(e);return i?i[0]:document.location.protocol+"//"+document.location.host}},computed:{getRightWindURL:function(){return""==this.contentURL?"":this.contentURL+"#"+encodeURIComponent(document.location.href)}},mounted:function(){var t=this;$(".sidebar-inner").slimScroll({height:"100%",complate:function(){}}),this.$amui.$on("openSidebarEvent",function(e){t.toggleSidebar(e)}),this.$amui.$on("openWind",function(){t.hideSidebar=!1}),this.$amui.$on("closeWind",function(){t.hideSidebar=!0}),this.$amui.$on("loadRightWindURL",function(e){this.$amui.setStore("PageContentUrl",e),t.loadURL(e+"#"+encodeURIComponent(document.location.href))}),window.rightWind=this,this.$amui.$on("iframeSendMsg",function(e){if("openMap"==e.type){t.hideSidebar=!1;var i=e.data;if(!i)return;if(isNaN(i))return;this.windWidth=e.data}else"closeMap"==e.type?t.hideSidebar=!0:"sendRightWindURL"==e.type&&(t.contentURL=e.data)}),this.$amui.$on("sendRightWindPageMsg",function(e){var i=document.getElementById("rightWindConentIframe");$.postMessage(e,t.contentURL,i.contentWindow)})}}},590:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("aside",{staticClass:"right-sidebar",class:{"hide-sidebar":t.hideSidebar,"sidebar-fixed":t.sidebarixed},style:{width:t.windWidth+"px"},attrs:{id:"right-sidebar"}},[i("div",{staticClass:"sidebar-inner"},[t._t("default",[i("iframe",{staticStyle:{height:"100%",width:"100%"},attrs:{id:"rightWindConentIframe",src:t.getRightWindURL,frameborder:"0"}})])],2)])},a=[];o._withStripped=!0;var n={render:o,staticRenderFns:a};e.default=n}});