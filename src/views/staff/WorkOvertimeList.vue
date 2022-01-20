<template>
	<div class="adList" >
		<h1>加班记录表</h1>
		<el-button @click="$router.push(`/workOvertime/create`)" style="position: absolute;top:100px; right: 100px;">添加记录</el-button>
		<el-table :data="items" :default-sort="{ prop: 'date1', order: 'descending' }" style="width: 100%;" @row-click="dianji">
			<!-- prop是绑定的数据字段，label是显示的名称-->
			<el-table-column prop="date" width="120" label="时间"></el-table-column>
			<el-table-column prop="staff" width="80" label="加班人"></el-table-column>
			<el-table-column prop="reason" label="加班原因"></el-table-column>
			<el-table-column prop="starTime" label="从何时开始"></el-table-column>
			<el-table-column prop="overTime" label="到何时结束"></el-table-column>
			<el-table-column prop="time" label="加班所用时间"></el-table-column>
			<el-table-column prop="state" label="状态">
				<template slot-scope="scope">
					<div slot="reference" class="name-wrapper">
						<el-tag size="medium" :type="scope.row.state <= '加班' ? 'danger' : 'success'">{{ scope.row.state }}</el-tag>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="leader" label="核准人"></el-table-column>
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
		dianji(row, column, event) {
			console.log('row, column, event', row.id);
			this.$router.push(`/workOvertime/results/${row._id}`);
		},
		async fetch() {
			const res = await this.$http.get('rest/WorkOvertime');
			this.items = res.data;
			console.log('items', this.items);
			// console.log('timeFinal',this.items.data2)
		},
		async remove(row) {
			if(window.localStorage.shenfen == '管理员'){
				this.$confirm(`是否删除"${row.staff}"的申请？`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(async () => {
						const res = await this.$http.delete(`rest/WorkOvertime/${row._id}`);
						console.log('res', res);
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
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
	}
};
</script>

<style>
.el-button--danger {
	background-color: #f04936;
}
.el-main {
    overflow-y: scroll !important;
}
</style>
