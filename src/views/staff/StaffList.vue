<template>	
	<div class="adv-list">
		<h1>管理员列表</h1>
		<el-button @click="drawer = true" type="primary" style=" position: absolute; top: 90px; right: 100px;" >
		  添加员工
		</el-button>
		<el-drawer
		  title="增添员工"
		  :visible.sync="drawer"
		  :direction="direction"
		  :before-close="handleClose">
		 <el-form  v-model="item" label-width="80px" @submit.native.prevent="save" style="margin-right: 30px;">
		  	
		  	<el-form-item label="名称">
		  		<el-input v-model="item.username"></el-input>
		  	</el-form-item>
		    <el-form-item label="部门">
		    	<el-input v-model="item.bumen"></el-input>
		    </el-form-item> 
			<el-form-item label="身份">
				<el-select v-model="item.shenfen" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
			</el-form-item> 
		  	<el-form-item label="密码">
		  		<el-input v-model="item.password"></el-input>
		  	</el-form-item>
		  
		  	<el-form-item>
		  		<el-button type="primary" native-type="submit">保存</el-button>
		  	</el-form-item>
		  </el-form>
		</el-drawer>
		  <el-table :data="items" style="width: 100%">
			<el-table-column			
		      label="ID"
		      prop="_id">
		    </el-table-column>								
		    <el-table-column
		      label="管理员名称"
		      prop="username">
		    </el-table-column>	
			<el-table-column
			  label="部门"
			  prop="bumen">
			</el-table-column>
			<el-table-column
			  label="身份"
			  prop="shenfen">
			  </el-table-column>
		    <el-table-column
		      align="right" 
			  label="操作"
			  prop="methods">	
			<!-- 操作 -->			 
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="drawer = true,updataAdmin(scope.row._id)" >编辑</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="remove(scope.row) ">删除</el-button>									  
			  </template>
		    </el-table-column>
		  </el-table>
	</div>
</template>

<script>
	export default{
		name:'AdminUserList',
		props:{
				
		},
		   data() {
		        return {
					id:'',
					item:
						{username:"",
						password:""},
					items: [],
					 drawer: false,
					 direction: 'rtl',
					 options: [{
					           value: '管理员',
					           label: '管理员'
					         }, {
					           value: '普通',
					           label: '普通'
					         }],
		        }
		      },
			  methods: {
				  async updataAdmin(id){
					  this.id = id
					  const res = await this.$http.get(`rest/AdminUser/${id}`)
					  this.item = res.data
				  },
				    handleClose(done) {
							done();
							this.fetch()
				        },
					async save() {
						if(window.localStorage.shenfen == '管理员'){
							let res
							console.log('this.id',this.id)
							if(this.id){
								res = await this.$http.put(`rest/AdminUser/${this.id}`, this.item)
							}else{
								res = await this.$http.post('rest/AdminUser', this.item)
							}
							this.$message({
								message: '保存成功',
								type: 'success'
							});
						}else{
							const h = this.$createElement;
							        this.$notify({
							          title: '提示',
							          message: h('i', { style: 'color: teal'}, '请以管理员身份登录！')
							        });
						}
					},
					
					//获取分类
					async fetch(){
						// console.log(this.id)
						const res = await this.$http.get(`rest/adminUser`)
						this.items = res.data
						console.log('items',this.items)
					},
					//删除
					   async remove(row) {
						   if(window.localStorage.shenfen == '管理员'){
						   
							   this.$confirm(`是否删除${row.username}的信息?`, '提示', {
								 confirmButtonText: '确定',
								 cancelButtonText: '取消',
								 type: 'warning'
							   }).then(async() => {
								//删除接口  /categories/:id
								if(row._id!='61dedd8aee23c4872fa3b26c'){
									 const res = await this.$http.delete(`rest/adminUser/${row._id}`)
									this.$message({
									type: 'success',
									message: '删除成功!'
									});
									
								}else{
									this.$message({
									type: 'info',
									message: '超级管理⚪不能删除！'
									}); 
								}
								 this.fetch();
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
						  }
			  		   				
			  },
			  //页面刚刚初进入的时候需要做什么  获取接口，地址栏参数在create获取
			  created(){
			  	// this.id &&
				this.fetch();
			  }
				 
	}
</script>

<style>
 
</style>
