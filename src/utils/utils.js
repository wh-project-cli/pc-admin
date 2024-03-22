import { Message, Loading } from 'eoss-element';
import request from 'eoss-ui/lib/utils/http';
//获取当前时间
const getDateTime = type => {
	const date = new Date();
	let hengGang = '-';
	let maoHao = ':';
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let curDate = date.getDate();
	let curHours = date.getHours();
	let curMinutes = date.getMinutes();
	let curSeconds = date.getSeconds();

	if (month >= 1 && month <= 9) {
		month = '0' + month;
	}
	if (curDate >= 0 && curDate <= 9) {
		curDate = '0' + curDate;
	}
	if (curHours >= 0 && curHours <= 9) {
		curHours = '0' + curHours;
	}
	if (curMinutes >= 0 && curMinutes <= 9) {
		curMinutes = '0' + curMinutes;
	}
	if (curSeconds >= 0 && curSeconds <= 9) {
		curSeconds = '0' + curSeconds;
	}
	let currentdate = '';
	if (type == 'year') {
		currentdate = year;
		return currentdate;
	} else if (type == 'month') {
		currentdate = year + hengGang + month;
		return currentdate;
	} else if (type == 'day') {
		currentdate = year + hengGang + month + hengGang + curDate;
		return currentdate;
	} else {
		currentdate =
			year +
			hengGang +
			month +
			hengGang +
			curDate +
			' ' +
			curHours +
			maoHao +
			curMinutes +
			maoHao +
			curSeconds;
		return currentdate;
	}
};
// 打印
const print = (id, printType) => {
	let loadingInstance = Loading.service({ fullscreen: true, text: '加载中' });

	request({
		url: '/ecs/ecsCashierReview/getPrintUrl',
		method: 'get',
		params: {
			id,
			printType
		}
	}).then(res => {
		loadingInstance.close();
		if (res.rCode === 0) {
			// const CDZS_ENV = process.env['VUE_APP_ENV'];
			// 获取基础 URL 打一个包兼容测试和正式环境
			let newBaseURL = '';
			if (window.self === window.top) {
				newBaseURL = window.location.origin;
			} else {
				newBaseURL = window.top.location.origin;
			}
			const printUrlN = `${newBaseURL}${res.results.printUrl}`;
			const paramUrlN = `${newBaseURL}${res.results.paramUrl}`;
			var encodedUrl = encodeURIComponent(paramUrlN);
			console.log(printUrlN + encodedUrl, 'printUrlN + encodedUrl');
			window.open(printUrlN + encodedUrl);
		} else {
			Message({
				message: res.msg,
				type: 'warning'
			});
		}
	});
};
export { getDateTime, print };
