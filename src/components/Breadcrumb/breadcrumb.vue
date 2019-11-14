<template>
	<div class="am-breadcrumb" flex  style="">
		<Breadcrumb>
			<BreadcrumbItem :key="index" v-for="(item,index) in list" >{{item}}</BreadcrumbItem>
		</Breadcrumb>
	</div>
	
</template>

<script>
	import eventConst from '@/config/EventConst.js'
	export default {
		name: 'am-breadcrumb',
		components: {},
		data () {
			return {
				list:[]
			}
		},
		methods: {
			initData(data){
				this.list = [];
				this.getData(data);
			},
			getData(item){
				this.list.splice(0,0,item.name);
				if(item.parent){
					this.getData(item.parent);
				}
			}
		},
		mounted(){
			this.$amui.$on(eventConst.MENU_CLICK_EVENT, this.initData);
			
		}
	}
</script>

<style lang="scss" >
	.am-breadcrumb{
		background: #fff;
		box-shadow: 1px 1px 3px #ccc;
		margin-right:5px;
		padding: 10px 0;
		/*border-bottom: 1px solid #ccc;*/
		padding-left: 10px;
		position: relative;
		z-index: 888;
	}
</style>