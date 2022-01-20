<template>
 <div class="adList">
 	<h1>物料申请列表</h1>
 	<el-table :data="items"
				:default-sort = "{prop: 'date1', order: 'descending'}"
			  style="width: 100%;" @row-click="dianji"
			 >
 		<!-- prop是绑定的数据字段，label是显示的名称
		  :default-sort = "{prop: 'date1', order: 'descending'}"
		    @sort-change='sortChange'-->
 		<el-table-column
 		                 prop="date1"
 						 label="时间"
						 sortable>
 		</el-table-column>
 		<el-table-column
 		                 prop="applicant"
 						 label="申请人">
 		</el-table-column>
		<el-table-column
		                 prop="agree"
						 label="状态">
						 <template slot-scope="scope">
						         <el-popover trigger="hover" placement="top"  prop="agree">
						           <!-- <p>物资: {{ scope.row.items[1].purchaseName }}</p> -->
						           <p>总共({{ scope.row.items.length}})项</p>
								   <el-table :data="scope.row.items">
									   <el-table-column width="100" property="purchaseCategories" label="分类"></el-table-column>
								       <el-table-column width="100" property="purchaseName" label="物资名称"></el-table-column>
								       <el-table-column width="100" property="purchaseSize" label="型号"></el-table-column>
								       <el-table-column width="100" property="purchaseNum" label="数量"></el-table-column>
								     </el-table>
						           <div slot="reference" class="name-wrapper">
						             <el-tag size="medium"   :type="scope.row.agree>='待通过'? 'danger':'success'"
															 :effect="scope.row.agree>='未通过'? 'light':'plain'"
									 >{{ scope.row.agree }}</el-tag>
						           </div>
						         </el-popover>
						       </template>
		</el-table-column>
 		<el-table-column label="操作">
 			<template slot-scope="scope">
 				<!-- <el-button size="mini" @click="$router.push(`/purchase/edit/${scope.row._id}`)">编辑</el-button> -->
				<!-- <el-button size="mini" @click="$router.push(`/purchase/results/${scope.row._id}`)">查看</el-button> -->
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
		  return{
			   items:[
				    
			   ],
		  }
	  },
	  methods:{
		  dianji(row, column, event){
		  			  this.$router.push(`/purchase/results/${row._id}`)
		  },
		async fetch(){
				const res = await this.$http.get("rest/purchase")
				this.items = res.data
		},
		async remove(row) {
			if(window.localStorage.shenfen == '管理员'){
				this.$confirm(`是否删除"${row.applicant}"的申请？`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					const res = await this.$http.delete(`rest/purchase/${row._id}`)
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
			sortChange(column){
			    console.log(column)
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
</style>
