<template>
	<!--
		两种情况：
			用户登录，未登录
			用户有头像，没有头像
			用户修改密码地址
			用户详情显示区域

	-->
	<div class="user-menu" style="margin:0 22px;color:#fff;font-size: 14px;margin-top:-4px;">
		
		<template v-if="!userName">
			<am-icon name="iconyonghu"  style="vertical-align: middle;" :style="{'font-size':iconSize+'px'}"></am-icon>
			<a  :href="''+loginPage" style="color:#fff;">请登录</a>
		</template>
		<template v-if="userName">
			<Dropdown @on-click="selectDropdow">
				<a class="title" href="javascript:void(0)" style="line-height:50px;">
					<am-icon name="iconyonghu"  style="vertical-align: middle;" :style="{'font-size':iconSize+'px'}"></am-icon>
					{{userName}}
					
				</a>
				<DropdownMenu slot="list">
					<DropdownItem name="resetpwd">
						<Icon type="md-construct" style="margin-right:5px;"/>
						修改密码
					</DropdownItem>
					<DropdownItem name="userDetails">
						<Icon type="md-person" style="margin-right:5px;"/>
						用户详情
					</DropdownItem>
					<slot name="dropdownMenu">
					</slot>
				</DropdownMenu>
			</Dropdown>
		</template>
		<Modal
			:closable="true"
			:scrollable="true"
			:mask-closable="false"
			v-model="resetpwdVisible"
			width="500"
			title="密码修改">
			<div class="resetpwd">
				<slot name="resetpwd">
					<div class="addWin-wrap">
						<i-form ref="updatePWDformValidate" :model="formPwdValidate"
						        :rules="rulePwdValidate" :label-width="100">
							<form-item label="原密码" prop="oldpassword">
								<i-input v-model="formPwdValidate.oldpassword"
								         placeholder="请输入岗位名称"/>
							</form-item>
							<form-item label="新密码" prop="password">
								<i-input type="password"
								         v-model="formPwdValidate.password"
								         placeholder="请输入岗位名称"/>
							</form-item>
							<form-item label="重复密码" prop="repassword">
								<i-input type="password"
								         v-model="formPwdValidate.repassword"
								         placeholder="请输入岗位名称"/>
							</form-item>
						</i-form>
					</div>
				</slot>
			</div>
			<div slot="footer">
				<i-button type="primary" @click="updatePWDValidateAddForm('updatePWDformValidate')">提交
				</i-button>
				<i-button @click="closeAllWin" style="margin-left: 8px">取消</i-button>
			</div>
		</Modal>
		
		<Modal
			:closable="true"
			:scrollable="true"
			:mask-closable="false"
			v-model="userDetailsVisible"
			width="700"
			title="用户详情">
			<div class="userDetails">
				<slot name="userDetails">
					
					<table>
						<tr v-if="posList.length > 0">
							<th>所属区域</th>
							<td>{{posList[0].ad_name}}</td>
							<th>所属机构</th>
							<td>{{posList[0].UnitName}}</td>
						</tr>
						<tr v-for="(item,index) in posList" >
							<th>部门</th>
							<td>{{item.depname}}</td>
							<th>职务</th>
							<td>{{item.posname}}</td>
						</tr>
						<tr>
							<th style="width:140px;">用户名</th>
							<td>{{userName}}</td>
							<th style="width:140px;">真实姓名</th>
							<td>{{personObj.personname}}</td>
						</tr>
						<tr>
							<th>生日</th>
							<td>{{personObj.birthday|getBirthday}}</td>
							<th>性别</th>
							<td>{{personObj.gender| getGender}}</td>
						</tr>
						<tr>
							<th>联系方式</th>
							<td>{{personObj.telephone}}</td>
							<th>备注</th>
							<td>{{personObj.note}}</td>
						</tr>
						
					</table>
					
					
				</slot>
			</div>
			
			<div slot="footer">
			</div>
		</Modal>
	</div>
</template>

<script>
	import http from '@/utils/http'
	import validator from '@/utils/validator'
	var moment = require('moment');
	export default {
		props: {
			iconSize: {
				type: [Number, String],
				required: false,
				default: '34'
			},
			setting: {
				type: Object,
				required: false,
				default: () => {
				}
			},
			userName:{
				type:String,
				default:''
			},
			loginPage:{
				type:String,
				default:''
			},
			auumRoot:{
				type:String,
				default:''
			}
		},
		name: 'user-menu',
		components: {},
		data () {
			const checkPwdConn = (rule, value, callback) => {
				var that = this;
				if (!value) {
					return callback(new Error('原密码不能为空!'));
				}
				var getData = {};
				http({
					url: this.auumRoot + 'v1/Users/{uname}/{password}/getPassword',
					method: 'get',
					requireAuth: true,
					params: {
						"uname": that.formPwdValidate.username,
						"password": that.formPwdValidate.oldpassword
					}
				}).then(function (res) {
					if (res.flag == "success") {
						callback();
					} else {
						callback(new Error('原密码输入错误!'));
					}
				}).catch(function (res) {
					callback(new Error('原密码输入错误!'));
				});
			};
			
			const checkPwdReConn = (rule, value, callback) => {
				var that = this;
				if (!value) {
					return callback(new Error('密码不能为空!'));
				}
				
				if (that.formPwdValidate.password != that.formPwdValidate.repassword) {
					return callback(new Error('密码不相同,请重新输入!'));
				}
				return callback();
			};
			
			return {
				resetpwdVisible: false,
				userDetailsVisible: false,
				formPwdValidate: {
					idcode: '',
					username: 'tiner',//账号
					oldpassword: '',//密码
					password: '',//密码
					repassword: '',//密码
				},
				rulePwdValidate: {
					oldpassword: [
						{required: true, message: '原密码不能为空!', trigger: 'blur'},
						{validator: checkPwdConn, trigger: 'blur'}
					],
					password: [
						{required: true, message: '密码不能为空!', trigger: 'blur'}
					],
					repassword: [
						{required: true, message: '重复密码不能为空!', trigger: 'blur'},
						{validator: checkPwdReConn, trigger: 'blur'}
					],
				},
				idcode:'',
				personObj:{},
				posList:[]
			}
		},
		filters:{
			getGender(value){
				if(value == 1){
					return '男';
				}else{
					return '女';
				}
			},
			getBirthday(value){
				return new moment(value).format("YYYY年MM月DD日")
			}
		},
		methods: {
			async getUser(){
				
				var res2 = await http({
					url:this.auumRoot+'v1/Users/'+this.userName+'/getUserInfo',
					head:'raw',
					method: 'post'
				});
				this.idcode = res2.idcode;
				
				
				var res3 = await http({
					url:this.auumRoot+'v1/Persons/'+this.idcode,
					method: 'get'
				});
				this.personObj = res3;
				
				
				var res4 = await http({
					url:this.auumRoot+'/v1/Users/'+this.userName+'/pos',
					method: 'get'
				});
				if(res4[0]){
					this.posList = res4;
				}
				
			},
			closeAllWin(){
				this.resetpwdVisible = false;
				this.userDetailsVisible = false;
			},
			updatePWDValidateAddForm(name){
				var that = this;
				this.$refs[name].validate((valid)=>{
					if (valid) {
						that.sendUpdatePwd();
					}
				})
			},
			async sendUpdatePwd(){
				
				var res = await http({
					url: this.auumRoot + 'v1/Users/changePassword',
					head: 'raw',
					method: 'post',
					data: {
						idcode: this.idcode,
						username: this.userName,
						password: this.formPwdValidate.password
					}
				});
				
				if (res.flag == "success") {
					this.resetpwdVisible = false;
					this.$Message.info("修改成功!");
				} else {
					this.$Message.info("修改失败!");
				}
			
			},
			loginOut(){
				
			},
			openResetPwd: function () {
				this.resetpwdVisible = true;
			},
			openDetails: function () {
				this.userDetailsVisible = true;
			},
			selectDropdow: function (name) {
				if (name == "resetpwd") {
					this.openResetPwd();
				} else if (name == "userDetails") {
					this.openDetails();
				} else{
					this.$emit('dropdownClick',name);
				}
			}
		},
		mounted(){
			
			if(!this.auumRoot){
				this.$Message.error("用户组件提示:请配置AUUM_ROOT!");
			}
			this.getUser();
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	.userDetails, .resetpwd {
		table {
			font-family: verdana, arial, sans-serif;
			font-size: 11px;
			color: #333;
			border-width: 1px;
			border-color: #666666;
			border-collapse: collapse;
			width: 100%;
		}
		table th {
			border-width: 1px;
			padding: 8px;
			border-style: solid;
			border-color: #ccc;
			background-color: #dedede;
		}
		table td {
			border-width: 1px;
			padding: 8px;
			border-style: solid;
			border-color: #ccc;
			background-color: #ffffff;
		}
	}
</style>
