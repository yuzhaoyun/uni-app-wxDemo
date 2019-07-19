<template>
	<view class="my_title">
		<!-- logo -->
		<navigator class="logo">
			<image src="../static/logo.png" style="width: 140upx;height: 60upx;" class="logo_img" mode=""></image>
		</navigator>
		<!-- 搜索 -->
		<view class="search_icon">
			<image src="../static/search.png" style="width: 60upx;height: 44upx;" mode=""></image>
		</view>
		<!-- 用户 -->
		<view class="user_icon">
			<image src="../static/user.png" style="width: 54upx; height: 60upx;" mode=""></image>
		</view>
		<!-- 下载按钮 -->
		<view class="down_app">
			下载app
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.my_title{
		display: flex;
		align-items: center;
		padding: 10upx;
		background-color: #FFFFFF;
	}
	.logo{
		flex: 7;
	}
	.search_icon{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.user_icon{
		flex: 2;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.down_app{
		flex: 3;
		font-size: 30upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: pink;
		color: #FFFFFF;
		border-radius: 10upx;
		padding: 10upx;
	}
</style>
