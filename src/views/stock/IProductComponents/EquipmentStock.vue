<template>
	<div calss="purchaseResults" :data="items" style="
    height: 100%;"> 
	
	  <el-descriptions class="margin-top" :title="'设备>'+items.purchaseName+'设备详情(编号:'+items.purchaseId+')'" :column="2" border
						style="width: 80%;">
	    <template slot="extra">
			<el-button @click="drawer = true" type="primary" style="margin-left: 16px; display: block;position: inherit;">
			  修改
			</el-button>
			<el-drawer
			  title="我是标题"
			  :visible.sync="drawer"
			  :with-header="false">
			  <h2>修改{{items.purchaseName}}设备内容</h2>
			  <el-form  :model="items" label-width="100px"  @submit.native.prevent="save" >
			    <el-form-item label="申请人">
			      <el-col :span="8" style="margin-right:30px;">
			      	<el-input v-model="items.applicant"></el-input>		  
			      </el-col>
			    </el-form-item>
			    <el-form-item label="物资名称">
			      <el-input type="textarea" v-model="items.purchaseName"></el-input>
			    </el-form-item>
			    <el-form-item label="物资型号">
			      <el-input type="textarea" v-model="items.purchaseSize"></el-input>
			    </el-form-item>
			    <el-form-item label="实际价格">
			      <el-input type="textarea" v-model="items.purchasePrice"></el-input>
			    </el-form-item>
			    <el-form-item label="物资数量">
			      <el-input type="textarea" v-model="items.purchaseNum"></el-input>
			    </el-form-item>
			    <el-form-item label="物资编号">
			      <el-input type="textarea" v-model="items.purchaseId"></el-input>
			    </el-form-item>
			    <el-form-item label="物资位置">
			      <el-input type="textarea" v-model="items.purchaseSite"></el-input>
			    </el-form-item>
			    <el-form-item label="备注">
			      <el-input type="textarea" v-model="items.purchaseTestFeedback"></el-input>
			    </el-form-item>
				<el-form-item label="对应产品">
				  <el-input type="textarea" v-model="items.duiyingchanpin"></el-input>
				</el-form-item>
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
			    <el-form-item>
			      <el-button type="danger" native-type="submit" style="margin: 20px;">修改</el-button>
			    </el-form-item>
			  </el-form>
			</el-drawer>

	    </template>
	    <el-descriptions-item style="width: 50%;">
	      <template slot="label">
	        <i class="el-icon-user"></i>
	        编号
	      </template>
	      {{items.purchaseId}}
	    </el-descriptions-item>
	    <el-descriptions-item>
	      <template slot="label">
	        <i class="el-icon-mobile-phone"></i>
	        名称
	      </template>
	      {{items.purchaseName}}
	    </el-descriptions-item>
	    <el-descriptions-item>
	      <template slot="label">
	        <i class="el-icon-tickets"></i>
	        供应商
	      </template>
	      {{items.purchaseSupplier}}
	    </el-descriptions-item>
	    <el-descriptions-item>
	      <template slot="label">
	        <i class="el-icon-office-building"></i>
	        采购批次
	      </template>
			{{items.purchaseBatch}}
	    </el-descriptions-item>
		<el-descriptions-item>
		  <template slot="label">
		    <i class="el-icon-tickets"></i>
		    数量
		  </template>
		  {{items.purchaseNum}}
		</el-descriptions-item>
		<el-descriptions-item>
		  <template slot="label">
		    <i class="el-icon-office-building"></i>
		    位号
		  </template>
			{{items.purchaseSite}}
		</el-descriptions-item>
		<el-descriptions-item>
		  <template slot="label">
			<i class="el-icon-office-building"></i>
			备注
		  </template>
			{{items.purchaseTestFeedback}}
		</el-descriptions-item>
		<el-descriptions-item>
		  <template slot="label">
		    <i class="el-icon-mobile-phone"></i>
		    设备图片
		  </template>
			<img v-if="items.purchaseIcon" :src="items.purchaseIcon" style="width: 150px;"> 
		</el-descriptions-item>
		<el-descriptions-item>
		  <template slot="label">
			<i class="el-icon-office-building"></i>
				对应产品
		  </template>
			{{items.duiyingchanpin}}
		</el-descriptions-item>
	  </el-descriptions>
	
		<el-container calss="main_container" style="width: 80%; margin: 0 auto;">
			<el-main calss="elMain" style="color: #444;padding-bottom: 0; width: 80%;margin: 0 auto;">
				<el-tabs type="border-card">
				  <el-tab-pane label="借还">
					  <el-row :gutter="1" >
					    <el-col :span="24"><div class="grid-content bg-purple">
					  	<el-row :gutter="2">
					  		<el-table :data="list" :key="index" >
					  			<!-- prop是绑定的数据字段，label是显示的名称-->
					  			<el-table-column    label="序号" width="50" type="index"></el-table-column>
					  			<el-table-column	prop="exTime"	label="借出时间" width="140"></el-table-column>
					  			<el-table-column	prop="returnStock"	label="借出/归还" width="120"  style="color: red"></el-table-column>
					  			<el-table-column	prop="applicant" label="性名" width="100"></el-table-column>
					  			<el-table-column    prop="date" label="起止日期" width="160" ></el-table-column>
					  			<el-table-column    prop="num" label="数量" width="80"> </el-table-column>
					  			<el-table-column    prop="reason" label="用途" width="50"></el-table-column>
					  			<el-table-column    prop="returnTime" label="归还时间" width="150"></el-table-column>
					  			<el-table-column
					  			      fixed="right"
					  			      label="操作"
					  			      width="60">
					  			      <template slot-scope="scope">
					  			        <el-button
					  			         @click="$router.push(`/exWarehouse/results/${scope.row._id}`)"
					  			          type="text"
					  			          size="small">
					  			          查看
					  			        </el-button>
					  			      </template>
					  			    </el-table-column>
					  		</el-table>
					  	</el-row></div>
					    </el-col>
					  </el-row>
				  </el-tab-pane>
				  <el-tab-pane label="出库">
					 <el-row :gutter="1" >
					   <el-col :span="24"><div class="grid-content bg-purple">
					 	<el-row :gutter="2">
					 		 <el-table :data="list2" :key="index">
					 			<el-table-column    label="序号" width="50" type="index"></el-table-column>
					 			<el-table-column	prop="purchaseName"	label="名称" width="120"></el-table-column>
					 			<el-table-column	prop="way"	label="状态" width="120"></el-table-column>
					 			<el-table-column	prop="applicant" label="性名" width="100"></el-table-column>
					 			<el-table-column    prop="exTime" label="日期" width="80"></el-table-column>
					 			<el-table-column    prop="num" label="数量" width="120"> </el-table-column>
					 			<el-table-column    prop="reason" label="备注" width="50"></el-table-column>
								<el-table-column
								      fixed="right"
								      label="操作"
								      width="60">
								      <template slot-scope="scope">
								        <el-button
								         @click="$router.push(`/outOfStock/results/${scope.row._id}`)"
								          type="text"
								          size="small">
								          查看
								        </el-button>
								      </template>
								    </el-table-column>
					 		</el-table>
					 	</el-row></div>
					   </el-col>
					 </el-row>
				  </el-tab-pane>
				  <el-tab-pane label="销售">
					  <el-row :gutter="1" >
					    <el-col :span="24"><div class="grid-content bg-purple">
					  	<el-row :gutter="2">
					  		 <el-table :data="list3" :key="index">
					  			<el-table-column    label="序号" width="50" type="index"></el-table-column>
					  			<el-table-column	prop="purchaseName"	label="名称" width="120"></el-table-column>
					  			<el-table-column	prop="way"	label="状态" width="120"></el-table-column>
					  			<el-table-column	prop="applicant" label="性名" width="100"></el-table-column>
					  			<el-table-column    prop="saleTime" label="日期" width="80"></el-table-column>
					  			<el-table-column    prop="num" label="数量" width="120"> </el-table-column>
					  			<el-table-column    prop="reason" label="备注" width="50"></el-table-column>
								<el-table-column
								      fixed="right"
								      label="操作"
								      width="60">
								      <template slot-scope="scope">
								        <el-button
								         @click="$router.push(`/exSale/results/${scope.row._id}`)"
								          type="text"
								          size="small">
								          查看
								        </el-button>
								      </template>
								    </el-table-column>
					  		</el-table>
					  	</el-row></div>
					    </el-col>
					  </el-row>
				  </el-tab-pane>
				</el-tabs>
				
			</el-main>
		</el-container>
	</div>
</template>

<script>
export default {
	props: {
		parent: {},
		id: {},
		item: {},
		index:1,
		purchaseCategories:{}
	},
	data() {
		return {
			size: '',
			items: [],
			list:[],
			list2:[],
			list3:[],
			 drawer: false,
		};
	},
	methods: {
		async save() {
				 const res2 = await this.$http.put(`rest/Equipment/${this.id}`,this.items)

				  this.$message({
				  	message: '保存成功',
				  	type: 'success'
				  });
		},
		handleClose(done) {
				done();
				this.fetch()
		    },
		
		tableRowClassName({row, rowIndex}) {
      if (rowIndex === 0) {
        return 'aa';
      }
      return '';
    },
		async stockList(){
				const res2 = await this.$http.get(`rest/ExEquipment/parent/${this.id}`)
				this.list = res2.data;
				console.log('接触从',this.list)
			},
			async OutOfList(){
				const res2 = await this.$http.get(`rest/Everwuliao/parent/${this.id}`)
				this.list2 = res2.data;
			},
			async SaleList(){
				const res2 = await this.$http.get(`rest/Exsalewuliao/parent/${this.id}`)
				this.list3 = res2.data;
			},
			async fetch() {
				const res = await this.$http.get(`rest/Equipment/${this.id}`);
				 this.items = res.data;
				// const res2 = await this.$http.get(`rest/Equipment/select/${this.id}`);
				//   this.items = res2.data[0];
				//   this.id = res2.data[0]._id
				//   console.log('id',res2.data[0]._id)
				// console.log('res',res)
				// console.log('res2',res2)
				}
		},
		created() {
			this.fetch();
			
		},
		
		mounted(){
			this.stockList();
			this.SaleList();
			this.OutOfList();
		},
};
</script>

<style scoped="scoped">
	.purchaseResults{
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
  div{
	 margin: 0 auto;
  }
  .purchaseResults{
	  height: 100%;
	 font-weight: bold;
	 font-size: 14px;
	 /* color: #909399; */
	 position: absolute;
	 width: 100%;
	
  }
  .main_container{
	  height: 100%;
	  width: 100%;
	    min-height: 100%;
	    display: flex;
	    flex-direction: column;
	    justify-content:space-between;
  }
  .el-container{
	  height: 100%;
  }
  .elMain {
    height: 100%;
    overflow: hidden;
	}
	.aa{
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
</style>
