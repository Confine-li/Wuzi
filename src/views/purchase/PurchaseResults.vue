<template>
	<div calss="purchaseResults" :data="items" style="
    height: 100%; width: 800px; margin: 0 auto;border: #999 1px solid;"> 
		<el-container  >
			 <h1 style="margin: 30px auto; color: #666;">物料申请表</h1>
			 <el-descriptions  title="" :column="2" :size="size" border>
			    <el-descriptions-item >
					<template slot="label">
						<p style="width: 100px;">申请人</p>
					</template>
					<p style="color: #555;font-weight: 600;width: 40px; margin: 0;"> {{items.applicant}}</p>
			    </el-descriptions-item>
			    <el-descriptions-item>
					<template slot="label" >
						<p >负责人</p>
					</template>
			      <p style="color: #555;font-weight: 600;"> {{items.leader}}  </p>
			    </el-descriptions-item>
			    <el-descriptions-item :span="2">
			      <template slot="label">
			        申请理由
			      </template>
				  <p style="width:600px;"> {{items.reason}}</p>
			    </el-descriptions-item>
				<el-descriptions-item :span="2">
					<template slot="label">
					  审批状态
					</template>
					<p style="width:600px;"> {{items.agree}}</p>
				</el-descriptions-item>
			  </el-descriptions>
			
				
						<el-table :data="items.items" :key="index" >
							<!-- prop是绑定的数据字段，label是显示的名称-->
							<el-table-column    label="序号" width="50" type="index"></el-table-column>
							<el-table-column	prop="purchaseName"	label="物资名称" width="120"></el-table-column>
							<el-table-column	prop="purchaseSize" label="物资型号" width="100"></el-table-column>
							<el-table-column    prop="purchaseNum" label="物资数量" width="80"></el-table-column>
							<el-table-column    prop="purchaseBudgetary" label="预算价格" width="120"> </el-table-column>
							<el-table-column    prop="purchaseDate3" label="采购时间" width="110"> </el-table-column>
							<el-table-column    prop="purchaseRemark" label="备注" width="150"></el-table-column>
						</el-table>
					
			   <el-footer>
				   
				   <el-row :gutter="5" >
				     <el-col :span="10"><div class="grid-content bg-purple" style="margin-top: 33px;font-weight: 600;">负责人意见</div></el-col>
				     <el-col :span="14"><div class="grid-content bg-purple" style="display: flex;margin-top: 25px;">
						<el-button :plain="true" @click="open2" style="display: inline;" :disabled="tongyi">同意</el-button>
						<el-button :plain="true" @click="open4" style="display: inline;" :disabled="notongyi">不同意</el-button>
					 </div></el-col>
				   </el-row>
			   </el-footer>
		</el-container>
	</div>
</template>

<script>
export default {
	props: {
		id: {},
		index:1
	},
	data() {
		return {
			items: [],
			list:[
			],
			size: '',
			tongyi:true,
			notongyi:true,
		};
	},
	methods: {
		async open2() {
	// 		    var _this = this;
	// 		    let yy = new Date().getFullYear();
	// 		    let mm = new Date().getMonth() + 1;
	// 		    let dd = new Date().getDate();
	// 		    let hh = new Date().getHours();
	// 		    let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
	// 		    _this.gettime = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf;
	// 		    this.items.items.purchaseDate3 = _this.gettime;
	
				this.items.agree = await '已通过';
				// console.log('items',this.items)
				 let res = await this.$http.put(`rest/purchase/${this.id}`, this.items)
				 console.log('items',res.data)
				this.list = this.items.items
				// console.log('applicant',this.list.length)
				 const res2 = await this.$http.post('rest/testList',this.list)
				  this.$router.push('/purchase/list')
				 this.tongyi=true
			     this.notongyi=true
				 
				 this.$message({
				       message: '您已成功同意该申请',
				       type: 'success'
				 });
		      },
	    async open4() {
	          this.$message.error('您已拒绝同意该申请！');
			  this.items.agree = '未通过';
			  let res = await this.$http.put(`rest/purchase/${this.id}`, this.items)
			  this.$router.push('/purchase/list')
			  this.tongyi=true
			  this.notongyi=true
	          },
		async fetch() {
			const res = await this.$http.get(`rest/purchase/${this.id}`);
			this.items = res.data;
			if(window.localStorage.shenfen == '管理员' && this.items.agree== '待通过'){
				this.items.leader = window.localStorage.username
				this.tongyi=false
				this.notongyi=false
			}
		},
		
	},
	created() {
		this.fetch();
	}
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
	 /* margin: 0 auto; */
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
	}
	.el-main{
		overflow: hidden !important;
	}
	.el-footer{
		display: flex;
		 height: 4vh;
		 width: 100%;
		 align-items: center;
		background-color:#eee;
		margin: 0 auto;
	}
	
	.grid-content {
		 background: #e5e9f2;
	} 
	.grid-content[data-v-bdfdddbe] {
	    background: #eee;
	}
	.el-descriptions .is-bordered {
	    table-layout: fixed;
	}
	.el-table{
		overflow: scroll;
	}
</style>
