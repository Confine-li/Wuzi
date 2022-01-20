<template>
  <div>
    <!-- <h1>{{id?'编辑':'新建'}}广告</h1> -->
    <h1>添加加班记录</h1>
    <el-form  :model="model" label-width="100px"  @submit.native.prevent="save">
      <el-form-item label="加班人" required>
        <el-col :span="8" style="margin-right:30px;">
        	<el-input v-model="model.staff" disabled required></el-input>		  
        </el-col>
      </el-form-item>
      </el-form-item>
	 <el-form-item label="从何时开始" required>
	   <el-col :span="10">
	 			  <div class="block">
	 			      <el-date-picker
	 			        v-model="model.starTime"
	 			        type="datetime"
	 			        placeholder="选择日期时间"
						required>
	 			      </el-date-picker>
	 			    </div>
	 		</el-col>
	 		<el-form-item label="到何时结束" required>
	 		  <el-col :span="10">
	 					  <div class="block">
	 					      <el-date-picker
	 					        v-model="model.overTime"
	 					        type="datetime"
	 					        placeholder="选择日期时间"
								@change="starOverTime"
								required
								>
	 					      </el-date-picker>
	 					    </div>
	 				</el-col>
	 				</el-form-item>
	 		</el-form-item>
			<el-form-item label="加班原因" required>
			  <el-input type="textarea" v-model="model.reason" required></el-input>
			</el-form-item>
			<el-form-item label="加班所用时间">
			  <el-col :span="8" style="margin-right:30px; color: #666;">
			  	<p  v-model="model.time" v-if="model.time"  style=" margin: 0;">{{model.time}}</p>	
				<p  v-else   style=" margin: 0;">请选择加班时间</p>
			  </el-col>
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
        model: {
          },
      }
    },
    methods: {
		 myTimeToLocal(inputTime){
			if(!inputTime && typeof inputTime !== 'number'){
				return '';
			}
			var localTime = '';
			inputTime = new Date(inputTime).getTime();
			const offset = (new Date()).getTimezoneOffset();
			localTime = (new Date(inputTime - offset * 60000)).toISOString();
			localTime = localTime.substr(0, localTime.lastIndexOf('.'));
			localTime = localTime.replace('T', ' ');
			return localTime;
		},
		
      async save() {
		  if(this.model.overTime != undefined && this.model.starTime != undefined ){
			  var _this = this;
			  　　let yy = new Date().getFullYear();
			  　　let mm = new Date().getMonth()+1;
			  　　let dd = new Date().getDate();
			  　　_this.gettime = yy+'/'+mm+'/'+dd;
			  this.model.date = _this.gettime
			  this.model.state ='加班'
			  this.model.overTime = this.myTimeToLocal(this.model.overTime)
			  this.model.starTime = this.myTimeToLocal(this.model.starTime)
			  const res = await this.$http.post('rest/WorkOvertime',this.model)
			   this.$router.push('/WorkOvertime/list')
			  console.log('res',res)
			  this.$message({
			  			  message:'保存成功',
			  			  type:'success'
			  });
		  }
		  else{
			  const h = this.$createElement;
			          this.$notify({
			            title: '提示',
			            message: h('i', { style: 'color: teal'}, '加班开始/结束时间未选')
			          });
		  }
		  
	  },
	  async starOverTime(){
				let dateDiff = await new Date(this.model.overTime).getTime() - new Date(this.model.starTime).getTime();//日期转时间戳
		              var dayDiff = await Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
		              var leave1 = await dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
		              var hours = await Math.floor(leave1 / (3600 * 1000)); //计算出小时数
		              //计算相差分钟数
		              var leave2 = await leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
		              var minutes = await Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
		              //计算相差秒数
		              var leave3 = await leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
		              var seconds = await Math.round(leave3 / 1000);
					  // this.model.time = await dayDiff + "天" + hours + "小时" +  minutes ;
					  let name2 = JSON.parse(JSON.stringify(dayDiff + "天" + hours + "小时" +  minutes));
					  //执行完业务代码后
					 this.model.time = name2
					  console.log(this.model.time)
	  }
    },
	created(){
		this.model.staff = window.localStorage.username
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
</style>
