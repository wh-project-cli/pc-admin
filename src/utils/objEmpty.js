/**
 * 删除对象中的空值
 * @params {object} 需要删除空值的对象
 *  @returns  {object}
 */
const ObjEmpty = val => {
	if (typeof val !== 'object') return {};
	Object.keys(val).map(item => {
		if (val[item] === '' || val[item] === null || val[item] === undefined) {
			delete val[item];
		}
		return true;
	});
	return val;
};
export default ObjEmpty;
