<template>
  <div style="overflow: scroll;height: 100%;overflow-x: hidden;">
    <!-- <h1>{{id?'编辑':'新建'}}广告</h1> -->
    <h1>出库</h1>
    <el-form  :model="model" label-width="80px"  @submit.native.prevent="save">
      <el-form-item label="申请人" required>
			<el-col :span="8" style="margin-right:30px;">
				<el-input v-model="model.applicant" required disabled></el-input>		  
			</el-col>
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
		<el-form-item label="仪器状况">
		  <el-input type="textarea" v-model="model.exSituation"  placeholder="仪器是否完好或有瑕疵损坏" ></el-input>
		</el-form-item>
		<el-form-item label="备注">
		  <el-input type="textarea"  placeholder="添加物资出库去向或原因"  v-model="model.reason"></el-input>
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
       wuzi: false,
       chanpin:true,
       qita:false,
       shebei:false,
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
		     // console.log(res.url,'res')
					   this.model.exPurchaseIcon =  res.url
					   console.log('this.model', this.model.exPurchaseIcon)
		    },
      async save() {
		  
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
						     this.model.way="出库"
						   if(this.model.category == '物料'){
						   			  const res = await this.$http.post('rest/Everwuliao',this.model)
						   } else if(this.model.category == '产品'){
						   			  const res = await this.$http.post('rest/Everchanpin',this.model)
						   }else if(this.model.category == '设备'){
						   			  const res = await this.$http.post('rest/Evershebei',this.model)
						   }else if(this.model.category == '其他'){
						   			  const res = await this.$http.post('rest/Everqitas',this.model)
						   }
						     this.$router.push('/outOfStock')
						    this.$message({
						   			  message:'保存成功',
						   			  type:'success'
						    });
					   }else{
						   console.log('数量')
					   }
					}else{
						console.log('名称')
					}
				}else{
					console.log('id')
				}
		}else{
			console.log('分类')
		}
	  }
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
