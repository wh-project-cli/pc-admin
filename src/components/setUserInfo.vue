<template>
	<div class="info-wrapper">
		<el-tabs v-model="activeName">
			<el-tab-pane label="个人信息" name="1"></el-tab-pane>
			<el-tab-pane label="主题管理" name="2"></el-tab-pane>
		</el-tabs>
		<div v-show="activeName === '1'">
			<es-form
				ref="form"
				:model="values"
				:contents="forms"
				height="640px"
				class="es-user-info"
				@change="handleFormChange"
				@submit="handleFormSubmit"
			></es-form>
			<div v-if="qrcode" class="qrcode">
				<img :src="qrcode" @dblclick="getQrcode" />
			</div>
		</div>
		<div v-show="activeName === '2'" class="list">
			<div class="list-item">
				<el-row :gutter="20">
					<el-radio-group v-model="radio">
						<el-col v-for="o in records" :key="o.id" :span="6" class="item-bottom">
							<el-card :body-style="{ padding: '0px' }">
								<div style="padding: 14px" @click="radioClick(o)">
									<div class="bottom clearfix">
										<span class="time">{{ o.themesName }}</span>
										<el-radio class="button" :label="o.id">{{ '' }}</el-radio>
									</div>
								</div>
								<img
									class="image"
									:src="o.thumbnail ? baseUrl + o.thumbnail : defaultImg"
									alt=""
									@click="radioClick(o)"
								/>
							</el-card>
						</el-col>
					</el-radio-group>
				</el-row>
				<div class="temp-pagination">
					<el-pagination
						background
						layout="prev, pager, next"
						:total="totalCount"
						@current-change="handlePageChange"
					></el-pagination>
				</div>
			</div>
			<div class="list-button">
				<el-button type="primary" @click="handleToIndex">保存</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import {
	initUserSet,
	updateUserCustomInfo,
	updateUserInfo,
	downloadByAdjunctId,
	switchUserTo
} from 'eoss-ui/lib/config/api.js';
import store from 'eoss-ui/lib/utils/store';
import $ from 'eoss-ui/lib/utils/util';
import request from 'eoss-ui/lib/utils/http';
import { getThemeList, setUpdateUserCustomInfo, getMainConfigInfo } from '@/api/theme';
import defaultImg from '@/assets/404_images/404.png';

export default {
	props: {
		showNotify: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			records: [],
			defaultImg,
			radio: false,
			activeName: '1',
			results: '',
			qrcode: '',
			baseUrl: '',
			pageNum: 1,
			pageSize: 10,
			totalCount: 0,
			notify: store.get('userStyle') ? store.get('userStyle')?.notify : '',
			checkPassword: '',
			checkPasswordMsg: '',
			NODE_ENV: '',
			values: {
				userHeadUrl: this.userModel?.userHeadUrl
					? this.userModel?.userHeadUrl
					: 'data:image/png;base64,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',
				job: '',
				orgName: '',
				depName: '',
				idcard: '',
				phone: '',
				email: '',
				officetel: '',
				oldpassword: '',
				password: '',
				notify: []
			}
		};
	},
	computed: {
		forms() {
			let page = [
				{
					title: '用户信息',
					contents: [
						{
							type: 'upload',
							name: 'userHeadUrl',
							label: '头像',
							portrait: true,
							code: 'USER_IMG',
							ownId: this.userModel?.personId,
							onSuccess: this.handleUploadSuccess,
							col: 12
						},
						// {
						//   type: 'upload',
						//   name: 'userQrcode',
						//   // label: '微信二维码',
						//   portrait: true,
						//   code: 'USER_IMG',
						//   ownId: 'ddd',
						//   class: 'es-qrcode',
						//   col: 12
						// },
						{
							type: 'select',
							name: 'job',
							label: '切换职务',
							valueType: 'object',
							data: this.userModel?.identityList,
							class: 'es-user-info-job',
							row: true,
							col: 12
						},
						{
							name: 'orgName',
							label: '所属机构',
							type: 'text',
							disabled: true,
							col: 6
						},
						{
							name: 'depName',
							label: '所属部门',
							type: 'text',
							disabled: true,
							col: 6
						},
						{
							name: 'idcard',
							label: '身份证号',
							type: 'text',
							disabled: true,
							row: true,
							col: 12
						},
						{
							name: 'phone',
							placeholder: '联系电话',
							label: '联系电话',
							type: 'text',
							col: 6
						},
						{
							name: 'email',
							placeholder: '电子邮箱',
							label: '电子邮箱',
							type: 'text',
							rules: {
								type: 'email',
								message: '请输入正确的邮箱地址',
								trigger: 'blur'
							},
							col: 6
						},
						{
							name: 'officetel',
							placeholder: '座机号',
							label: '座机号',
							type: 'text',
							rules: {
								type: 'telephone'
								//message: '请输入正确的邮箱地址',
								//trigger: 'blur'
							},
							col: 6
						},
						{
							name: 'oldpassword',
							placeholder: '旧密码',
							label: '旧密码',
							rules: this.values.password ? { required: true, message: '请输入旧密码' } : {},
							type: 'text',
							col: 6
						},
						{
							name: 'password',
							placeholder: '新密码',
							label: '新密码',
							type: 'text',
							rules: [
								this.checkPassword
									? {
											pattern: this.checkPassword,
											message: this.checkPasswordMsg ? this.checkPasswordMsg : '密码格式不合法',
											trigger: 'blur'
									  }
									: {}
							],
							col: 6
						},
						{
							name: 'repassword',
							placeholder: '确认新密码',
							label: '确认新密码',
							type: 'text',
							rules: [
								this.checkPassword
									? {
											pattern: this.checkPassword,
											message: this.checkPasswordMsg ? this.checkPasswordMsg : '密码格式不合法',
											trigger: 'blur'
									  }
									: {},
								{ validator: this.validatePass2, trigger: 'blur' }
							],
							col: 6
						}
					]
				}
			];
			if (this.showNotify) {
				page.push({
					title: '接收消息类型',
					contents: [
						{
							type: 'checkbox',
							labelHide: true,
							name: 'notify',
							col: 12,
							data: this.mainConfig.notifyList
						}
					]
				});
			}
			page.push({
				type: 'submit',
				contents: [
					{
						type: 'primary',
						text: '保存',
						event: 'confirm'
					}
				]
			});
			return page;
		}
	},
	beforeCreate(){
		this.mainConfig =
			sessionStorage.getItem('mainConfig') && JSON.parse(sessionStorage.getItem('mainConfig'));
		this.userModel = this.mainConfig.userModel;
	},
	created() {
		this.baseUrl =
			process.env.NODE_ENV === 'development' ? '/dev-api' : 'http://oa.zgpt.wisesoft.net.cn';
		this.getData();
		this.userModel?.identityList.forEach(item => {
			if (item.id === this.userModel.identityId) {
				this.values.job = item;
				return;
			}
		});
		this.getInfo();
		this.findThemeList();
	},
	mounted() {
		this.values.notify = this.notify ? this.notify.split(',') : [];
	},
	methods: {
		getInfo() {
			getMainConfigInfo().then(res => {
				if (res.rCode === 0) {
					this.radio = res.results.userStyle.layout;
					this.notify = res.results.userStyle.notify
					this.values.notify = this.notify ? this.notify.split(',') : [];
				}
			});
		},
		handlePageChange(pageNum) {
			this.pageNum = pageNum;
			this.findThemeList();
		},
		// 查询主题列表
		findThemeList() {
			this.loadingState = true;
			getThemeList({
				themeName: this.themeName,
				asc: true,
				orderBy: 'createTime',
				pageNum: this.pageNum || 1,
				pageSize: this.pageSize || 10
			})
				.then(res => {
					this.records = res.results.records;
					// this.records.forEach(item => {
					// 	if (item.state === id) {
					// 		this.radio = item.id;
					// 	}
					// });
					this.totalCount = res.results.totalCount;
					this.loadingState = false;
				})
				.catch(err => {
					this.loadingState = false;
				});
		},
		getQrcode() {
			this.qrcode = '';
			this.getData();
		},
		radioClick(o) {
			this.radio = o.id;
		},
		getData() {
			request({
				url: initUserSet
			}).then(res => {
				if (res.rCode === 0) {
					const results = JSON.parse(JSON.stringify(res.results));
					if (results.checkPassword) {
						this.checkPassword = results.checkPassword;
						store.set('checkPassword', results.checkPassword);
					}
					if (results.checkPasswordMsg) {
						this.checkPasswordMsg = results.checkPasswordMsg;
						store.set('checkPasswordMsg', results.checkPasswordMsg);
					}
					this.results = results.simpleUserInfo;
					this.values.orgName = results.simpleUserInfo.orgName;
					this.values.depName = results.simpleUserInfo.depName;
					this.values.idcard = results.simpleUserInfo.idcard;
					this.values.phone = results.simpleUserInfo.phone;
					this.values.email = results.simpleUserInfo.email;
					this.values.officetel = results.simpleUserInfo.officetel;
					if (results.userScanBindImgUrl) {
						this.qrcode = $.getStorage('host') + results.userScanBindImgUrl;
					} else {
						this.qrcode = '';
					}
				} else {
					this.$message.error(res.msg);
				}
			});
		},
		handleUploadSuccess(results, file) {
			const res = file.response;
			let url;
			if (res.url) {
				url = res.url;
			} else {
				url = downloadByAdjunctId + '?adjunctId=' + res.adjunctId;
			}
			this.$emit('change', 'userHeadUrl', url);
		},
		handleFormChange(type, value) {
			switch (type) {
				case 'job':
					request({ url: switchUserTo, params: { userId: value.value } }).then(res => {
						if (res.rCode == 0) {
							$.setStorage({
								type: this.storage,
								key: 'userId',
								value: value.value
							});
							this.$message({
								message: res.msg,
								type: 'success',
								duration: 500,
								onClose: () => {
									if (window.location.href.indexOf('#/main') > -1) {
										location.reload();
									} else {
										this.$router.replace('/main');
									}
								}
							});
						} else {
							this.$message({
								message: res.msg,
								type: 'error',
								duration: 1500
							});
						}
					});
					break;
			}
		},
		// 切换主题
		handleToIndex(id) {
			// let layout = '';
			// let color = '';
			// this.records.forEach(item => {
			// 	if (item.id == this.radio) {
			// 		layout = item.layout;
			// 		color = item.theme;
			// 	}
			// });
			setUpdateUserCustomInfo({
				layout: this.radio
			})
				.then(res => {
					if (res.rCode == 0) {
						this.$message.success('主题切换成功！');
						this.$emit('bntClick');
						this.findThemeList();
					} else {
						throw res.msg;
					}
				})
				.catch(err => {
					console.log(err);
					this.$message.error('请在子系统中进行使用！');
				});
		},
		handleFormSubmit() {
			let initLogin = $.getStorage('initLogin');
			initLogin && (initLogin = JSON.parse(initLogin));
			request({
				url: updateUserInfo,
				params: {
					email: this.values.email,
					officeTel: this.values.officetel,
					phone: this.values.phone,
					// oldPassword:
					// 	initLogin && initLogin.secret
					// 		? $.esmEncrypt({
					// 				data: this.values.oldpassword,
					// 				key: initLogin.secret
					// 		  })
					// 		: this.values.oldpassword,
					// password:
					// 	initLogin && initLogin.secret
					// 		? $.esmEncrypt({
					// 				data: this.values.password,
					// 				key: initLogin.secret
					// 		  })
					// 		: this.values.password
					oldPassword: this.values.oldpassword,
					password: this.values.password
				}
			}).then(res => {
				if (res.rCode === 0) {
					if (this.values.oldpassword && this.values.password) {
						this.$confirm('密码修改成功,请重新登录！', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							closeOnClickModal: false,
							type: 'warning'
						})
							.then(() => {
								const hash = window.top.location.hash;
								if (hash) {
									const len = window.top.location.href.indexOf(hash);
									window.top.location.href = window.location.href.slice(0, len) + '#/login';
								} else {
									const loginPage = $.getStorage('login') || $.getStorage('loginPage');
									if (loginPage) {
										window.top.location.href = loginPage;
									} else {
										window.top.location.href = '/login.html';
									}
								}
							})
							.catch(() => {});
					} else {
						const notify = this.values.notify.sort().join(',');
						if (notify != this.notify.split(',').sort().join(',')) {
							request({
								url: updateUserCustomInfo,
								params: {
									notify: notify
								}
							}).then(results => {
								if (res.rCode === 0) {
									this.$message.success(res.msg);
								} else {
									this.$message.error(res.msg);
								}
							});
						} else {
							this.$message.success(res.msg);
						}
					}
				} else {
					this.$message.error(res.msg);
				}
			});
			if (this.values.notify.length !== this.notify.split(',').length) {
				//
			}
		},
		validatePass2(rule, value, callback) {
			if (this.values.password && value === '') {
				callback(new Error('请再次输入密码'));
			} else if (this.values.password && value !== this.values.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		},
		repassword(rule, value, callback) {
			$.identical({ value: [value, this.values.password], callback });
		}
	}
};
</script>
<style lang="scss" scoped>
.list {
	&-item {
		height: 640px;
	}
	&-button {
		text-align: center;
		width: 100%;
	}
}
.time {
	font-size: 13px;
	color: #999;
}

.bottom {
	margin-top: 13px;
	line-height: 12px;
}

.button {
	padding: 0;
	float: right;
}
.item-bottom {
	margin-bottom: 20px;
}
.image {
	width: 100%;
	height: 120px;
	display: block;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: '';
}

.clearfix:after {
	clear: both;
}
.temp-pagination {
	text-align: right;
	padding-top: 20px;
	padding-bottom: 20px;
	::v-deep .el-pagination {
		font-weight: 400;
	}
}
</style>
