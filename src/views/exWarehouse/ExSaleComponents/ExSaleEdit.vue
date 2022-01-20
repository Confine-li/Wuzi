<template>
  <div>
    <!-- <h1>{{id?'编辑':'新建'}}广告</h1> -->
    <h1>销售申请单</h1>
    <el-form  :model="model" label-width="80px"  @submit.native.prevent="save">
      <el-form-item label="申请人" required>
			<el-col :span="8" style="margin-right:30px;">
				<el-input v-model="model.applicant" required disabled></el-input>		  
			</el-col>
			<el-form-item label="销售时间" required>
					<el-col :span="8">
						  <div class="block">
								<!-- <span class="demonstration">填表时间</span> -->
								<el-date-picker
									v-model="model.date"
									align="lift"
									type="date"
									placeholder="选择日期"
									:picker-options="pickerOptions"
									value-format="yyyy-MM-dd">
								</el-date-picker>
								</div>
					</el-col>
			</el-form-item>
      </el-form-item>
      </el-form-item>
	  
	  
	  <el-form-item label="物资分类" required>
	  			<el-col :span="8" style="margin-right:30px;">
	  				<el-select  v-model="model.category" placeholder="请选择分类"  @change="category" >
	  				    <el-option
	  				      v-for="item in options"
	  				      :key="item.value"
	  				      :label="item.label"
	  				      :value="item.value"
	  					  >
	  				    </el-option>
	  				  </el-select>	  
	  			</el-col>
	  			<el-form-item label="物资ID" required>
	  					<el-col :span="8">
	  						<el-select v-model="model.purchaseId" filterable placeholder="请选择或搜索" v-if="chanpin"  class="leibie" @change="chanpinchange">
	  							<el-option v-for="item in part" :key="item.purchaseId" :label="item.purchaseId" :value="item.purchaseId"></el-option>
	  						</el-select>
	  					</el-col>
	  			</el-form-item>
	  </el-form-item>
	  </el-form-item>
	  
	    </el-form-item>
	  		
	  		<el-form-item label="物资名称" required>
	  			<el-col :span="8" style="margin-right:30px;">
	  				<el-input
	  				  v-model="model.purchaseName"
	  				  :disabled="false">
	  				  {{model.purchaseName}}
	  				</el-input>
	  			</el-col>
	  			<el-form-item label="数量" required>
	  						<el-col :span="8" style="margin-right:30px;">
	  							<el-input-number v-model="model.num" @change="" :min="1" :max="numMax" label="描述文字"></el-input-number>
	  							 <span style="color: #666;">&nbsp;&nbsp;最多可选择数量为:{{numMax}}</span>		  
	  						</el-col>
	  			</el-form-item>
	  		</el-form-item>
	  		
	    </el-form-item>
	  		</el-form-item>
	  
			<el-form-item label="购货方" required>
				<el-col :span="8" style="margin-right:30px;">
					<el-input required v-model="model.buyer" required></el-input>		  
				</el-col>
				<el-form-item label="价格" required>
					<el-col :span="8" style="margin-right:30px;">
						<el-input required v-model="model.jiage" required></el-input>		  
					</el-col>
				</el-form-item>
			</el-form-item>
			<el-form-item label="产品分类"  hidden>
				<el-col :span="8" style="margin-right:30px;">
					<{{model.chanpinName}}  
				</el-col>
			</el-form-item>
		</el-form-item>
		
	    </el-form-item>
		</el-form-item>
	  
      <el-form-item label="备注">
        <el-input type="textarea" v-model="model.text"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="danger" native-type="submit">立即申请</el-button>
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
		  part: [],
		   parts:{wuLiaoName:""},
		  wuzi: false,
		  chanpin:true,
		  qita:false,
		  shebei:false,
		  item:{},
		  num: 1, 
		  numMax:1,
		options: [{
		           value: '产品',
		           label: '产品'
		         }],
		         value: '',
        parents1:[],
		parents2:[],
		model: {
			
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
		async chanpinchange(){
			console.log('purchaseId',this.model.purchaseId)
			const res = await this.$http.get(`rest/chanpin/Id/${this.model.purchaseId}`)
			console.log(res.data[0])
			this.model.purchaseName = res.data[0].purchaseName
			this.model.parent = res.data[0]._id
			this.model.chanpinName = res.data[0].chanpinName
			this.numMax = res.data[0].purchaseNum
		},
		async category(){
				console.log('model.category',this.model.category == '产品')
				 if(this.model.category == '产品'){
					const res = await this.$http.get(`rest/chanpins`)
					this.part = res.data
					this.wuzi = await false;
					this.chanpin = await true;
					this.shebei = await false;
					this.qita = await false;
				}
		},
      async save() {
		  if(this.model.date != undefined){
		  	
			 if(this.model.category != undefined){
				
						  if(this.model.purchaseId != undefined){
							   
							   if(this.model.purchaseName != undefined){
									
								   if(this.model.num != undefined){
									   console.log(this.model)
										var _this = this;
										　　let yy = new Date().getFullYear();
										　　let mm = new Date().getMonth()+1;
										　　let dd = new Date().getDate();
										　　let hh = new Date().getHours();
										　　let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
										　　_this.gettime = yy+'/'+mm+'/'+dd+' '+hh+':'+mf;
										this.model.saleTime = _this.gettime
										console.log(this.model.saleTime)
										this.model.agree="待通过"
										 this.model.way="销售"
										console.log('this.model',this.model)
										 if(this.model.category == '产品'){
													  const res = await this.$http.post('rest/Exsalechanpin',this.model)
										}
										this.$message({
													  message:'保存成功',
													  type:'success'
										});
										  this.$router.push('/exSale')
						}else{
							const h = this.$createElement;
							        this.$notify({
							          title: '提示',
							          message: h('i', { style: 'color: teal'}, '物资数量未选')
							        });
						}
					}else{
						const h = this.$createElement;
						        this.$notify({
						          title: '提示',
						          message: h('i', { style: 'color: teal'}, '物资名称未填选')
						        });
					}
				}else{
					const h = this.$createElement;
					        this.$notify({
					          title: '提示',
					          message: h('i', { style: 'color: teal'}, '物资ID未选')
					        });
				}
			 }else{
				const h = this.$createElement;
				        this.$notify({
				          title: '提示',
				          message: h('i', { style: 'color: teal'}, '物资分类未选')
				        });
			 }
		 } else{
			 const h = this.$createElement;
			         this.$notify({
			           title: '提示',
			           message: h('i', { style: 'color: teal'}, '销售时间未选')
			         });
		 } 
	  },
    },
	created(){
		this.model.applicant = window.localStorage.username
	}
  }
</script>

<style>
	input:focus{
		  border: solid 1px  #F04936;
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
		background-color: #EEEEEE;
	}
	i{
		color: #555;
	}
</style>
