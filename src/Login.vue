<template>
	<div id="app">
		<es-login
			type="3,0,11"
			toUrl="./main.html"
			:loginBackground="loginBackground"
			:login-logo="loginLogo"
		></es-login>
	</div>
</template>
<script>
import util from 'eoss-ui/lib/utils/util';
export default {
	data() {
		return {
			loginBackground: require('@/assets/image/bg.png'),
			loginLogo: require('@/assets/image/login-logo-2.png')
		};
	},
	created() {
		sessionStorage.setItem('loginPage', 'login.html');
		const color = localStorage.getItem('theme') || '#a60006';
		util.updateTheme(color);
	},
	mounted() {
		if (
			!util.getStorage('appcode') &&
			window.__store.state.initLogin &&
			Object.getOwnPropertyNames(window.__store.state.initLogin).length
		) {
			setTimeout(() => {
				util.setStorage(
					'localStorage',
					'appcode',
					window.__store.state.initLogin.subsystemExtend.applicationName
				);
			}, 200);
		}
	}
};
</script>
<style lang="scss" scoped>
#app {
	height: 100%;
	overflow: hidden;
	position: relative;
}
::v-deep .es-login {
	width: 520px;
	padding: 0 20px;
	left: 70%;
	transform: translate(0, -51%);
	z-index: 99;
	.es-login-main {
		padding: 0;
		.es-login-switchs .es-icon.es-icon-active {
			color: #2d74ff;
		}
	}
	.es-login-form-box {
		padding: 40px 48px;
	}
	.es-login-form {
		position: relative;
		z-index: 3;
		padding-bottom: 0;
		.el-form-item {
			margin-bottom: 28px;
		}
		.es-login-title {
			color: #1359ff;
			margin-bottom: 32px;
			.es-login-title-content {
				margin: 0px 16px;
				font-weight: bold;
			}
		}
		.el-input__inner {
			font-size: 18px;
			padding-right: 16px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			&::-webkit-input-placeholder {
				font-size: 16px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #999999;
			}
			&:-moz-placeholder {
				font-size: 16px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #999999;
			}
			&::-moz-placeholder {
				font-size: 16px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #999999;
			}
			&:-ms-input-placeholder {
				font-size: 16px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #999999;
			}
		}
		.es-password-handle {
			margin-top: 0;
			padding-top: 4px;
			margin-bottom: 28px;
		}
		.es-button-submit {
			height: 50px;
			background: linear-gradient(-30deg, #5094fb 0%, #2d74ff 100%);
			border-radius: 25px;
			border: 0;
			font-size: 20px;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #ffffff;
			margin-bottom: 12px;
		}
		&.es-login-verify {
			.es-login-title {
				margin-bottom: 58px;
			}
			.el-form-item {
				margin-bottom: 54px;
			}
		}
		.es-label-image-code .es-get-code:not(.is-disabled) {
			background-color: #409eff;
			border-color: #409eff;
		}
	}
	.es-login-qrcode {
		.es-login-title {
			color: #1359ff;
			margin-bottom: 28px;
			.es-login-title-content {
				margin: 0px 16px;
				font-weight: bold;
			}
		}
		.es-qrcode-box,
		.es-wx-qrcode-box {
			padding-top: 18px;
			padding-bottom: 12px;
		}
	}
	@media screen and (max-width: 1600px) {
		& {
			width: 440px;
			left: 65%;
			.es-login-form-box {
				padding: 40px 44px;
			}
			.es-login-form {
				&.es-login-verify {
					.es-login-title {
						margin-bottom: 52px;
					}
					.el-form-item {
						margin-bottom: 54px;
					}
				}
			}
			.es-login-qrcode {
				.es-login-title {
					margin-bottom: 16px;
				}
				.es-qrcode-box,
				.es-wx-qrcode-box {
					padding-top: 12px;
				}
			}
		}
	}
}
</style>

