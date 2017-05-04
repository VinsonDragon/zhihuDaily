import axios from 'axios';
const API = 'https://zhihu-daily.leanapp.cn/api/v1';
const zhihuAPI = {
    news        :   '/last-stories',
    newsbyid    :   '/contents/',
    newsbydate  :   '/before-stories/',
    newsinfo	:	'/contents/extra/',
    topics		:	'/themes',
    topicbyid	:	'/themes/',
};

const NewsResource 		=	API.concat(	zhihuAPI.news		 ); // 获取最新消息
const NewsIdResource 	=	API.concat(	zhihuAPI.newsbyid	 ); // 获取消息内容
const NewsDateResource 	=	API.concat(	zhihuAPI.newsbydate	 ); // 获取过往消息
const NewsInfoResource 	=	API.concat(	zhihuAPI.newsinfo	 ); // 新闻额外信息
const TopicsResource 	=	API.concat(	zhihuAPI.topics		 ); // 主题日报列表查看
const TopicsIdResource 	=	API.concat(	zhihuAPI.topicbyid	 ); // 主题日报内容查看

export default {
	getNews() {
		return axios.get( NewsResource )
	},
	getNewsById( id ) {
		return axios.get( NewsIdResource + id )
	},
	getNewsByDate( date ) {
		return axios.get( NewsDateResource + date )
	},
	getNewsInfoById( id ) {
		return axios.get( NewsInfoResource, {
			params: {
				id: id
			}
		} )
	},
	getTopics() {
		return axios.get( TopicsResource )
	},
	getTopicsById( topicid ) {
		return axios.get( TopicsIdResource + topicid )
	}
}
