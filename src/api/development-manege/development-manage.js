/*
 * @desc: 研发管理 - 改造
 */
import $ from 'eoss-ui/lib/utils/util';

// 数据字典
export function findSysCode(params) {
	return $.ajax({
		url: '/sys/v1/mecpSys/findSysCode.dhtml',
		method: 'get',
		params
	});
}
// 列表接口
export const listJson = '/gwapi/produce/productBase/approvalListJson';
export const listJsonLedger = '/gwapi/produce/productBase/listJson';
// 获取人工单价
export function getPeopleUnitPrice(params) {
	return $.ajax({
		url: '/gwapi/produce/productBase/getPeopleUnitPrice',
		method: 'get',
		params
	});
}
// 项目立项保存
export function save(data) {
	return $.ajax({
		url: '/gwapi/produce/productBase/save',
		method: 'post',
		data,
		format: false
	});
}
