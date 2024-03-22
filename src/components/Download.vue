<!-- 
/**
	* 扫描二维码下载APP 
	*@desc:使用手机扫描二维码下载APP应用 
	*
**/ 
 -->
<template>
	<div class="code">
		<div class="f-sb-c code-box">
			<div class="code-item f-1 f-c-c-c">
				<span>Android</span>
				<div class="code-img">
					<qrcodes :content="android"></qrcodes>
					<div class="down">
						<!-- <div class="t-s">请使用QQ扫描二维码下载</div> -->
						<!-- <div class="t-s">或使用浏览器网页扫描下载</div> -->
					</div>
				</div>
			</div>
			<div class="code-item f-1 f-c-c-c">
				<span>IOS</span>
				<div class="code-img">
					<qrcodes :content="ios"></qrcodes>
					<div class="down">
						<!-- <div class="t-s">请打开相机扫描二维码下载</div> -->
						<!-- <div class="t-s">或使用浏览器网页扫描下载</div> -->
					</div>
				</div>
			</div>
		</div>
		<div class="notice">备注：苹果手机安装后请在设置--通用--设备管理中进行激活操作</div>
	</div>
</template>

<script>
import qrcodes from '@/components/Qrcodes.vue'
export default {
	name: 'scan',
	components: {
		qrcodes,
	},
	props: ['android', 'logo', 'ios'],
}
</script>

<style lang="scss" scoped>
// .code{
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: space-between;
// }
.code-box {
	display: flex;
	justify-content: space-between;
	padding: 80px 100px;
}
.code-img {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 228px;
	height: 228px;
}
.code-item {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.down {
	margin-top: -16px;
	z-index: 999;
}
.t-s {
	font-size: 14px;
}
.notice {
	margin-top: 55px;
	font-size: 14px;
}
</style>
