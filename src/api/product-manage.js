/*
 * @desc: 产品管理 - 改造
 */
import $ from 'eoss-ui/lib/utils/util';

// 数据字典
export function findSysCode(params) {
	return $.ajax({
		url: '/sys/v1/mecpSys/findSysCode.dhtml',
		method: 'get',
		params
	});
