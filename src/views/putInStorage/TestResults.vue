<template>
	<div calss="purchaseResults" :data="items" style="
	width: 900px; margin: 0 auto;border: #999 1px solid;"> 
		<el-container  >
			 <h1 style="margin: 30px auto; color: #666;">物料检验详情</h1>
			 <el-descriptions  title="" :column="2" :size="size" border>
			    <el-descriptions-item >
					<template slot="label">
						<p style="">物资名称</p>
					</template>
					<p style="color: #555;font-weight: 600; margin: 0;">{{items.purchaseName}}</p>
			    </el-descriptions-item>
			    <el-descriptions-item>
					<template slot="label" >
						<p >负责人</p>
					</template>
			      <p style="color: #555;font-weight: 600;"> {{items.leader}} </p>
			    </el-descriptions-item>
				<el-descriptions-item >
					<template slot="label">
						<p style="width: 100px;">物资型号</p>
					</template>
					<p style="color: #555;font-weight: 600; margin: 0;">{{items.purchaseSize}}</p>
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label" >
						<p >预算价格</p>
					</template>
				  <p style="color: #555;font-weight: 600;"> {{items.purchaseBudgetary}}  </p>
				</el-descriptions-item>
			    <el-descriptions-item >
			    	<template slot="label">
			    		<p style="width: 100px;">实际价格</p>
			    	</template>
			    	<el-input v-model="items.purchasePrice" placeholder="请输入内容" style="font-weight: 550; " :disabled="inputable"></el-input>
			    </el-descriptions-item>
			    <el-descriptions-item>
			    	<template slot="label" >
			    		<p >物资数量</p>
			    	</template>
			      <p style="color: #555;font-weight: 600;"> {{items.purchaseNum}}  </p>
			    </el-descriptions-item>
				<el-descriptions-item >
					<template slot="label">
						<p style="width: 100px;">物资编号</p>
					</template>
					<el-input v-model="items.purchaseId" placeholder="请输入内容" :disabled="inputable"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label" >
						<p >物资位置</p>
					</template>
				  <el-input v-model="items.purchaseSite" placeholder="请输入内容" :disabled="inputable"></el-input>
				</el-descriptions-item>
				<el-descriptions-item :span="2">
					<template slot="label">
					  备注
					</template>
					<div class="grid-content bg-purple"
							style="width: 600px;">
										<p></p>
										<el-input
										  type="textarea"
										  :rows="2"
										  placeholder="可输入物资检验情况或其他物资信息"
										  v-model="items.purchaseTestFeedback"
										  :disabled="inputable">
										</el-input>
					</div>
				</el-descriptions-item>
				<el-descriptions-item :span="2">
					<template slot="label">
					  设备图片
					</template>
					<div class="grid-content bg-purple"
								style="width: 200px; border: #bbb dashed 1px;height: 200px;line-height: 200px;">
											<el-upload
											  class="avatar-uploader"
											  :action="$http.defaults.baseURL+'/upload'"
											  :show-file-list="false"
											  :disabled="inputable"
											   :on-success="res=>$set(items,'purchaseIcon',res.url)">
											 <img v-if="items.purchaseIcon" :src="items.purchaseIcon" class="avatar">
											 <i v-else class="el-icon-plus avatar-uploader-icon" style="color: #999; " ></i>
											</el-upload>
					</div>
				</el-descriptions-item> 
			  </el-descriptions>
			
				
			   <el-footer>
				   
				   <el-row :gutter="5" >
				     <el-col :span="3"><div class="grid-content bg-purple" style="margin-top: 20px;font-weight: 600;">负责人意见</div></el-col>
				     <el-col :span="14"><div class="grid-content bg-purple" style="display: flex;margin-top: 10px;">
						<el-button :plain="true" @click="open2" style="display: inline;" :disabled="agreebtn">同意入库</el-button>
						<el-button :plain="true" @click="open4" style="display: inline;" :disabled="agreebtn">拒绝入库</el-button>
					 </div></el-col>
				   </el-row>
			   </el-footer>
		</el-container>
	</div>
</template>



<script>
export default {
	props: {
		id: {}
	},
	data() {
		return {
			size: '',
			imageUrl: '',
			items: [],
			index:1,   
			agreebtn:true,
			inputable:true,
		};
	},
	methods: {
		 
		async open2() {
			if(this.items.purchaseId!= undefined &&this.items.purchaseSite != undefined){
				      this.$message({
				            message: '您已成功同意该申请！',
				            type: 'success'
				      });
								
			if (this.items.purchaseCategories == '产品') {
					this.items.test = '检验合格';
					this.items.purchaseState = '在库';
					const res2 = await this.$http.post('rest/chanpins', this.items);
					console.log('产品2D');
				} else if (this.items.purchaseCategories == '其他') {
					this.items.test = '检验合格';
					this.items.purchaseState = '在库';
					const res2 = await this.$http.post('rest/qita', this.items);
					console.log('其他');
				}else if (this.items.purchaseCategories == '物料') {
					this.items.test = '检验合格';
					this.items.purchaseState = '在库';
					const res2 = await this.$http.post('rest/equipment', this.items);
					console.log('this.items',this.items);
				}else if(this.items.purchaseCategories=="设备"){
					this.items.test = '检验合格';
					this.items.purchaseState="在库"
					const res2 = await this.$http.post('rest/shebeis',this.items)
				}
				let res = await this.$http.put(`rest/TestList/${this.id}`, this.items)
				this.$router.push('/testList')
			}else{
				const h = this.$createElement;
						this.$notify({
						  title: '提示',
						  message: h('i', { style: 'color: teal'}, '物资编号或物资位置未填！')
						});
			}
		      },
	    async open4() {
	          this.$message.error('您已拒绝同意该申请。');
			  this.items.test = '检验不合格';
			  let res = await this.$http.put(`rest/TestList/${this.id}`, this.items)
			   this.$router.push('/textList')
	          },
		async fetch() {
			const res = await this.$http.get(`rest/TestList/${this.id}`);
			this.items = res.data;
			if(window.localStorage.shenfen == '管理员' && this.items.test == '待检验'){
				this.agreebtn = false
				this.inputable = false
 			}
		},
		
	},
	created() {
		this.fetch();
	}
};
</script>

<style>
	i{
		color: #555555 !important;
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
  }
  .purchaseResults{
	  height: 100%;
	 font-weight: bold;
	 font-size: 14px;
	 color: #909399;
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
	.el-footer{
		/* display: flex; */
		/* position: fixed; */
		 height: 4vh;
		 width: 850px;
		 align-items: center;
		background-color:#FAFAFA;
		margin: 0 auto;
	}
	.grid-content[data-v-bdfdddbe] {
	    background: #eee;
	}
	/* 图片 */
	.avatar{
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
	    border-color: #409EFF;
		height:200px ;
	  }
	  .avatar-uploader-icon {
		  width: 200px;
	    font-size: 28px;
	    color: #8c939d;
	    line-height: 200px;
	    text-align: center;
	  }
	  
	  .el-upload el-upload--text{
	  }
	  .el-descriptions .is-bordered {
	      table-layout: fixed;
	  }
  .el-main {
		height: 100%;
		overflow: scroll !important;
	}
</style>