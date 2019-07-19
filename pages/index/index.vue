<template>
	<view class="main">
		<!-- 公共头部 -->
		<MyTitle></MyTitle>
		<!-- 首页导航模块 -->
		<view class="nav-wrap">
			<!-- 滚动区域组件 -->
			<scroll-view class="nav" scroll-x>
				<view class="nav-item" :class="[index===currentIndexNav?'active':'']" v-for="(item,index) in navList" :key="index" @click="activeNav(index)">
					{{item.text}}
				</view>
			</scroll-view>
		</view>
		
		<!-- 轮播图区域 -->
		<view class="slides">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2500" :duration="500" circular="true">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.imgSrc" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 视频列表 -->
		<view class="video-wrap">
			<navigator class="video-item" v-for="(item,index) in videosList" :key="index" url="../detail/detail" @click="toDetail(index)">
				<!-- 图片 -->
				<view class="video-img">
					<image :src="item.imgSrc" mode="widthFix" class="video-img-image"></image>
					<view class="video-info">
						<!-- 播放量 -->
						<view class="play-count">
							<!-- 图标 -->
							<image class="count-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTAyLTI0VDE3OjU2OjU1KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wMi0yNFQxODoxMDozOCswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wMi0yNFQxODoxMDozOCswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4MWJkMGJmZi1hOWMzLTQxMzAtYTg3ZC1lMzkyZDkwNDg2OWUiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1MjNhYmY1Ny1lMzc1LTY3NGItODBkMC1jOGVkMmU5MzE4MmQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NjJhNDQ5MS1lOTBlLTRlYWUtYjNmYy02Zjc1OTYyZmQ5OGQiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjU2MmE0NDkxLWU5MGUtNGVhZS1iM2ZjLTZmNzU5NjJmZDk4ZCIgc3RFdnQ6d2hlbj0iMjAxOS0wMi0yNFQxNzo1Njo1NSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplNmNkNDRiMy00YmJiLTQ3ZDEtOTk4NC03YjdjN2U0NDExNzIiIHN0RXZ0OndoZW49IjIwMTktMDItMjRUMTc6NTg6NDArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODFiZDBiZmYtYTljMy00MTMwLWE4N2QtZTM5MmQ5MDQ4NjllIiBzdEV2dDp3aGVuPSIyMDE5LTAyLTI0VDE4OjEwOjM4KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5eAHUwAAAkZJREFUWMPd10uITmEYB3AmlzFhMjZMikKYZDMymiLCRs1iUDZMSFNiJ+OSiGyk2YyoyYLcsxAhKRuRNKIQZcFmlI1cUi6Jn83z6e30fb65nRk59W6ey///P+953ue8zzAMG8rVl6QF2IB9OIZ27EUL6vMS0IDzev6cDKH9FlCPewnwCxzCEszBtFh1aEIHXibxdzGvrwJ2J0CdmNGLrZ0Tu1B4dvRWwLVIvI5J/Siy2tgFuNxTATcj4fAAVvvRwLxaTsCuCGzP4ch1BHZbKQEzI+B2juf+TnBMLSbgYTirchQwITgeZAVMSYou7+53I92F7LdfOAgCGoNreyrgVhgHo/+PDK5LqYC3+FYioRrr0sKJVYnTeIK1Gd9sPEJXFHcW83Pk/RHwFe+LBNaEOPiCyYmvNdP/q4oUNFwpgtuN16mAl/hZJHBuhqQx8a1I7K8wKvF1Jr4DRXC/F05CwXAhgsdkAodHF3uLM/H9Un8zdsZOZUnasK2IfVxwnUgFtISxuUQdVAxgETYF16ZUQGUYnw3CKXgaXOOznbDQqxtyJF8UHMeLteIK/MCH+PZ5CPiIXxhR6m+4NBR25UB+P7CXl7sPbI/Ax5g4AMS1SV/Y2dMb0ebkHK/vB3mK09rbO2EDPkVyXS9Ia7ARbyL33d8KuxxYW4DUJ+AXcQ5bsAarsTUq+3mmc+4pV9DlBBwMoGqs6sE88BOn4uc0ciDmgv0BXGge3ZiP0Zge88FKzMLYPEaz9uTtjgzFbLgMZ7H4XxpO/y8BvwECG56AUcCFqwAAAABJRU5ErkJggg==" mode="widthFix"></image>
							<!-- 数值 -->
							<text class="play-count">{{item.playCount}}</text>
						</view>
						<!-- 评论量 -->
						<view class="comment-count">
							<image class="count-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTAyLTI0VDE3OjU2OjU1KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wMi0yNFQxODoxMDozOCswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wMi0yNFQxODoxMDozOCswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4MWJkMGJmZi1hOWMzLTQxMzAtYTg3ZC1lMzkyZDkwNDg2OWUiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1MjNhYmY1Ny1lMzc1LTY3NGItODBkMC1jOGVkMmU5MzE4MmQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NjJhNDQ5MS1lOTBlLTRlYWUtYjNmYy02Zjc1OTYyZmQ5OGQiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjU2MmE0NDkxLWU5MGUtNGVhZS1iM2ZjLTZmNzU5NjJmZDk4ZCIgc3RFdnQ6d2hlbj0iMjAxOS0wMi0yNFQxNzo1Njo1NSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplNmNkNDRiMy00YmJiLTQ3ZDEtOTk4NC03YjdjN2U0NDExNzIiIHN0RXZ0OndoZW49IjIwMTktMDItMjRUMTc6NTg6NDArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODFiZDBiZmYtYTljMy00MTMwLWE4N2QtZTM5MmQ5MDQ4NjllIiBzdEV2dDp3aGVuPSIyMDE5LTAyLTI0VDE4OjEwOjM4KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5eAHUwAAAkZJREFUWMPd10uITmEYB3AmlzFhMjZMikKYZDMymiLCRs1iUDZMSFNiJ+OSiGyk2YyoyYLcsxAhKRuRNKIQZcFmlI1cUi6Jn83z6e30fb65nRk59W6ey///P+953ue8zzAMG8rVl6QF2IB9OIZ27EUL6vMS0IDzev6cDKH9FlCPewnwCxzCEszBtFh1aEIHXibxdzGvrwJ2J0CdmNGLrZ0Tu1B4dvRWwLVIvI5J/Siy2tgFuNxTATcj4fAAVvvRwLxaTsCuCGzP4ch1BHZbKQEzI+B2juf+TnBMLSbgYTirchQwITgeZAVMSYou7+53I92F7LdfOAgCGoNreyrgVhgHo/+PDK5LqYC3+FYioRrr0sKJVYnTeIK1Gd9sPEJXFHcW83Pk/RHwFe+LBNaEOPiCyYmvNdP/q4oUNFwpgtuN16mAl/hZJHBuhqQx8a1I7K8wKvF1Jr4DRXC/F05CwXAhgsdkAodHF3uLM/H9Un8zdsZOZUnasK2IfVxwnUgFtISxuUQdVAxgETYF16ZUQGUYnw3CKXgaXOOznbDQqxtyJF8UHMeLteIK/MCH+PZ5CPiIXxhR6m+4NBR25UB+P7CXl7sPbI/Ax5g4AMS1SV/Y2dMb0ebkHK/vB3mK09rbO2EDPkVyXS9Ia7ARbyL33d8KuxxYW4DUJ+AXcQ5bsAarsTUq+3mmc+4pV9DlBBwMoGqs6sE88BOn4uc0ciDmgv0BXGge3ZiP0Zge88FKzMLYPEaz9uTtjgzFbLgMZ7H4XxpO/y8BvwECG56AUcCFqwAAAABJRU5ErkJggg==" mode="widthFix"></image>
							<text class="comment-count">{{item.commentCount}}</text>
						</view>
					</view>
				</view>
				<!-- 标题 -->
				<view class="video-title">{{item.desc}}</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import MyTitle from "../../components/MyTitle.vue";
	export default {
		components:{
			MyTitle
		},
		data(){
			return {
				// 选中状态
				currentIndexNav:0,
				// 导航数据
				navList:[],
				// 轮播图数据
				swiperList:[],
				// 视频数据
				videosList:[]
			}
		},
		methods:{
			// 导航栏点击时间
			activeNav(index){
				this.currentIndexNav = index;
			},
			// 获取导航数据
			getNavList(){
				uni.request({
					url:"https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/navlist",
					data:{},
					header:{},
					success: res => {
						this.navList = res.data.data.navList;
					},
					fail: res => {
						console.log("请求失败");
					}
				})
			},
			// 获取轮播图数据
			getLunbo(){
				uni.request({
					url:'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/swiperList',
					data:{},
					header:{},
					success: res => {
						this.swiperList = res.data.data.swiperList;
					},
					fail: res => {
						console.log("请求失败");
					}
				})
			},
			// 获取视频列表数据
			getVideoList(){
				uni.request({
					url:'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/videosList',
					data:{},
					header:{},
					success: res => {
						this.videosList = res.data.data.videosList;
					},
					fail: res => {
						console.log("请求失败");
					}
				})
			},
			// 将视频id传到vuex中
			toDetail(index){
				this.$store.commit('getVideoId',index);
			}
		},
		onLoad(){
			this.getNavList();
			this.getLunbo();
			this.getVideoList();
		}
	}
</script>

<style>
	/* 首页导航区域 */
	page{
		color: #66666;
		padding: 10upx;
	}
	.nav-wrap{
		
	}
	.nav{
		white-space: nowrap;
		padding: 5upx 0;
	}
	.nav-item{
		padding: 20upx 30upx;
		font-size: 30upx;
		display: inline-block;
	}
	.active{
		border-bottom: 5upx solid #de688b;
	}
	/* 轮播图区域 */
	.slides{
		margin-top: 10upx;
	}
	.slides swiper{
		height: 220upx;
	}
	.slides navigator{
		width: 100%;
		height: 100%;
	}
	.slides image{
		width: 100%;
		height: 100%;
	}
	/* 视频列表区域 */
	.video-wrap {
	  display: flex;
	  flex-wrap: wrap;
	  padding: 5upx;
	  justify-content: space-between;
	}

	.video-item {
	  width: 48%;
	  margin-bottom: 20upx;
	}

	.video-img{
	  position: relative;
	}

	.video-img-image {
	  width: 100%;
	  border-radius: 16upx;
	}

	.video-img .video-info {
	  display: flex;
	  justify-content: space-around;
	  position: absolute;
	  left: 0;
	  bottom: 8upx;
	  width: 100%;
	  color: #fff;
	  font-size: 20upx;
	}

	.count-image {
	  width: 24upx;
	  padding-right: 8upx;
	}

	.video-title {
	  display: -webkit-box;
	  overflow: hidden;
	  white-space: normal;
	  text-overflow: ellipsis;
	  word-wrap: break-word;
	  -webkit-line-clamp:2;
	  -webkit-box-orient:vertical;
	  font-style: 28upx;
	}
</style>