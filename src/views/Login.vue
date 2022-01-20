<template>
	<div class="wrap">
	<div class="login-container" >
		<div class="login-title">
			<img src="../assets/图片1.png"style="width: 200px; margin: 0 auto;" />
			 <!-- <p  class="login-title2">{{title2}}</p> -->
			 <!-- <img src="../assets/图片1.png" /> -->
			 </div>
		<el-card header="管理员登录"  class="login-card">
			<!-- native监听原生的表达事件
			     prevent表示阻止跳转页面
			 -->
			<el-form v-model="model" @submit.native.prevent="login" class="login-from">
				<el-form-item >
					<span  style="color: white;">用户名</span>
					<el-input v-model="model.username">
					</el-input>
				</el-form-item>

				<el-form-item >
					<span  style="color: white;">密码</span>
					<el-input v-model="model.password" show-password>
					</el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" native-type="submit">登录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<p class="footerP">{{footerP}}</p>
	</div>
	</div>
</template>

<script>
	export default {
		
		name: 'Home',
		data() {
			return {
				model: {},
				footerP : '坚持一流管理，生产一流产品，提供一流服务，创建一流企业！',
			}
		},
	  methods: {
           async login(){
           	const res = await this.$http.post('login',this.model)
			 localStorage.token = res.data.token
			 localStorage.username = this.model.username
			 localStorage.shenfen =  res.data.user.shenfen
			 this.$message({
			 	type:'success',
			 	message:'登录成功'
			 })
			  
			this.username = res.data.user.username
			 this.$router.push('/')
           }
		}
	}
</script>

<style  >
	body{
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		/* background-color: #FBC9CC; */
	}
	.wrap{
		background-image:url(../assets/login2.jpg);
		background-size:100% 100%;
		background-repeat: no-repeat;
		height: 100vh;
		
	}
	.login-container {
		width: 25rem;
		margin: 0 auto;
		position: relative;
		
	}
	.login-card{
		position: absolute;
		top: 220px;
		width: 400px;
		color:  white;
		font-size:25px; 
		font-family:LiSu;
		font-weight: 600;
		background-color: rgba(255,255,255,0.1);
		
	}
	.login-title{
		color: white;
		position: absolute;
		top: 60px;
		left: 97px;
	}
	.login-title2{
		font-family: STKaiti;
		font-size: 42px;
	}
	.login-title img{
		width: 300px;
		margin-left: 40px;
	}
	.login-from{
		font-weight: 500;
		opacity:0.9;
	}
	.login-card button{
		margin-left: 80px;
		/* background-color:  white ; */
		width: 200px;
	}
	.footerP{
		color: white;
		position: absolute;
		top: 650px;
		text-align: center;
	}
	.el-button--primary {
	    color: #FFF;
	    background-color: #27A9E3;
	    border-color: #27A9E3;
	}
	.el-button--primary:hover {
	    background-color:#71d2fd;
	    border-color: #71d2fd;
	}
	.el-button--primary:active {
	   background-color: #27A9E3;
	   border-color: #27A9E3;
	}
</style>
