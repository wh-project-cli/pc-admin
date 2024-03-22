// 批量数据字典
export const findSysCodeList = '/sys/v1/mecpSys/findSysCodeList.dhtml'; //'get',
// 单个数据字典
export const findSysCode = '/sys/v1/mecpSys/findSysCode.dhtml'; //'get',
// // 下载模板
// export const downloadByAdjunctId(params) {
// 	const api2 = api + '/main2/mecpfileManagement/downloadByAdjunctId';
// 	let url = `${api2}?${qs.stringify(params)}`;
// 	window.open(url);
// }

// 获取当前用户登录信息
export const getUserInfo = '/project/tSmsStore/getUserInfo'; //'get'

// 销售库权限管理
export const permissionInfo = '/project/tSmsStore/permissionInfo'; //'get'

// 项目台账权限管理
export const proPermissionInfo = '/project/tPmProjectLibrary/permissionInfo'; //'get'
//行业分类tree
export const getIndustryTree = '/project/tSmsIndustry/treeJson'; 

