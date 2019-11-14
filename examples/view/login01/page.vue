<template>
	<login-t01 ref="login" title="闸门监控系统" sub-title="ZHAMENJIANKONGXITONG" @login="login"></login-t01>
</template>

<script>
	export default {
		name: 'vueComponent',
		components: {},
		data () {
			return {}
		},
		methods: {
			login:function(data){
//				console.log(data);
				//ajax 请求登录
//				this.$router.replace('/ny')
				this.$refs['login'].formClear();
			}
		}
	}
</script>

<style lang="" scoped>

</style>