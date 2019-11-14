/**
 * Created by tiner on 2018/12/29.
 */

var tel = "";
var num =  "";
var string = "";

//用户名正则，4到16位（字母，数字，下划线，减号）
export var userName = /^[a-zA-Z0-9_-]{4,16}$/;
//密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
export var password = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
//正整数正则
export var posPattern = /^\d+$/;
//负整数正则
export var negPattern = /^-\d+$/;
//整数正则
export var intPattern = /^-?\d+$/;

//Email正则
export var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//手机号正则
export var mPattern = /^1[34578]\d{9}$/; //http://caibaojian.com/regexp-example.html
//身份证号（18位）正则
export var cP = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//URL正则
export var urlP= /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
//ipv4地址正则
export var ipP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
//RGB Hex颜色正则
export var cPattern = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
//日期正则，简单判定,未做月份及日期的判定
export var dP1 = /^\d{4}(\-)\d{1,2}\1\d{1,2}$/;

//日期正则，复杂判定
export var dP2 = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;

//QQ号正则，5至11位
export var qqPattern = /^[1-9][0-9]{4,10}$/;
//微信号正则，4至20位，以字母开头，字母，数字，减号，下划线,字符长度:最小:1+3 最大 1+19    使用
export var wxPattern = /^[a-zA-Z]([-_a-zA-Z0-9]{3,19})+$/;

//包路径正则 ，点分割的,3至20位，以字母开头，字母，数字，减号，下划线,例:a12、aaa、abcdef      使用
export var groupidex = /^[a-zA-Z]([-_a-zA-Z0-9]{2,19})(\.[a-zA-Z]([-_a-zA-Z0-9]{2,19}))*$/;

//包含中文正则
export var cnPattern = /[\uFF00-\uFFEF]/;

//只能包含字母
export var noCnPattern = /^[a-zA-Z]+$[0-9].*/;

//数字正则
export var numPattern = /^\d+$/;


export default {
  userName:userName,
  password:password,
  posPattern:posPattern,
  negPattern:negPattern,
  intPattern:intPattern,
  ePattern:ePattern,
  mPattern:mPattern,
  cP:cP,
  urlP:urlP,
  ipP:ipP,
  cPattern:cPattern,
  dP1:dP1,
  dP2:dP2,
  qqPattern:qqPattern,
  wxPattern:wxPattern,
  groupidex:groupidex,
  cnPattern:cnPattern,
  noCnPattern:noCnPattern,
  numPattern:numPattern
}
