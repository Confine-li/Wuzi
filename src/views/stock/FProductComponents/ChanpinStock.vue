<template>
	<div
		calss="purchaseResults"
		:data="items"
		style="
    height: 100%;"
	>
		<el-descriptions class="margin-top" :title="'设备>' + items.purchaseName + '设备详情(编号:' + items.purchaseId + ')'" :column="2" border style="width: 80%;">
			<template slot="extra">
				<el-button @click="drawer = true" type="primary" style="margin-left: 16px; display: block;position: inherit;">修改</el-button>
				<el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" size="50%">
					<h2>修改{{ items.purchaseName }}设备内容</h2>
					<el-form :model="items" label-width="100px" @submit.native.prevent="save">
						<el-form-item label="申请人">
							<el-col :span="8" style="margin-right:30px;"><el-input v-model="items.applicant"></el-input></el-col>
						</el-form-item>
						<el-form-item label="物资名称"><el-input type="textarea" v-model="items.purchaseName"></el-input></el-form-item>
						<el-form-item label="物资型号"><el-input type="textarea" v-model="items.purchaseSize"></el-input></el-form-item>
						<el-form-item label="实际价格"><el-input type="textarea" v-model="items.purchasePrice"></el-input></el-form-item>
						<el-form-item label="物资数量"><el-input type="textarea" v-model="items.purchaseNum"></el-input></el-form-item>
						<el-form-item label="物资编号"><el-input type="textarea" v-model="items.purchaseId"></el-input></el-form-item>
						<el-form-item label="物资位置"><el-input type="textarea" v-model="items.purchaseSite"></el-input></el-form-item>
						<el-form-item label="备注"><el-input type="textarea" v-model="items.purchaseTestFeedback"></el-input></el-form-item>
						<el-form-item label="设备图片">
							<div class="grid-content bg-purple" style="width: 200px; border: #bbb dashed 1px;height: 200px;line-height: 200px;">
								<el-upload
									class="avatar-uploader"
									:action="$http.defaults.baseURL + '/upload'"
									:show-file-list="false"
									:on-success="res => $set(items, 'purchaseIcon', res.url)"
								>
									<img v-if="items.purchaseIcon" :src="items.purchaseIcon" class="avatar" />
									<i v-else class="el-icon-plus avatar-uploader-icon" style="color: #999; "></i>
								</el-upload>
							</div>
						</el-form-item>
						<el-form-item label="物料配件">
							<div>
								<!-- <p>{{wuliao}}</p> v-if="items.wuliao!=''"-->
								<el-table :data="items.wuliao" :default-sort="{ prop: 'purchaseId', order: 'descending' }">
									<!-- prop是绑定的数据字段，label是显示的名称-->
									<el-table-column type="index" width="50"></el-table-column>
									<el-table-column prop="purchaseId" label="编号"></el-table-column>
									<el-table-column prop="purchaseName" label="名称"></el-table-column>
									<el-table-column label="删除">
										<template slot-scope="scope">
											<el-button size="mini" type="danger" @click.stop="remove(scope.row)">删除</el-button>
										</template>
									</el-table-column>
								</el-table>
								<el-button @click="innerDrawer = true" size="small" round style="float: right;margin-top: 5px;">添加物料</el-button>
								<el-drawer :append-to-body="true" :before-close="handleClose" :visible.sync="innerDrawer" size="45%">
									<h1 v-if="this.title != ''">{{ this.title }}库存表</h1>
									<h1 v-else>全部物料库存表</h1>
									<el-table
										:data="model"
										@filter-change="filterChange"
										:default-sort="{ prop: 'purchaseId', order: 'descending' }"
										@row-click="dianji"
										id="chanpinxiaotable"
									>
										<!-- prop是绑定的数据字段，label是显示的名称-->
										<el-table-column type="index" width="50"></el-table-column>
										<el-table-column prop="purchaseId" label="编号"></el-table-column>
										<el-table-column prop="purchaseName" label="名称"></el-table-column>
										<el-table-column prop="purchaseNum" label="数量"></el-table-column>
										<el-table-column
											prop="wuLiaoName"
											column-key="wuLiaoName"
											:filters="filters"
											:filter-multiple="false"
											:filter-method="filterHandler"
											filter-placement="bottom"
											label="物料分类"
											style="display: block !important; color: red;"
											class="122212"
										></el-table-column>
										<el-table-column label="操作">
											<template slot-scope="scope">
												<!-- <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button> -->
												<el-button type="success" icon="el-icon-plus" size="mini" circle @click.stop="addwuliao(scope.row)"></el-button>
											</template>
										</el-table-column>
									</el-table>
								</el-drawer>
							</div>
						</el-form-item>
						<el-form-item><el-button type="danger" native-type="submit" style="margin: 20px;">修改</el-button></el-form-item>
					</el-form>
				</el-drawer>
			</template>
			<el-descriptions-item style="width: 50%;">
				<template slot="label">
					<i class="el-icon-user"></i>
					编号
				</template>
				{{ items.purchaseId }}
			</el-descriptions-item>
			<el-descriptions-item>
				<template slot="label">
					<i class="el-icon-mobile-phone"></i>
					名称
				</template>
				{{ items.purchaseName }}
			</el-descriptions-item>
			<el-descriptions-item>
				<template slot="label">
					<i class="el-icon-tickets"></i>
					供应商
				</template>
				{{ items.purchaseSupplier }}
			</el-descriptions-item>
			<el-descriptions-item>
				<template slot="label">
					<i class="el-icon-office-building"></i>
					采购批次
				</template>
				{{ items.purchaseBatch }}
			</el-descriptions-item>
			<el-descriptions-item>
				<template slot="label">
					<i class="el-icon-tickets"></i>
					数量
				</template>
				{{ items.purchaseNum }}
			</el-descriptions-item>
			<el-descriptions-item>
				<template slot="label">
					<i class="el-icon-office-building"></i>
					位号
				</template>
				{{ items.purchaseSite }}
			</el-descriptions-item>
			<el-descriptions-item>
				<template slot="label">
					<i class="el-icon-office-building"></i>
					备注
				</template>
				{{ items.purchaseTestFeedback }}
			</el-descriptions-item>
			<el-descriptions-item>
				<template slot="label">
					<i class="el-icon-mobile-phone"></i>
					设备图片
				</template>
				<img v-if="items.purchaseIcon" :src="items.purchaseIcon" style="width: 150px;" />
			</el-descriptions-item>
		</el-descriptions>

		<el-container calss="main_container" style="width: 80%; margin: 0 auto;">
			<el-main calss="elMain" style="color: #444;padding-bottom: 0; width: 80%;margin: 0 auto;">
				<el-tabs type="border-card">
					<el-tab-pane label="借还">
						<el-row :gutter="1">
							<el-col :span="24">
								<div class="grid-content bg-purple">
									<el-row :gutter="2">
										<el-table :data="list" :key="index">
											<!-- prop是绑定的数据字段，label是显示的名称-->
											<el-table-column label="序号" width="50" type="index"></el-table-column>
											<el-table-column prop="exTime" label="借出时间" width="140"></el-table-column>
											<el-table-column prop="returnStock" label="借出/归还" width="120" style="color: red"></el-table-column>
											<el-table-column prop="applicant" label="性名" width="100"></el-table-column>
											<el-table-column prop="date" label="起止日期" width="160"></el-table-column>
											<el-table-column prop="num" label="数量" width="80"></el-table-column>
											<el-table-column prop="reason" label="用途" width="50"></el-table-column>
											<el-table-column prop="returnTime" label="归还时间" width="150"></el-table-column>
											<el-table-column fixed="right" label="操作" width="60">
												<template slot-scope="scope">
													<el-button @click="$router.push(`/exWarehouse/results/${scope.row._id}`)" type="text" size="small">查看</el-button>
												</template>
											</el-table-column>
										</el-table>
									</el-row>
								</div>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="出库">
						<el-row :gutter="1">
							<el-col :span="24">
								<div class="grid-content bg-purple">
									<el-row :gutter="2">
										<el-table :data="list2" :key="index">
											<el-table-column label="序号" width="50" type="index"></el-table-column>
											<el-table-column prop="purchaseName" label="名称" width="120"></el-table-column>
											<el-table-column prop="way" label="状态" width="120"></el-table-column>
											<el-table-column prop="applicant" label="性名" width="100"></el-table-column>
											<el-table-column prop="exTime" label="日期" width="80"></el-table-column>
											<el-table-column prop="num" label="数量" width="120"></el-table-column>
											<el-table-column prop="reason" label="备注" width="50"></el-table-column>
											<el-table-column fixed="right" label="操作" width="60">
												<template slot-scope="scope">
													<el-button @click="$router.push(`/outOfStock/results/${scope.row._id}`)" type="text" size="small">查看</el-button>
												</template>
											</el-table-column>
										</el-table>
									</el-row>
								</div>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="销售">
						<el-row :gutter="1">
							<el-col :span="24">
								<div class="grid-content bg-purple">
									<el-row :gutter="2">
										<el-table :data="list3" :key="index">
											<el-table-column label="序号" width="50" type="index"></el-table-column>
											<el-table-column prop="purchaseName" label="名称" width="120"></el-table-column>
											<el-table-column prop="way" label="状态" width="120"></el-table-column>
											<el-table-column prop="applicant" label="性名" width="100"></el-table-column>
											<el-table-column prop="saleTime" label="日期" width="80"></el-table-column>
											<el-table-column prop="num" label="数量" width="120"></el-table-column>
											<el-table-column prop="reason" label="备注" width="50"></el-table-column>
											<el-table-column fixed="right" label="操作" width="60">
												<template slot-scope="scope">
													<el-button @click="$router.push(`/exSale/results/${scope.row._id}`)" type="text" size="small">查看</el-button>
												</template>
											</el-table-column>
										</el-table>
									</el-row>
								</div>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="配件">
						<el-row :gutter="1">
							<el-col :span="24">
								<div class="grid-content bg-purple">
									<el-row :gutter="2">
										<el-table :data="items.wuliao" :key="index">
											<el-table-column label="序号" width="50" type="index"></el-table-column>
											<el-table-column prop="purchaseName" label="名称" width="120"></el-table-column>
											<el-table-column prop="purchaseId" label="编号" width="120"></el-table-column>
											<el-table-column prop="purchaseSize" label="型号" width="100"></el-table-column>
											<el-table-column fixed="right" label="操作" width="60">
												<template slot-scope="scope">
													<el-button @click="$router.push(`/equipmentStock/${scope.row._id}`)" type="text" size="small">查看</el-button>
												</template>
											</el-table-column>
										</el-table>
									</el-row>
								</div>
							</el-col>
						</el-row>
					</el-tab-pane>
				</el-tabs>
			</el-main>
		</el-container>
	</div>
</template>

<script>
import wuliao from '../IProductComponents/Equipment.vue';
export default {
	components: {
		wuliao
	},
	props: {
		parent: {},
		id: {},
		item: {},
		index: 1,
		purchaseCategories: {}
	},
	data() {
		return {
			part: [],
			filters: [],
			title: '',
			restaurants: [],
			state: '',
			timeout: null,
			options: [
				{
					value: '名称',
					label: '按物资名称查找'
				},
				{
					value: '编号',
					label: '按物资编号查找'
				}
			],
			value: '',
			size: '',
			items: [],
			model: [],
			list: [],
			list2: [],
			list3: [],
			drawer: false,
			innerDrawer: false,
			wuliao: []
		};
	},
	methods: {
		querySearchAsync(queryString, cb) {
			var restaurants = this.restaurants;
			var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				cb(results);
			}, 300 * Math.random());
		},
		createStateFilter(queryString) {
			return state => {
				return state.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1;
			};
		},
		async handleSelect(item) {
			const res = await this.$http.get(`rest/Equipment/select/${item.value}`);
			const id = res.data[0]._id;
			this.$router.push(`/equipmentStock/${id}`);
		},
		dianji(row, column, event) {
			this.$router.push(`/equipmentStock/${row._id}`);
		},
		async fetch() {
			const res = await this.$http.get('rest/equipment');
			const res2 = await this.$http.get('rest/part');
			this.model = res.data;
			this.part = res2.data;
			for (var i = 0; i < this.part.length; i++) {
				this.filters.push({ text: this.part[i].wuLiaoName, value: this.part[i].wuLiaoName });
			}
			for (var i = 0; i < this.model.length; i++) {
				this.restaurants.push({ value: this.model[i].purchaseId });
			}
		},
		async addwuliao(row) {
			this.items.wuliao.push(row);
			const res2 = await this.$http.put(`rest/chanpin/${this.id}`, this.items);
			const duiyingchanpin = '名称:' + this.items.purchaseName + ';编号:' + this.items.purchaseId;
			const res = await this.$http.get(`rest/Equipment/${row._id}`);
			res.data.duiyingchanpin = duiyingchanpin;
			const res3 = await this.$http.put(`rest/Equipment/${row._id}`, res.data);
			this.$message({
				type: 'success',
				message: '添加成功!'
			});
		},
		async remove(row) {
			this.$confirm(`是否删除设备"${row.purchaseName}"？`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					for (var i = 0; i < this.items.wuliao.length; i++) {
						if (this.items.wuliao[i]._id == row._id) {
							this.items.wuliao.splice(i, 1);
						}
					}
					const res2 = await this.$http.put(`rest/chanpin/${this.id}`, this.items);
					const res = await this.$http.get(`rest/Equipment/${row._id}`);
					res.data.duiyingchanpin = '';
					const res3 = await this.$http.put(`rest/Equipment/${row._id}`, res.data);
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
		},
		filterChange(filterObj) {
			filterObj = filterObj.wuLiaoName;
			filterObj = JSON.stringify(filterObj[0]);
			if ((filterObj, filterObj == undefined)) {
				this.title = '全部物资';
			} else {
				this.title = filterObj.replace(/\"/g, '');
			}
		},

		filterHandler(value, row, column) {
			const property = column['property'];
			return row[property] === value;
			this.title = value;
		},
		async save() {
			const res2 = await this.$http.put(`rest/chanpin/${this.id}`, this.items);
			this.$message({
				message: '保存成功',
				type: 'success'
			});
		},
		handleClose(done) {
			done();
			this.fetch1();
		},

		tableRowClassName({ row, rowIndex }) {
			if (rowIndex === 0) {
				return 'aa';
			}
			return '';
		},
		async stockList() {
			const res2 = await this.$http.get(`rest/ExChanpin/parent/${this.id}`);
			this.list = res2.data;
		},
		async OutOfList() {
			const res2 = await this.$http.get(`rest/Everchanpins/parent/${this.id}`);
			this.list2 = res2.data;
		},
		async SaleList() {
			const res2 = await this.$http.get(`rest/Exsalechanpin/parent/${this.id}`);
			this.list3 = res2.data;
		},
		async fetch1() {
			const res = await this.$http.get(`rest/chanpin/${this.id}`);
			this.items = res.data;
		}
	},
	created() {
		this.fetch1();
		this.fetch();
	},

	mounted() {
		this.stockList();
		this.SaleList();
		this.OutOfList();
	}
};
</script>

<style scoped="scoped">
.purchaseResults {
	color: #006600;
}
.el-row {
	margin-bottom: 20px;
	&:last-child {
		margin-bottom: 0;
	}
}
.el-col {
	border-radius: 4px;
}
.grid-content {
	border-radius: 4px;
	min-height: 36px;
	background-color: white;
	/* border:   #000000 1px solid; */
}
.row-bg {
	/* padding: 10px 0; */
	background-color: #f9fafc;
}
div {
	margin: 0 auto;
}
.purchaseResults {
	height: 100%;
	font-weight: bold;
	font-size: 14px;
	/* color: #909399; */
	position: absolute;
	width: 100%;
}
.main_container {
	height: 100%;
	width: 100%;
	min-height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.el-container {
	height: 100%;
}
.elMain {
	height: 100%;
	overflow: hidden;
}
.aa {
	background-color: #000088;
}
.avatar {
	width: 200px;
	vertical-align: middle;
}
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	background-color: white;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	width: 200px;
	font-size: 28px;
	color: #8c939d;
	line-height: 200px;
	text-align: center;
}
.grid-content {
	margin: 0;
}
.has-gutter /deep/ #fenleibyn button {
	display: none !important;
	font-size: 40px;
	background-color: #000000;
}
/* .el-button--primary{
		display: none !important;
	} */
</style>
<style>
/*#chanpinxiaotable > .el-table-filter__list{
		display: block ;
		    position: absolute;
		    top: -45px ;
		    right: 67px ;
		    border: 1px solid #C6E2FF;
			background-color: white;
	}
	#chanpinxiaotable > .el-table-filter__list-item{
		width: 60px;
	} */
#tab-3 {
	float: right;
	left: 20%;
}
.el-drawer__body {
	padding: 20px;
}
.el-table .el-table--fit .el-table--enable-row-hover .el-table--enable-row-transition {
	left: -70px;
}
</style>
