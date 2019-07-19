import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
	state:{
		videoId:0,
	},
	mutations:{
		getVideoId(state,videoId){
			state.videoId = videoId;
		}
	}
});
export default store;