<template>
  <div style="overflow: scroll;height: 100%;overflow-x: hidden;">
    <!-- <h1>{{id?'编辑':'新建'}}广告</h1> -->
    <h1>外借申请单</h1>
    <el-form  :model="model" label-width="80px"  @submit.native.prevent="save">
      <el-form-item label="申请人" required>
			<el-col :span="8" style="margin-right:30px;">
				<el-input v-model="model.applicant" required disabled></el-input>		  
			</el-col>
			<el-form-item label="领用时间">
					<el-col :span="8">
						  <div class="block">
						      <el-date-picker
						        v-model="model.date"
						        type="datetimerange"
						        :picker-options="pickerOptions"
						        range-separator="至"
						        start-placeholder="开始日期"
						        end-placeholder="结束日期"
						        align="right"
								value-format="yyyy-MM-dd hh:MM:ss">
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
	  						<el-select v-model="model.purchaseId" filterable placeholder="请选择或搜索" v-if="wuzi" class="leibie" @change="wuzichange">
	  							<el-option v-for="item in part" :key="item.purchaseId" :label="item.purchaseId" :value="item.purchaseId"></el-option>
	  						</el-select>	
	  						<el-select v-model="model.purchaseId" filterable placeholder="请选择或搜索" v-if="chanpin"  class="leibie" @change="chanpinchange">
	  							<el-option v-for="item in part" :key="item.purchaseId" :label="item.purchaseId" :value="item.purchaseId"></el-option>
	  						</el-select>
	  						<el-select v-model="model.purchaseId" filterable placeholder="请选择或搜索" v-if="shebei"  class="leibie" @change="shebeichange">
	  							<el-option v-for="item in part" :key="item.purchaseId" :label="item.purchaseId" :value="item.purchaseId"></el-option>
	  						</el-select>
	  						<el-select v-model="model.purchaseId" filterable placeholder="请选择或搜索" v-if="qita"  class="leibie" @change="qitachange">
	  							<el-option v-for="item in part" :key="item.purchaseId" :label="item.purchaseId" :value="item.purchaseId"></el-option>
	  						</el-select>
	  					</el-col>
	  			</el-form-item>
	  </el-form-item>
	  </el-form-item>
	  
	    </el-form-item>
		
		<el-form-item label="数量" required>
			<el-col :span="8" style="margin-right:30px;">
				
				<el-col :span="8" style="margin-right:30px;">
					<el-input-number v-model="model.num" :min="1" :max="numMax" label="描述文字"></el-input-number>
					 <span style="color: #666; width: 200px;">物资总数为:{{numMax}}</span>		  
				</el-col>
			</el-col>
			<el-form-item label="物资名称" required>
					<span >
					  {{model.purchaseName}}
					</span>	
			</el-form-item>
			
		</el-form-item>
		
	    </el-form-item>
		</el-form-item>
	  
      <el-form-item label="物资用途">
        <el-input type="textarea" v-model="model.reason"></el-input>
      </el-form-item>
		<el-form-item label="仪器状况">
		  <el-input type="textarea" v-model="model.exSituation"></el-input>
		</el-form-item>
		<el-form-item label="借出照片">
			<div class="grid-content bg-purple"
						style="width: 200px; border: #bbb dashed 1px;line-height: 200px;">
									<el-upload
									  class="avatar-uploader"
									  :action="$http.defaults.baseURL+'/upload'"
									  :show-file-list="false"
									  
									   :on-success="res=>$set(model,'exPurchaseIcon',res.url)">
									 <img v-if="model.exPurchaseIcon" :src="model.exPurchaseIcon" style="width: 200px;vertical-align: middle; ">
									 <i v-else class="el-icon-plus avatar-uploader-icon" style="color: #555; margin: 95px 95px;"></i>
									</el-upload>
			</div>
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
		         }, {
		           value: '物料',
		           label: '物料'
		         }, {
				   value: '设备',
				   label: '设备'
				 }, {
		           value: '其他',
		           label: '其他'
		         }],
		         value: '',
				 wuzipart:{},
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
		async wuzichange(){
			console.log('purchaseId',this.model.purchaseId)
			const res = await this.$http.get(`rest/equipment/Id/${this.model.purchaseId}`)
			console.log(res.data[0]._id)
			this.model.purchaseName = res.data[0].purchaseName
			this.model.parent = res.data[0]._id
			this.numMax = res.data[0].purchaseNum
		},
		async qitachange(){
			console.log('purchaseId',this.model.purchaseId)
			const res = await this.$http.get(`rest/qitas/Id/${this.model.purchaseId}`)
			console.log(res.data[0])
			this.model.purchaseName = res.data[0].purchaseName
			this.model.parent = res.data[0]._id
			this.numMax = res.data[0].purchaseNum
		},
		async shebeichange(){
			console.log('purchaseId',this.model.purchaseId)
			const res = await this.$http.get(`rest/shebei/Id/${this.model.purchaseId}`)
			console.log(res.data[0])
			this.model.purchaseName = res.data[0].purchaseName
			this.model.parent = res.data[0]._id
			this.numMax = res.data[0].purchaseNum
		},
		async chanpinchange(){
			console.log('purchaseId',this.model.purchaseId)
			const res = await this.$http.get(`rest/chanpin/Id/${this.model.purchaseId}`)
			console.log(res.data[0])
			this.model.purchaseName = res.data[0].purchaseName
			this.model.parent = res.data[0]._id
			this.numMax = res.data[0].purchaseNum
		},
		async category(){
				console.log('model.category',this.model.category == '产品')
				if(this.model.category == '物料'){
					const res = await this.$http.get(`rest/equipment`)
					this.part = res.data
					this.part = res.data;
					this.wuzi = await true;
					this.chanpin = await false;
					this.shebei = await false;
					this.qita = await false;
				}else if(this.model.category == '产品'){
					const res = await this.$http.get(`rest/chanpins`)
					this.part = res.data
					this.wuzi = await false;
					this.chanpin = await true;
					this.shebei = await false;
					this.qita = await false;
				}else if(this.model.category == '设备'){
					const res = await this.$http.get(`rest/shebeis`)
					this.part = res.data
					this.part = res.data;
					this.wuzi = await false;
					this.chanpin = await false;
					this.shebei = await true;
					this.qita = await false;
				}else if(this.model.category == '其他'){
					const res = await this.$http.get(`rest/qitas`)
					this.part = res.data
					this.wuzi = await false;
					this.chanpin = await false;
					this.shebei = await false;
					this.qita = await true;
				}
		},
		afterUpload(res) {
					   this.model.exPurchaseIcon =  res.url
		},
      async save() {
		  //点击申请时间
		  if(this.model.category != undefined){
			  if(this.model.purchaseId != undefined){
				   if(this.model.purchaseName != undefined){
					   if(this.model.num != undefined){
					   				var _this = this;
					   				　　let yy = new Date().getFullYear();
					   				　　let mm = new Date().getMonth()+1;
					   				　　let dd = new Date().getDate();
					   				　　let hh = new Date().getHours();
					   				　　let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
					   				　　_this.gettime = yy+'/'+mm+'/'+dd+' '+hh+':'+mf;
					   				this.model.exTime = _this.gettime
					   				console.log(this.model.exTime)
					   				this.model.agree="待通过"
					   				 this.model.way="借出"
					   				console.log('this.model',this.model)
					   				console.log('this.model',this.model.category)
					   				if(this.model.category == '物料'){
					   							  const res = await this.$http.post('rest/ExEquipment',this.model)
					   				} else if(this.model.category == '产品'){
					   							  const res = await this.$http.post('rest/ExChanpins',this.model)
					   				}else if(this.model.category == '设备'){
					   							  const res = await this.$http.post('rest/ExShebei',this.model)
					   				}else if(this.model.category == '其他'){
					   							  const res = await this.$http.post('rest/ExQitas',this.model)
					   				}
					   				 this.$router.push('/ExWarehouse')
					   				this.$message({
					   							  message:'保存成功',
					   							  type:'success'
					   				});
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
					             message: h('i', { style: 'color: teal'}, '物资名称未选')
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
	.leibie{
		/* position: absolute; */
	}
</style>
