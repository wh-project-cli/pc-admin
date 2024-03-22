import { getProjectType, getDictCode } from '@/api/project/apply';
import util from 'eoss-ui/lib/utils/util';

const state = {
	projectTypeObj: {}, // 项目类型对象
	projectTypeList: [], // 项目类型列表
	authStateList: [
		{ value: '2', text: '审核中', label: '审核中' },
		{ value: '4', text: '驳回', label: '驳回' },
		{ value: '6', text: '终审', label: '终审' }
	], // 审核状态列表-申请统计页面用
	projectStateList: [], // 项目状态字典数据
	projectInfo: {},
	shzt: [
		// 审核状态列表
		{ value: '0', text: '草稿' },
		{ value: '1', text: '未审核' },
		{ value: '2', text: '审核中' },
		{ value: '3', text: '已审核' },
		{ value: '4', text: '驳回' },
		{ value: '5', text: '初审' },
		{ value: '6', text: '终审' }
	]
};

const mutations = {
	setProjectType(state, data) {
		let arr = JSON.parse(JSON.stringify(data.list));
		let obj = Object.assign({}, state.projectTypeObj, data.obj);
		state.projectTypeObj = obj;
		state.projectTypeList = arr;
	},
	setAuthState(state, data) {
		state.authStateList = data;
	},
	settProjectState(state, data) {
		let arr = JSON.parse(JSON.stringify(data));
		state.projectStateList = arr;
	},
	setProjectInfo(state, data) {
		state.projectInfo = data;
	}
};

const actions = {
	getOptions(context) {
		// eslint-disable-next-line no-async-promise-executor
		return new Promise(async resolve1 => {
			let res1 = new Promise((resolve, reject) => {
				if (context.state.projectTypeList && context.state.projectTypeList.length) {
					resolve(true);
					return;
				}
				util.ajax({
					url: getProjectType,
					method: 'GET'
				})
					.then(res => {
						if (res.rCode === 0) {
							const obj = {};
							res.results.forEach(item => {
								item.value = item.id;
								item.label = item.name;
								obj[item.id] = item.name;
							});
							context.commit('setProjectType', {
								obj,
								list: res.results.filter(item => {
									return item.state == '0';
								})
							});
						}
						resolve(true);
					})
					.catch(err => {
						resolve(true);
					});
			});
			let res2 = new Promise((resolve, reject) => {
				if (context.state.authStateList && context.state.authStateList.length) {
					resolve(true);
					return;
				}
				// 获取审核状态
				util.ajax({
					url: getDictCode,
					method: 'GET',
					params: { code: 'omip_pm_project_establish_state' }
				})
					.then(res => {
						if (res.rCode === 0) {
							res.results.forEach(item => {
								item.label = item.text;
							});
							context.commit('setAuthState', res.results);
						}
						resolve(true);
					})
					.catch(err => {
						resolve(true);
					});
			});
			let res3 = new Promise((resolve, reject) => {
				if (context.state.projectStateList && context.state.projectStateList.length) {
					resolve(true);
					return;
				}
				util.ajax({
					url: getDictCode,
					method: 'GET',
					params: { code: 'store_project_state' }
				})
					.then(res => {
						if (res.rCode === 0) {
							res.results.forEach(item => {
								item.label = item.text;
							});
							context.commit('settProjectState', res.results);
						}
						resolve(true);
					})
					.catch(err => {
						resolve(true);
					});
			});
			const res = await Promise.all([res1, res2, res3]);
			resolve1(res);
		});
	},
	// 项目类型
	getProjectTypeReq(context) {
		if (context.state.projectTypeList && context.state.projectTypeList.length) {
			return;
		}
		util.ajax({
			url: getProjectType,
			method: 'GET',
			params: { params }
		}).then(res => {
			if (res.rCode === 0) {
				const obj = {};
				res.results.forEach(item => {
					item.value = item.id;
					item.label = item.name;
					obj[item.id] = item.name;
				});
				context.commit('setProjectType', {
					obj,
					list: res.results
				});
			}
		});
	},
	// 审核状态
	getAuthStates(context) {
		if (context.state.authStateList && context.state.authStateList.length) {
			return;
		}
		util.ajax({
			url: getDictCode,
			method: 'GET',
			params: { code: 'omiper_examine_state' }
		}).then(res => {
			if (res.rCode === 0) {
				res.results.forEach(item => {
					item.label = item.text;
				});
				context.commit('setAuthState', res.results);
			}
		});
	},
	// 项目状态字典
	getProjectState(context) {
		if (context.state.projectStateList && context.state.projectStateList.length) {
			return;
		}
		util.ajax({
			url: getDictCode,
			method: 'GET',
			params: { code: 'store_project_state' }
		}).then(res => {
			if (res.rCode === 0) {
				res.results.forEach(item => {
					item.label = item.text;
				});
				context.commit('settProjectState', res.results);
			}
		});
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
