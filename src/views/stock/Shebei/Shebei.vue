<template>
 <div class="adList">
	 <h1 v-if="this.title!=''">{{this.title}}库存表</h1>
		<h1  v-else>全部设备库存表</h1>
		<el-autocomplete
		  v-model="state"
		  :fetch-suggestions="querySearchAsync"
		  placeholder="请输入物资编号查询"
		  @select="handleSelect"
		>
		  <i class="el-icon-search"  slot="suffix" style="line-height: 40px; margin-right: 10px; color:#cacdd4;">
		  </i></el-autocomplete>
 	<el-table :data="items"
				@filter-change="filterChange"
			  :default-sort = "{prop: 'purchaseId', order: 'descending'}"
			  @row-click="dianji">
 		<el-table-column
 		      type="index"
 		      width="50">
 		    </el-table-column>
		<el-table-column
 		         prop="purchaseId"
 		         				 label="编号">
 		         </el-table-column>
 		<el-table-column
 		         prop="purchaseName"
 		         label="名称">
 		</el-table-column>
		<el-table-column
		                 prop="purchaseIcon" 
						 label="设备图片">
						 <template slot-scope="scope">
						         <img :src="scope.row.purchaseIcon" style="height: 3rem;"/>
						 </template>
		</el-table-column>
		<el-table-column
		                 prop="purchaseSite" 
						 label="位置">
		</el-table-column>
		<el-table-column
		                 prop="purchaseNum" 
						 label="数量">
		</el-table-column> 
 		<el-table-column
 		                 prop="purchaseState"
 						 label="状态">
 						 <template slot-scope="scope">
 						           <div slot="reference" class="name-wrapper">
 						             <el-tag size="medium"   :type="scope.row.purchaseState<='在库'? 'success':'danger'"
 									 >{{ scope.row.purchaseState }}</el-tag>
 						           </div>
 						       </template>
 		</el-table-column>
		<el-table-column
		         prop="shebeiName"
				 column-key="shebeiName"
						:filters="filters"
						:filter-multiple='false'
				       :filter-method="filterHandler"
				       filter-placement="bottom">
					   <template slot="header" slot-scope="scope">
						  <span>物料分类</span>
					            <el-button type="primary" id="fenleibyn" >分类筛选</el-button>
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
		  return{
			   options: [{
			            value: '名称',
			            label: '按物资名称查找'
			          }, {
			            value: '编号',
			            label: '按物资编号查找'
			          }],
			          value: '',
			   activeName: 'first',
			   items:[],
			   part:[],
			   filters:[],
				title:'',
				restaurants: [],
				state: '',
				timeout:  null
		  }
	  },

	  methods:{
		  querySearchAsync(queryString, cb) {
		          var restaurants = this.restaurants;
		          var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
		  
		          clearTimeout(this.timeout);
		          this.timeout = setTimeout(() => {
		            cb(results);
		          }, 300 * Math.random());
		        },
		       createStateFilter(queryString) {
		          return (state) => {
					   // return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
					   return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
		          };
		        },
		       async handleSelect(item) {
					const res = await this.$http.get(`rest/shebei/select/${item.value}`)
					const id = res.data[0]._id
				    this.$router.push(`/shebei/${id}`)
		        },
		  dianji(row, column, event){
			  console.log('row, column, event',row.id)
			  this.$router.push(`/shebei/${row._id}`)
		  },
		  async fetch(){
				const res = await this.$http.get("rest/shebei")
				const res2 = await this.$http.get("rest/partshebei")
				// console.log('timeFinal',this.items.data2)
				this.items = res.data
				this.part = res2.data
				for(var i = 0; i<this.part.length;i++){
					this.filters.push({ text: this.part[i].shebeiName, value: this.part[i].shebeiName });
				}
				for(var i = 0; i<this.items.length;i++){
						 this.restaurants.push({ value: this.items[i].purchaseId });
				}
				
		},
		async remove(row) {
			if(window.localStorage.shenfen == '管理员'){
				this.$confirm(`是否删除"${row.purchaseName}"？`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					const res = await this.$http.delete(`rest/shebei/${row._id}`)
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
			filterChange (filterObj) { 
				 filterObj = filterObj.shebeiName
				 filterObj = JSON.stringify(filterObj[0])
				 if(filterObj,filterObj==undefined){
					 this.title = '全部物资'
				 }else{
					 this.title= filterObj.replace(/\"/g,"");
				 }
				// 
				 // console.log("filterObj",filterObj,filterObj==undefined)
				// for(){
					//String this.title= str.replace("\"", "");
				// }
			  // console.log("filterObj",this.title,'["传感器"]',this.title=='["传感器"]')
			},
		
			filterHandler(value, row, column) {
				// console.log('value',value, ' row ',row,'column', column)
				const property = column['property'];
				return row[property] === value;
				this.title = value
				console.log('1',row[property][0].shebeiName)
			}
	  },
	  created(){
		  this.fetch();
	  }
	 }
</script>

<style >
	.main_container{
		overflow-y: scroll !important;
	}
	.el-main{
		overflow-y: scroll !important;
	}
	.el-icon-arrow-down{
		display: none;
	}
	.el-autocomplete {
	    position: fixed;
	    top: 94px;
	    right: 100px;
	}
	#fenleibyn{
		    display: flex ;
		    position: fixed;
		    top: 94px;
		    right: 350px;
	}
	.el-table-filter__list{
		display: flex;
		    position: absolute;
		    top: -45px ;
		    right: 67px ;
		    border: 1px solid #C6E2FF;
			background-color: white;
	}
	.el-table-filter__list-item{
		width: 50px;
	}
</style>
