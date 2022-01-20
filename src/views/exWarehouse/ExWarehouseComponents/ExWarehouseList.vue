<template>
 <div class="adList"
		>
 	<h1>物资借出列表</h1>
	<el-button type="primary" plain style="position: absolute;top: 90px;right: 100px;" 
				 @click="$router.push(`/exWarehouse/create`)">申请借出</el-button>
				 
				 <template>
				   <el-tabs v-model="activeName" @tab-click="handleClick">
				     <el-tab-pane label="产品" name="first">
						 <el-table :data="items"
						 		  :default-sort = "{prop: 'exTime', order: 'descending'}"
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
						 	<el-table-column
						 	                 prop="returnStock"
						 					 label="借还状态">
						 					 <template slot-scope="scope">
						 					           <div slot="reference" class="name-wrapper">
						 					             <el-tag size="medium"   :type="scope.row.returnStock<='已借出'? 'danger':'success'"
						 								 >{{ scope.row.returnStock }}</el-tag>
						 					           </div>
						 					       </template>
						 	</el-table-column>
						 	<el-table-column label="操作">
						 		<template slot-scope="scope">
						 			<!-- <el-button size="mini" @click="$router.push(`/purchase/edit/${scope.row._id}`)">编辑</el-button> -->
						 			<!-- <el-button size="mini" @click="$router.push(`/exWarehouse/results/${scope.row._id}`)">查看</el-button> -->
						 			<el-button size="mini" type="danger" @click.stop="remove(scope.row)">删除</el-button>
						 		</template>
						 	</el-table-column>
						 </el-table>
					 </el-tab-pane>
				     <el-tab-pane label="物料" name="second">
						 <el-table :data="items"
						 		  :default-sort = "{prop: 'exTime', order: 'descending'}"
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
						 	<el-table-column
						 	                 prop="returnStock"
						 					 label="借还状态">
						 					 <template slot-scope="scope">
						 					           <div slot="reference" class="name-wrapper">
						 					             <el-tag size="medium"   :type="scope.row.returnStock<='已借出'? 'danger':'success'"
						 								 >{{ scope.row.returnStock }}</el-tag>
						 					           </div>
						 					       </template>
						 	</el-table-column>
						 	<el-table-column label="操作">
						 		<template slot-scope="scope">
						 			<!-- <el-button size="mini" @click="$router.push(`/purchase/edit/${scope.row._id}`)">编辑</el-button> -->
						 			<!-- <el-button size="mini" @click="$router.push(`/exWarehouse/results/${scope.row._id}`)">查看</el-button> -->
						 			<el-button size="mini" type="danger" @click.stop="remove(scope.row)">删除</el-button>
						 		</template>
						 	</el-table-column>
						 </el-table>
					 </el-tab-pane>
				     <el-tab-pane label="设备" name="third">
						 <el-table :data="items"
						 		  :default-sort = "{prop: 'exTime', order: 'descending'}"
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
						 	<el-table-column
						 	                 prop="returnStock"
						 					 label="借还状态">
						 					 <template slot-scope="scope">
						 					           <div slot="reference" class="name-wrapper">
						 					             <el-tag size="medium"   :type="scope.row.returnStock<='已借出'? 'danger':'success'"
						 								 >{{ scope.row.returnStock }}</el-tag>
						 					           </div>
						 					       </template>
						 	</el-table-column>
						 	<el-table-column label="操作">
						 		<template slot-scope="scope">
						 			<!-- <el-button size="mini" @click="$router.push(`/purchase/edit/${scope.row._id}`)">编辑</el-button> -->
						 			<!-- <el-button size="mini" @click="$router.push(`/exWarehouse/results/${scope.row._id}`)">查看</el-button> -->
						 			<el-button size="mini" type="danger" @click.stop="remove(scope.row)">删除</el-button>
						 		</template>
						 	</el-table-column>
						 </el-table>
					 </el-tab-pane>
				     <el-tab-pane label="其他" name="fourth">
						 <el-table :data="items"
						 		  :default-sort = "{prop: 'exTime', order: 'descending'}"
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
						 	<el-table-column
						 	                 prop="returnStock"
						 					 label="借还状态">
						 					 <template slot-scope="scope">
						 					           <div slot="reference" class="name-wrapper">
						 					             <el-tag size="medium"   :type="scope.row.returnStock<='已借出'? 'danger':'success'"
						 								 >{{ scope.row.returnStock }}</el-tag>
						 					           </div>
						 					       </template>
						 	</el-table-column>
						 	<el-table-column label="操作">
						 		<template slot-scope="scope">
						 			<!-- <el-button size="mini" @click="$router.push(`/purchase/edit/${scope.row._id}`)">编辑</el-button> -->
						 			<!-- <el-button size="mini" @click="$router.push(`/exWarehouse/results/${scope.row._id}`)">查看</el-button> -->
						 			<el-button size="mini" type="danger" @click.stop="remove(scope.row)">删除</el-button>
						 		</template>
						 	</el-table-column>
						 </el-table>
					 </el-tab-pane>
				   </el-tabs>
				 </template>
				 
 	
 </div>
</template>

<script>
	 export default {
	 props: {
		id: {}
		},
	  data() {
		  return{
			  index:0,
			   items:[],
			    activeName: 'first'
		  }
	  },
	  methods:{
		  async handleClick(tab, event) {
		           console.log(tab.index,event);
		  				  if(tab.index==1){
		  					  const res = await this.$http.get("rest/ExEquipments")
		  					  this.items = res.data
		  				  }else if(tab.index==2){
		  					  const res = await this.$http.get("rest/ExShebei")
		  					  this.items = res.data
		  				  }else if(tab.index==3){
		  					  const res = await this.$http.get("rest/ExQitas")
		  					  this.items = res.data
		  				  }else if(tab.index==0){
		  					  const res = await this.$http.get("rest/ExChanpins")
		  					  this.items = res.data
		  				  }
						  this.index=tab.index
						  console.log(this.index)
		         },
		  dianji(row, column, event){
		  			  this.$router.push(`/exWarehouse/results/${row._id}`)
		  },
		async fetch(){
				const res = await this.$http.get("rest/ExChanpins")
				this.items = res.data
				console.log('items',this.items)
				// console.log('timeFinal',this.items.data2)
		},
		async remove(row) {
			if(window.localStorage.shenfen == '管理员'){
				this.$confirm(`是否删除"${row.applicant}"的申请？`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					if(this.index==1){
						console.log('删除')
							   const res = await this.$http.delete(`rest/ExEquipment/${row._id}`)
							    await this.$http.get("rest/ExEquipment")
					}else if(this.index==2){
							  const res = await this.$http.delete(`rest/ExShebei/${row._id}`)
								await this.$http.get("rest/ExShebei")
					}else if(this.index==3){
							  const res = await this.$http.delete(`rest/Exqitas/${row._id}`)
							   await this.$http.get("rest/Exqitas")
					}else if(this.index==0){
							  const res = await this.$http.delete(`rest/ExChanpins/${row._id}`)
							   await this.$http.get("rest/ExChanpins")
					}
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					//更新数据
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
	.el-main {
	    overflow-y: scroll ;
	}
</style>
