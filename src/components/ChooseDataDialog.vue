<template>
	<es-dialog :visible.sync="showDialog" :title="modalTitle" class="choose-data-dialog">
		<es-data-table
			v-if="showDialog"
			ref="dataTable"
			v-bind="$attrs"
			highlight-current-row
			current-row-key="cid"
			page
			@btnClick="btnClick"
			@current-change="btnClick"
		></es-data-table>
		<div class="dialog-footer">
			<es-button type="primary" @click="chooseData">确 定</es-button>
			<es-button @click="showDialog = false">取 消</es-button>
		</div>
		<div class="is-slot">
			<slot></slot>
		</div>
	</es-dialog>
</template>

<script>
// 单选选择数据弹窗-table入参见文档
export default {
	props: {
		modalTitle: {
			type: String,
			default: '选择'
		}
	},
	data() {
		return {
			showDialog: false,
			selectItem: {}
		};
	},
	methods: {
		btnClick(e) {
			// console.log('选择数据handle', {handle, row});
			if (e.handle) {
				this.selectItem = e.row;
			} else {
				this.selectItem = e;
			}
		},
		chooseData() {
			this.$emit('setData', this.selectItem);
			this.showDialog = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.dialog-footer {
	text-align: center;
}
::v-deep .el-dialog__header {
	padding: 10px !important;
}

::v-deep .el-scrollbar {
	height: 480px;
	overflow: hidden;
	position: relative;
}
	.is-slot{
		position: absolute;
		left: 10px ;
		top: 64px;
	}
</style>
