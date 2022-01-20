<template>
  <div >
    <!-- <h1>{{id?'编辑':'新建'}}广告</h1> -->
	<el-drawer
	  :visible.sync="drawer"
	  :direction="direction"
	  :before-close="handleClose">
		  <template>
			  <div style="margin-left: 20px;">
				  <h2  v-if="wuzi">物资分类</h2>
				    <h2  v-if="chanpin">产品分类</h2>
				  		<h2  v-if="shebei">设备分类</h2>
				  		  <h2  v-if="qita">其他分类</h2>
			  </div>
			<el-tabs v-model="activeName" @tab-click="handleClick"  style="margin: 20px;">
			  <el-tab-pane label="添加分类" name="first">
				  <el-form  v-model="parts"  label-width="80px" @submit.native.prevent="savePart" style="margin-right: 30px;">
				   	<el-form-item label="分类名称">
				   		<el-input v-if="wuzi" v-model="parts.wuLiaoName" clearable></el-input>
						<el-input v-if="chanpin" v-model="parts.chanpinName" clearable></el-input>
						<el-input v-if="shebei" v-model="parts.shebeiName" clearable></el-input>
						<el-input v-if="qita" v-model="parts.qitaName" clearable></el-input>
				   	</el-form-item>
				   	<el-form-item>
				   		<el-button type="primary" native-type="submit">保存</el-button>
				   	</el-form-item>
				   </el-form>
			  </el-tab-pane>
			  <el-tab-pane label="分类列表" name="second">
			  <el-table  :data="part" style="width: 100%">
				    <el-table-column
						v-if="wuzi"
				      label="分类名称"
				      prop="wuLiaoName">
				    </el-table-column>	
					<el-table-column
						v-if="chanpin"
					  label="分类名称"
					  prop="chanpinName">
					</el-table-column>	
					<el-table-column
						v-if="shebei"
					  label="分类名称"
					  prop="shebeiName">
					</el-table-column>	
					<el-table-column
						v-if="qita"
					  label="分类名称"
					  prop="qitaName">
					</el-table-column>	
				    <el-table-column
				      align="right" 
				  			  label="操作"
				  			  prop="methods">	
				      <template slot-scope="scope">
				        <el-button
				          size="mini"
				          type="danger"
				          @click="remove(scope.row) ">删除</el-button>									  
				  			  </template>
				    </el-table-column>
				  </el-table>
			  </el-tab-pane>
			</el-tabs>
		  </template>
	</el-drawer>
    <h1>物资采购申请单</h1>
    <el-form  :model="model" label-width="100px"  @submit.native.prevent="save" >
      <el-form-item label="申请人" required>
        <el-col :span="8" style="margin-right:30px;">
        	<el-input v-model="model.applicant" required disabled></el-input>		  
        </el-col>
      </el-form-item>
      </el-form-item>
      <el-form-item label="物资用途">
        <el-input type="textarea" v-model="model.reason"></el-input>
      </el-form-item>
	 
<el-form-item label="采购清单">
		<el-button  @click="model.items.push({})">
				<!-- <i class="el-icon-plus"></i> -->
				+  添加物资</el-button>
	    <el-row type="flex" style="flex-wrap: wrap;">
	      <el-col :span="18" class="adRow" v-for="(item,index) in model.items" :key="index">
	        <el-card shadow="never" class="adForm">
	          <div slot="header" class="clearfix">
	              <span>物资{{index+1}}</span>
	              <el-button style="float: right;" type="text"
				                    @click="model.items.splice(index,1)">删除</el-button>
	          </div>
			  <el-form label-width="80px" :inline="true" >
			    <el-form-item label="物资名称" required>
			  	  <el-input v-model="item.purchaseName" style="width: 300px;" required></el-input>
						</el-form-item>
				  <el-form-item label="物资型号">
					<el-input v-model="item.purchaseSize" style="width: 300px;"></el-input>
				  </el-form-item>
				 <el-form-item label="采购类别" required>
				   <el-radio-group v-model="item.purchaseCategories" required  >
				     <el-radio label="产品" @change="Orchanpin($event)" required></el-radio>
				   					 <el-radio label="物料" @change="Orwuliao($event)" ></el-radio>
				   					  <el-radio label="设备" @change="Orshebei($event)"></el-radio>
				   					 <el-radio label="其他" @change="Orqita($event)"></el-radio>
				   </el-radio-group>
				 </el-form-item> <br />
				  <el-form-item label="物资数量" required>
					<el-input v-model="item.purchaseNum" style="width: 300px;" required></el-input>
				  </el-form-item>
				  <el-form-item label="预算价格">
					<el-input v-model="item.purchaseBudgetary" style="width: 300px;"></el-input>
				  </el-form-item>
				  <el-form-item label="供应商">
				  					<el-input v-model="item.purchaseSupplier" style="width: 300px;"></el-input>
				  </el-form-item>
				  <el-form-item label="采购批次">
				  					<el-input v-model="item.purchaseBatch" style="width: 300px;"></el-input>
				  </el-form-item>
				  <!-- <el-form-item label="采购方式">
					<el-input v-model="item.purchaseWay"></el-input>
				  </el-form-item> -->
				  <el-form-item label="购进日期" required>
					  <div class="block">
						  <!-- <span class="demonstration">填表时间</span> -->
						  <el-date-picker v-model="item.purchaseDate3" align="lift" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 300px;"> </el-date-picker>
						</div>
				  	</el-form-item>
				  <el-form-item label="备注">
					<el-input v-model="item.purchaseRemark" style="width: 300px;"></el-input>
					 </el-form-item>
					 <el-form-item label="物料分类" required v-if="wuzi">
					 		<el-select v-model="item.wuLiaoName" filterable placeholder="请选择">
					 		    <el-option
					 		      v-for="item in part"
					 		      :key="item.wuLiaoName"
					 		      :label="item.wuLiaoName"
					 		      :value="item.wuLiaoName">
					 		    </el-option>
					 		  </el-select>
							  <el-button type="primary" plain icon="el-icon-plus" circle  @click="drawer = true" size="small" style="margin-left: 10px;"></el-button>
					  </el-form-item>
					  <el-form-item label="产品分类" required v-if="chanpin">
					  		<el-select v-model="item.chanpinName" filterable placeholder="请选择">
					  		    <el-option
					  		      v-for="item in part"
					  		      :key="item.chanpinName"
					  		      :label="item.chanpinName"
					  		      :value="item.chanpinName">
					  		    </el-option>
					  		  </el-select>
					  			<el-button type="primary" plain icon="el-icon-plus" circle  @click="drawer = true" size="small" style="margin-left: 10px;"></el-button>
					   </el-form-item>
					  <el-form-item label="设备分类" required v-if="shebei">
					  		<el-select v-model="item.shebeiName" filterable placeholder="请选择">
					  		    <el-option
					  		      v-for="item in part"
					  		      :key="item.shebeiName"
					  		      :label="item.shebeiName"
					  		      :value="item.shebeiName">
					  		    </el-option>
					  		  </el-select>
					  			<el-button type="primary" plain icon="el-icon-plus" circle  @click="drawer = true" size="small" style="margin-left: 10px;"></el-button>
					   </el-form-item>
					   <el-form-item label="其他分类" required v-if="qita">
					   		<el-select v-model="item.qitaName" filterable placeholder="请选择">
					   		    <el-option
					   		      v-for="item in part"
					   		      :key="item.qitaName"
					   		      :label="item.qitaName"
					   		      :value="item.qitaName">
					   		    </el-option>
					   		  </el-select>
					   			<el-button type="primary" plain icon="el-icon-plus" circle  @click="drawer = true" size="small" style="margin-left: 10px;"></el-button>
					    </el-form-item>
				 <el-form-item >
				  				<input v-model="item.test='待检验'" type="text" hidden ></input>
				  </el-form-item>
				  </el-form>

			        </el-card>
			      </el-col>
			    </el-row>

			</el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">立即申请</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
	name: 'Purchaseedit',
    data() {
      return {
		  radio: '产品',
		   activeName: 'first',
		  parts:{wuLiaoName:""},
		  part:[],
		   drawer: false,
		   direction: 'rtl',
		  wuzi:false,
		  chanpin:false,
		  qita:false,
		  shebei:false,
        model: {
		 applicant:'',
        items:[],
          },
		  pickerOptions: {
		           shortcuts: [{
		             text: '今天',
		             onClick(picker) {
		               picker.$emit('pick', new Date());
		             }
		           }, {
		             text: '昨天',
		             onClick(picker) {
		               const date = new Date();
		               date.setTime(date.getTime() - 3600 * 1000 * 24);
		               picker.$emit('pick', date);
		             }
		           }, {
		             text: '一周前',
		             onClick(picker) {
		               const date = new Date();
		               date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
		               picker.$emit('pick', date);
		             }
		           }]
		         },
      }
    },
    methods: {
		async savePart(){
			if(this.wuzi){
				let res = await this.$http.post('rest/part',this.parts)
			}else if(this.chanpin){
				let res = await this.$http.post('rest/partchanpin',this.parts)
			}else if(this.qita){
				let res = await this.$http.post('rest/partqitas',this.parts)
			}else if(this.shebei){
				let res = await this.$http.post('rest/partshebei',this.parts)
			}
				this.$message({
					message: '保存成功',
					type: 'success'
				});
		},
		async fetch(){
			if(this.wuzi){
				const res = await this.$http.get(`rest/parts`)
				this.part = res.data
			}else if(this.chanpin){
				const res = await this.$http.get(`rest/partchanpins`)
				this.part = res.data
			}else if(this.qita){
				const res = await this.$http.get(`rest/partqitas`)
				this.part = res.data
			}else if(this.shebei){
				const res = await this.$http.get(`rest/partshebeis`)
				this.part = res.data
			}
		},
		 async handleClick(tab, event) {
		     this.fetch()
		    },
		handleClose(done) {
		        this.$confirm('确认关闭？')
		          .then(_ => {
		            done();
		          })
		          .catch(_ => {});
		      },
		async Orwuliao(val){
			this.wuzi = await true;
			this.chanpin = await false;
			this.qita = await false;
			this.shebei = await false;
			this.fetch()
		},
		async Orchanpin(val){
			this.chanpin = await true;
			this.qita = await false;
			this.wuzi = await false;
			this.shebei = await false;
			this.fetch()
		},
		async Orqita(val){
			this.qita = await true;
			this.chanpin = await false;
			this.wuzi = await false;
			this.shebei = await false;
			this.fetch()
		},
		async Orshebei(val){
			this.shebei = await true;
			this.qita = await false;
			this.chanpin = await false;
			this.wuzi = await false;
			this.fetch()
		},
      async save() {
		  //console.log('item.purchaseName',this.model.items.length)
		  // console.log('item.purchaseName',this.model.items[1].purchaseName== undefined)
		  // 全部都填上--保存
		  // 一个 == undefined --弹出提示
		  if(this.model.items.length==0){
			  const h = this.$createElement;
			  
			          this.$notify({
			            title: '提示',
			            message: h('i', { style: 'color: teal'}, '未添加物资信息，请点击“添加物资”按钮。')
			          });
		  }
		   for(var i =0;i<this.model.items.length;i++){
			   console.log(i)
			   if(this.model.items[i].purchaseName != undefined && this.model.items[i].purchaseCategories!= undefined && this.model.items[i].purchaseNum != undefined && this.model.items[i].purchaseDate3 != undefined  ){
			    			if(this.model.items[i].wuLiaoName != undefined ||this.model.items[i].chanpinName != undefined ||this.model.items[i].shebeiName != undefined||this.model.items[i].qitaName != undefined){
							
								if(i==this.model.items.length-1){
									console.log('可以保存',this.model.items.length-1)
									// 点击时间
									var _this = this;
									　　let yy = new Date().getFullYear();
									　　let mm = new Date().getMonth()+1;
									　　let dd = new Date().getDate();
									　　let hh = new Date().getHours();
									　　let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
									　　let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
									　　_this.gettime = yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss;
									this.model.date1 = _this.gettime
									console.log(this.model.date1)
									
									this.model.agree="待通过"
									console.log('this.model',this.model)
									const res = await this.$http.post('rest/purchase',this.model)
									this.$router.push('/purchase/list')
									console.log('res',res)
									this.$message({
												  message:'保存成功',
												  type:'success'
									});
								}
						 }else {
							 console.log('单选单为填')
							 const h = this.$createElement;
							 
							         this.$notify({
							           title: '提示',
							           message: h('i', { style: 'color: teal'}, '物资表单填写不完整')
							         });
						 }
			   }else{
				    console.log('输入框')
					const h = this.$createElement;
					
					        this.$notify({
					          title: '提示',
					          message: h('i', { style: 'color: teal'}, '物资表单填写不完整')
					        });
			   }
		   }
		 
		 
	  },
	  async remove(row) {
				this.$confirm(`${row.WuLiaoName}`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(async() => {
					//删除接口  /categories/:id
					if(this.wuzi){
						const res = await this.$http.delete(`rest/part/${row._id}`)
					}else if(this.chanpin){
						const res = await this.$http.delete(`rest/partchanpin/${row._id}`)
					}else if(this.qita){
						const res = await this.$http.delete(`rest/partqitas/${row._id}`)
					}else if(this.shebei){
						const res = await this.$http.delete(`rest/partshebei/${row._id}`)
					}
					//弹框
				this.$message({
					type: 'success',
					message: '删除成功!'
				});
				this.fetch()
				}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
				});
			}
    },
	created(){
		this.model.applicant = window.localStorage.username
	}
  }
</script>

<style>
	input:focus{
		  border: solid 1px  #409EFF;
	}
	.el-button--danger{
		background-color:#F04936 ;
	}
	.el-col-18 {
	    width: 75%;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.el-textarea__inner{
		 width: 75%;
	}
	.el-card__header {
	    padding: 4px 20px;
	}
	.el-card{
		background-color: #f3f7fc;
	}
	.el-main {
	    overflow-y: scroll !important;
	}
	.el-drawer__header{
		margin: 0;
	}
	i{
		color: #555;
	}
</style>
