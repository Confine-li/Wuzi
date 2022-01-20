<template>
	<div class="adList">
		<h1>物料待入库表</h1>
		<!-- <el-button type="primary" plain @click="$router.push(`/test/create`)" style="">添加物资入库</el-button> -->
		<el-table :data="items" :default-sort="{ prop: 'purchaseDate3', order: 'descending' }" style="width: 100%" @row-click="dianji">
			<!--  :default-sort = "{prop: 'date2', order: 'descending'}" -->
			<!-- prop是绑定的数据字段，label是显示的名称-->
			<el-table-column type="index" width="50"></el-table-column>
			<el-table-column prop="purchaseDate3" label="时间"></el-table-column>
			<el-table-column prop="purchaseName" label="物资名称"></el-table-column>
			<el-table-column
				prop="purchaseCategories"
				label="物资类别"
				:filters="[{ text: '产品', value: '产品' }, { text: '物资', value: '物资' }, { text: '设备', value: '设备' }, { text: '耗材', value: '耗材' }]"
				:filter-method="filterHandler"
				filter-placement="bottom-end"
			></el-table-column>
			<el-table-column
				prop="test"
				label="状态"
				:filters="[{ text: '待检验', value: '待检验' }, { text: '检验合格', value: '检验合格' }, { text: '检验不合格', value: '检验不合格' }]"
				:filter-method="filterTag"
				filter-placement="bottom-end"
			>
				<template slot-scope="scope">
					<div slot="reference" class="name-wrapper">
						<el-tag size="medium" :type="scope.row.test >= '检验合格' ? 'success' : 'danger'" :effect="scope.row.test >= '检验不合格' ? 'light' : 'plain'">
							{{ scope.row.test }}
						</el-tag>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="danger" @click.stop="remove(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	props: {
		id: {}
	},
	data() {
		return {
			items: []
		};
	},
	methods: {
		dianji(row, column, event){
					  console.log('row, column, event',row.id)
					  this.$router.push(`/testResults/results/${row._id}`)
		},
		filterTag(value, row) {
			return row.test === value;
		},
		filterHandler(value, row, column) {
			const property = column['property'];
			return row[property] === value;
		},
		async fetch() {
			const res = await this.$http.get('rest/testList');
			// res.data.test="审核"
			this.items = res.data;
			console.log('items', this.items);
		},
		//删除
		async remove(row) {
			if(window.localStorage.shenfen == '管理员'){
					this.$confirm(`是否删除"${row.purchaseName}"？`, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
						.then(async () => {
							const res = await this.$http.delete(`rest/testList/${row._id}`);
							console.log('res', res);
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							//更新数据
							this.fetch();
						})
						.catch(() => {
							this.$message({
								type: 'info',
								message: '已取消删除'
							});
						});
			}else{
				const h = this.$createElement;
				        this.$notify({
				          title: '提示',
				          message: h('i', { style: 'color: teal'}, '请以管理员身份登录！')
				        });
			}
		 }
	},
	created() {
		this.fetch();
		// this.getdate();
	}
};
</script>

<style></style>
