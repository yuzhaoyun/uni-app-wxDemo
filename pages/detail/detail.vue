<template>
	<view>
		<MyTitle></MyTitle>
		<view class="video-info">
			<video :src="videoInfo.videoSrc" controls></video>
			<view class="video-title">
				<text>{{videoInfo.videoTitle}}</text>
				<text class="fa fa-angle-down"></text>
			</view>
			<view class="video-detail">
				<text class="author">{{videoInfo.author}}</text>
				<text class="play-count">{{videoInfo.playCount}}</text>
				<text class="comment-count">{{videoInfo.commentCount}}</text>
				<text class="date">{{videoInfo.date}}</text>
			</view>
			<view class="other-list">
				<navigator class="item-other" v-for="(item,index) in othersList" :key="index">
					<view class="other-img-wrap">
						<image :src="item.imgSrc" mode="widthFix"></image>
					</view>
					<view class="other-info">
						<view class="other-title">{{item.title}}</view>
						<view class="other-detail">
							<text class="play-count">{{item.playMsg}}万播放</text>
							<text class="comment-count">{{item.commentCount}}条弹幕</text>
						</view>
					</view>
				</navigator>
			</view>
			<view class="comment-wrap">
				<view class="comment-title">
					评论({{commentData.commentTotalCount}})
				</view>
				<view class="comment-list">
					<view class="comment-item" v-for="(item,index) in commentData.commentList" :key="index">
						<view class="comment-user">
							<image :src="item.userIconSrc" mode="widthFix"></image>
						</view>
						<view class="comment-info">
							<view class="comment-detail">
								<text class="author">{{item.username}}</text>
								<text class="date">{{item.commentDate}}</text>
							</view>
							<view class="comment-content">{{item.commentInfo}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MyTitle from "../../components/MyTitle.vue";
	export default {
		components:{
			MyTitle
		},
		data() {
			return {
				// get方法的请求id
				videoId: 0,
				// 视频信息
				videoInfo:null,
				// 评论数据
				commentData:[],
				// 推荐视频
				othersList:[]
			}
		},
		methods: {
			// 获取视频信息
			getCurrentVideo(){
				uni.request({
					url: `https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/videoDetail?id=${this.$store.state.videoId}`,
					data:{},
					header:{},
					success: res => {
						if(res.data.code === 0){
							this.videoInfo = res.data.data.videoInfo;
						}
					}
				})
			},
			// 获取推荐视频
			getOtherslist(){
				uni.request({
					url:`https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/othersList?id=${this.$store.state.videoId}`,
					data:{},
					header:{},
					success: res => {
						this.othersList = res.data.data.othersList;
					}
				})
			},
			// 获取评论数据
			getComment(){
				uni.request({
					url:`https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/commentsList?id=${this.$store.state.videoId}`,
					data:{},
					header:{},
					success: res => {
						this.commentData = res.data.data.commentData;
					}
				})
			}
		},
		onShow(){
			this.getCurrentVideo();
			this.getOtherslist();
			this.getComment();
		}
	}
</script>

<style>
	/* pages/detail/detail.wxss */
	.main {
	  padding: 10upx;
	  color: #666;
	}
	.video-info {
	  margin-top: 10upx;
	}
	.video-info video {
	  width: 100%;
	}
	.video .title {
	  display: flex;
	  justify-content: space-between;
	  font-size: 36upx;
	}
	.video-detail {
	  margin-top: 5upx;
	  font-size: 28upx;
	}
	.video-detail text {
	  margin-left: 12upx;
	}
	.video-detail .author {
	  color: #000;
	}
	.other-list {
	  margin-top: 10upx;
	}
	.item-other {
	  display: flex;
	  justify-content: space-between;
	  margin-bottom: 20upx;
	}
	.other-img-wrap {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  width: 30%;
	}
	.other-img-wrap image {
	  width: 90%;
	  border-radius: 15upx;
	}
	.other-info {
	  display: flex;
	  flex-direction: column;
	  justify-content: space-around;
	  width: 60%;
	}
	.other-title {
	  font-size: 30upx;
	  color: #e06f93;
	}
	.other-detail {
	  font-size: 26upx;
	  color: #666;
	}
	.comment-wrap {
	  margin-top: 10upx;
	}
	.comment-title{
		padding: 10upx;
		font-size: 28upx;
	}
	.comment-list {}
	.comment-item {
	  display: flex;
	  justify-content: space-between;
	  margin-bottom: 10upx;
	  padding: 10upx;
	  border-bottom: 1px solid #666;
	}
	.comment-user {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
	}
	.comment-user image {
		width: 60%;
		border-radius: 50%;
	}
	.comment-info{
		display: flex;
		flex: 5;
		flex-direction: column;
		justify-content: space-around;
	}
	.comment-detail{
		display: flex;
		justify-content: space-between;
	}
	.comment-detail .author{
	  font-size: 28upx;
	  color: #000;
	}
	.comment-detail .date{
		font-size: 24upx;
		color:#666;
	}
	.comment-content {
		font-size: 28upx;
		color: #000;
	}
</style>
