import { projectBaseInfoGet, projectBaseInfoEdit, alowEdit } from '@/api/project/apply';
export default {
	data() {
		return {
			id: '',
			loading: true,
			canEditProjectAccout: false, //是否有编辑权限
			details: {}
		};
	},
	created() {
		this.id = this.$route.query.id;
		this.alowEdit();
		this.getDetail();
	},
	methods: {
		//是否有编辑权限
		async alowEdit() {
			let { rCode, results } = await this.$.ajax({
				url: alowEdit,
				methods: 'get',
				params: { projectId: this.id }
			});
			if (rCode === 0 && results) {
				this.canEditProjectAccout = true;
			}
		},
		transData(obj, type = 1) {
			const keyMaps = [
				// { key1: 'projectFullName', key2: 'fullName' },
				{ key1: 'salesProjectName', key2: 'saleProjectName' },
				{ key1: 'startTime', key2: 'planBeginDate' },
				{ key1: 'endTime', key2: 'planEndDate' },
				{ key1: 'initialTestTime', key2: 'firstTestDate' },
				{ key1: 'finalTestTime', key2: 'finalTestDate' },
				{ key1: 'estimateProflt', key2: 'profit' },
				{ key1: 'projectName', key2: 'shortName' },
				{ key1: 'projectType', key2: 'newProjectType' },
				{ key1: 'salesProjectCode', key2: 'saleProjectCode' },
				{ key1: 'industryClassification', key2: 'industry' },
				{ key1: 'actualContractMoney', key2: 'contractTotal' }
			];
			if (type === 1) {
				keyMaps.forEach(item => {
					obj[item.key1] = obj[item.key2] || obj[item.key1];
				});
			} else {
				keyMaps.forEach(item => {
					obj[item.key2] = obj[item.key1] || obj[item.key2];
				});
			}
			return obj;
		},
		async getDetail() {
			try {
				let { rCode, results, msg } = await this.$.ajax({
					url: projectBaseInfoGet,
					methods: 'get',
					params: { libId: this.id, isView: true }
				});
				if (rCode === 0) {
					const detailData = this.transData(results, 1);

					for (let key in detailData) {
						if (typeof detailData[key] === 'number') {
							detailData[key] = String(detailData[key]);
						}
					}
					detailData.orgIds = [
						{
							showname: detailData.orgName,
							showid: detailData.orgId
						}
					];
					detailData.departments = [
						{
							showname: detailData.departmentName || detailData.deptName,
							showid: detailData.department
						}
					];
					detailData.directorOfIndustrys = [
						{
							showname: detailData.directorOfIndustryName,
							showid: detailData.directorOfIndustry
						}
					];
					detailData.leaders = [
						{
							showname: detailData.leaderName,
							showid: detailData.leader
						}
					];
					detailData.projectManagers = [
						{
							showname: detailData.projectManagerName,
							showid: detailData.projectManager
						}
					];
					detailData.salesManagers = [
						{
							showname: detailData.salesManagerName,
							showid: detailData.salesManager
						}
					];
					detailData.techManagers = [
						{
							showname: detailData.techManagerName,
							showid: detailData.techManager
						}
					];
					// console.log(detailData.saleId, 'this.details');
					console.log('this.details>>>>>>', detailData.saleId);
					this.details = detailData;

					//thh
					if (this.details.codeWarehouseInfos.length == 0) {
						this.details.codeWarehouseInfos = [
							{
								type: 'git',
								address: '',
								remark: ''
							},
							{
								type: 'svn',
								address: '',
								remark: ''
							}
						];
					}
					this.$nextTick(() => {
						if (this.$refs.baseInfo) {
							this.$refs.baseInfo.getInitData();
						}
					});
					this.loading = false;
					this.$forceUpdate();
				} else {
					this.$message.error(msg || '加载失败，请重试！');
				}
			} catch (error) {
				console.error('>>>error', error);
			}
		},
		subSuccess() {
			this.startEdit = false;
			this.btnLoading = false;
		},

		contractChange() {},
		handleSubmit() {
			if (this.activeKey === '1') {
				this.$refs.baseInfo.checkData();
			}
			if (this.activeKey === '5') {
				this.$refs.contractList.checkData();
			}
			console.log('提交数据');
		},
		goBack() {
			this.$router.go(-1);
		},
		handleClickTabs(item) {
			console.log('item', item);
			this.activeKey = item.id;
			this.activeName = item.name;
			this.startEdit = false;
		},
		async submitData(postData) {
			console.log('>>>submitData>>>', postData);
			this.btnLoading = true;
			postData = Object.assign(this.details, postData, postData.projectInfo);
			delete postData.projectInfo;
			postData = this.transData(postData, 2);
			let { rCode, results, msg } = await this.$.ajax({
				url: projectBaseInfoEdit,
				methods: 'post',
				data: { ...postData },
				format: false
			});
			this.btnLoading = false;
			if (rCode === 0) {
				this.$message.success('操作成功');
				this.getDetail();
				this.startEdit = false;
			} else {
				this.$message.error(msg || '操作失败，请稍后再试！');
			}
		},
		setMainproject(data) {
			console.log('选择主项目', data);
			this.$refs.baseInfo.setBaseMainprojectName(data.fullName);
		}
	}
};
