<template>
 <div class="adList">
 	<h1>物资出库列表</h1>
	<el-button type="primary" plain style="position: absolute;top: 90px;right: 100px;"
				 @click="$router.push(`/outOfStock/create`)">申请出库</el-button>
	  <el-tabs v-model="activeName" @tab-click="handleClick">
	    <el-tab-pane label="产品" name="first">
			<el-table :data="items"
					 :default-sort = "{prop: 'exTime' , order: 'descending'}"
					  style="width: 100%;"
					  @row-click="dianji">
				<!-- prop是绑定的数据字段，label是显示的名称-->
				<el-table-column
				                 prop="exTime"
								 label="时间">
				</el-table-column>
				<el-table-column
				                 prop="applicant"
								 label="申请人">
				</el-table-column>
				<el-table-column
				                 prop="purchaseName"
								 label="物资名称">
				</el-table-column>
				<el-table-column
				                 prop="purchaseId"
								 label="物资编号">
				</el-table-column>
				<el-table-column
				                 prop="agree"
								 label="状态">
								 <template slot-scope="scope">
								           <div slot="reference" class="name-wrapper">
								             <el-tag size="medium"   :type="scope.row.agree>='待通过'? 'danger':'success'"
																	 :effect="scope.row.agree>='未通过'? 'light':'plain'"
											 >{{ scope.row.agree }}</el-tag>
								           </div>
								       </template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<!-- <el-button size="mini" @click="$router.push(`/purchase/edit/${scope.row._id}`)">编辑</el-button> -->
						<el-button size="mini" type="danger" @click.stop="remove(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-tab-pane>
	    <el-tab-pane label="物料" name="second">
			<el-table :data="items"
					 :default-sort = "{prop: 'exTime' , order: 'descending'}"
					  style="width: 100%;"
					  @row-click="dianji">
				<!-- prop是绑定的数据字段，label是显示的名称-->
				<el-table-column
				                 prop="exTime"
								 label="时间">
				</el-table-column>
				<el-table-column
				                 prop="applicant"
								 label="申请人">
				</el-table-column>
				<el-table-column
				                 prop="purchaseName"
								 label="物资名称">
				</el-table-column>
				<el-table-column
				                 prop="purchaseId"
								 label="物资编号">
				</el-table-column>
				<el-table-column
				                 prop="agree"
								 label="状态">
								 <template slot-scope="scope">
								           <div slot="reference" class="name-wrapper">
								             <el-tag size="medium"   :type="scope.row.agree>='待通过'? 'danger':'success'"
																	 :effect="scope.row.agree>='未通过'? 'light':'plain'"
											 >{{ scope.row.agree }}</el-tag>
								           </div>
								       </template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<!-- <el-button size="mini" @click="$router.push(`/purchase/edit/${scope.row._id}`)">编辑</el-button> -->
						<el-button size="mini" type="danger" @click.stop="remove(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-tab-pane>
	    <el-tab-pane label="设备" name="third">
			<el-table :data="items"
					 :default-sort = "{prop: 'exTime' , order: 'descending'}"
					  style="width: 100%;"
					  @row-click="dianji">
				<!-- prop是绑定的数据字段，label是显示的名称-->
				<el-table-column
				                 prop="exTime"
								 label="时间">
				</el-table-column>
				<el-table-column
				                 prop="applicant"
								 label="申请人">
				</el-table-column>
				<el-table-column
				                 prop="purchaseName"
								 label="物资名称">
				</el-table-column>
				<el-table-column
				                 prop="purchaseId"
								 label="物资编号">
				</el-table-column>
				<el-table-column
				                 prop="agree"
								 label="状态">
								 <template slot-scope="scope">
								           <div slot="reference" class="name-wrapper">
								             <el-tag size="medium"   :type="scope.row.agree>='待通过'? 'danger':'success'"
																	 :effect="scope.row.agree>='未通过'? 'light':'plain'"
											 >{{ scope.row.agree }}</el-tag>
								           </div>
								       </template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<!-- <el-button size="mini" @click="$router.push(`/purchase/edit/${scope.row._id}`)">编辑</el-button> -->
						<el-button size="mini" type="danger" @click.stop="remove(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-tab-pane>
	    <el-tab-pane label="其他" name="fourth">
			<el-table :data="items"
					 :default-sort = "{prop: 'exTime' , order: 'descending'}"
					  style="width: 100%;"
					  @row-click="dianji">
				<!-- prop是绑定的数据字段，label是显示的名称-->
				<el-table-column
				                 prop="exTime"
								 label="时间">
				</el-table-column>
				<el-table-column
				                 prop="applicant"
								 label="申请人">
				</el-table-column>
				<el-table-column
				                 prop="purchaseName"
								 label="物资名称">
				</el-table-column>
				<el-table-column
				                 prop="purchaseId"
								 label="物资编号">
				</el-table-column>
				<el-table-column
				                 prop="agree"
								 label="状态">
								 <template slot-scope="scope">
								           <div slot="reference" class="name-wrapper">
								             <el-tag size="medium"   :type="scope.row.agree>='待通过'? 'danger':'success'"
																	 :effect="scope.row.agree>='未通过'? 'light':'plain'"
											 >{{ scope.row.agree }}</el-tag>
								           </div>
								       </template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<!-- <el-button size="mini" @click="$router.push(`/purchase/edit/${scope.row._id}`)">编辑</el-button> -->
						<el-button size="mini" type="danger" @click.stop="remove(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-tab-pane>
	  </el-tabs>
	
 	
 </div>
</template>

<script>
	 export default {
	 props: {
		id: {}
		},
	  data() {
		  return{
			   items:[],
			   activeName: 'first',
			   index:0,
		  }
	  },
	  methods:{
		  async handleClick(tab, event) {
		           console.log(tab.index,event);
		  				  if(tab.index==1){
		  					  const res = await this.$http.get("rest/Everwuliao")
		  					  this.items = res.data
		  				  }else if(tab.index==2){
		  					  const res = await this.$http.get("rest/Evershebei")
		  					  this.items = res.data
		  				  }else if(tab.index==3){
		  					  const res = await this.$http.get("rest/Everqitas")
		  					  this.items = res.data
		  				  }else if(tab.index==0){
		  					  const res = await this.$http.get("rest/Everchanpin")
		  					  this.items = res.data
		  				  }
		  						  this.index=tab.index
		  						  console.log(this.index)
		         },
		  dianji(row, column, event){
		  			  this.$router.push(`/outOfStock/results/${row._id}`)
		  },
		async fetch(){
				const res = await this.$http.get("rest/Everchanpins")
				this.items = res.data
				console.log('items',this.items)
		},
		async remove(row) {
			if(window.localStorage.shenfen == '管理员'){
				this.$confirm(`是否删除"${row.applicant}"的申请？`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					
					if(this.index==1){
							   const res = await this.$http.delete(`rest/Everwuliao/${row._id}`)
							    await this.$http.get("rest/Everwuliao")
					}else if(this.index==2){
							  const res = await this.$http.delete(`rest/Evershebei/${row._id}`)
								await this.$http.get("rest/Evershebei")
					}else if(this.index==3){
							  const res = await this.$http.delete(`rest/Everqitas/${row._id}`)
							   await this.$http.get("rest/Everqitas")
					}else if(this.index==0){
							  const res = await this.$http.delete(`rest/Everchanpin/${row._id}`)
							   await this.$http.get("rest/Everchanpin")
					}
					
					console.log('res',res)
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					//更新数据
					this.fetch()
				}).catch(() => {
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
			},
	  },
	  created(){
		  this.fetch();
	  }
	 }
</script>

<style>
	.el-button--danger{
		background-color: #F04936;
	}
	.el-table{
		overflow: inherit;
	}
</style>
