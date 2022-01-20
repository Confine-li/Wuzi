<template>
	<div>
		<!-- <h1>{{id?'编辑':'新建'}}广告</h1> -->
		<h1>添加入库物资</h1>
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
					  <el-form  v-model="parts" label-width="80px" @submit.native.prevent="savePart" style="margin-right: 30px;">
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
		<el-form :model="model" label-width="100px" @submit.native.prevent="save" >
			<el-form-item label="申请人">
				<el-col :span="8" style="margin-right:30px;"><el-input v-model="model.applicant" disabled></el-input></el-col>
				<el-form-item label="物资名称" required>
					<el-col :span="8" style="margin-right:30px;"><el-input v-model="model.purchaseName" required ></el-input></el-col>
				</el-form-item>
			</el-form-item>
			<el-form-item label="物资类别" required>
				<el-col :span="8" style="margin-right:30px;">
					<el-select v-model="model.purchaseCategories" placeholder="请选择" required @change="orWuLiao()">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-col>
				<el-form-item label="物资型号">
					<el-col :span="8" style="margin-right:30px;"><el-input v-model="model.purchaseSize"></el-input></el-col>
				</el-form-item>
			</el-form-item>
			<el-form-item label="物料分类" required v-if="wuzi">
				<el-select v-model="model.wuLiaoName" filterable placeholder="请选择">
					<el-option v-for="item in part" :key="item.wuLiaoName" :label="item.wuLiaoName" :value="item.wuLiaoName"></el-option>
				</el-select>
				<el-button type="primary" plain icon="el-icon-plus" circle @click="drawer = true" size="small" style="margin-left: 10px;"></el-button>
			</el-form-item>
			<el-form-item label="产品分类" required v-if="chanpin">
				<el-select v-model="model.chanpinName" filterable placeholder="请选择">
					<el-option v-for="item in part" :key="item.chanpinName" :label="item.chanpinName" :value="item.chanpinName"></el-option>
				</el-select>
				<el-button type="primary" plain icon="el-icon-plus" circle @click="drawer = true" size="small" style="margin-left: 10px;"></el-button>
			</el-form-item>
			<el-form-item label="设备分类" required v-if="shebei">
				<el-select v-model="model.shebeiName" filterable placeholder="请选择">
					<el-option v-for="item in part" :key="item.shebeiName" :label="item.shebeiName" :value="item.shebeiName"></el-option>
				</el-select>
				<el-button type="primary" plain icon="el-icon-plus" circle @click="drawer = true" size="small" style="margin-left: 10px;"></el-button>
			</el-form-item>
			<el-form-item label="其他分类" required v-if="qita">
				<el-select v-model="model.qitaName" filterable placeholder="请选择">
					<el-option v-for="item in part" :key="item.qitaName" :label="item.qitaName" :value="item.qitaName"></el-option>
				</el-select>
				<el-button type="primary" plain icon="el-icon-plus" circle @click="drawer = true" size="small" style="margin-left: 10px;"></el-button>
			</el-form-item>
			<el-form-item label="实际价格">
				<el-col :span="8" style="margin-right:30px;"><el-input v-model="model.purchasePrice"></el-input></el-col>
				<el-form-item label="物资数量" required>
					<el-col :span="8" style="margin-right:30px;"><el-input v-model.number="model.purchaseNum" required></el-input></el-col>
				</el-form-item>
			</el-form-item>
			<el-form-item label="物资编号" required>
				<el-col :span="8" style="margin-right:30px;"><el-input v-model="model.purchaseId" required></el-input></el-col>
				<el-form-item label="物资位置" required>
					<el-col :span="8" style="margin-right:30px;"><el-input v-model="model.purchaseSite" required></el-input></el-col>
				</el-form-item>
			</el-form-item>
			<el-form-item label="备注"><el-input type="textarea" v-model="model.purchaseTestFeedback"></el-input></el-form-item>
			<el-form-item label="设备图片">
				<div class="grid-content bg-purple" style="width: 200px;height: 200px; border: #bbb dashed 1px;line-height: 200px;">
					<el-upload
						class="avatar-uploader"
						:action="$http.defaults.baseURL + '/upload'"
						:show-file-list="false"
						:on-success="res => $set(model, 'purchaseIcon', res.url)">
						<img v-if="model.purchaseIcon" :src="model.purchaseIcon" style="width: 200px;vertical-align: middle; " />
						<i v-else class="el-icon-plus avatar-uploader-icon" style="color: #555; width:200px ;"></i>
					</el-upload>
				</div>
			</el-form-item>

			<el-form-item>
				<el-button type="danger" native-type="submit">立即入库</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: 'TestEdit',
	data() {
		return {
			part: [],
			 parts:{wuLiaoName:""},
			 activeName: 'first',
			wuzi: false,
			chanpin:false,
			qita:false,
			shebei:false,
			drawer: false,
			direction: 'rtl',
			options: [
				{
					value: '产品',
					label: '产品'
				},
				{
					value: '物料',
					label: '物料'
				},
				{
					value: '设备',
					label: '设备'
				},
				{
					value: '其他',
					label: '其他'
				},
			],
			model: {},
		};
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
							message: '已取消删除。'
						});          
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
		async orWuLiao() {
			if (this.model.purchaseCategories == '物料') {
				const res = await this.$http.get(`rest/parts`);
				this.part = res.data;
				this.wuzi = await true;
				this.chanpin = await false;
				this.shebei = await false;
				this.qita = await false;
			} else if(this.model.purchaseCategories == '产品'){
				const res = await this.$http.get(`rest/partchanpin`);
				this.part = res.data;
				this.chanpin = await true;
				this.wuzi = await false;
				this.shebei = await false;
				this.qita = await false;
			}else if(this.model.purchaseCategories == '设备'){
				const res = await this.$http.get(`rest/partshebei`);
				this.part = res.data;
				this.shebei = await true;
				this.chanpin = await false;
				this.wuzi = await false;
				this.qita = await false;
			}else if(this.model.purchaseCategories == '其他'){
				const res = await this.$http.get(`rest/partqitas`);
				this.part = res.data;
				this.qita = await true;
				this.chanpin = await false;
				this.shebei = await false;
				this.wuzi = await false;
			}
		},
		async save() {
			// 点击时间
			var _this = this;
			let yy = new Date().getFullYear();
			let mm = new Date().getMonth() + 1;
			let dd = new Date().getDate();
			let hh = new Date().getHours();
			let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
			_this.gettime = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf;
			this.model.purchaseDate3 = _this.gettime;
			// console.log(this.model.purchaseDate3)

			this.model.agree = '已通过';
			this.model.leader = window.localStorage.username
			if(window.localStorage.shenfen == '管理员'){
				if(this.model.purchaseCategories != undefined  ){
					// console.log("类别选了")
					if(this.model.wuLiaoName != undefined || this.model.chanpinName != undefined  || this.model.shebeiName != undefined   ||this.model.qitaName != undefined ){
						console.log("提交")
						 if (this.model.purchaseCategories == '设备') {
							this.model.test = '检验合格';
							this.model.purchaseState = '在库';
							console.log('设备', this.model);
							const res2 = await this.$http.post('rest/shebei', this.model);
						} else if (this.model.purchaseCategories == '产品') {
							this.model.test = '检验合格';
							this.model.purchaseState = '在库';
							const res2 = await this.$http.post('rest/chanpins', this.model);
							console.log('产品2D');
						} else if (this.model.purchaseCategories == '其他') {
							this.model.test = '检验合格';
							this.model.purchaseState = '在库';
							const res2 = await this.$http.post('rest/qitas', this.model);
							console.log('其他');
						}else if (this.model.purchaseCategories == '物料') {
							this.model.test = '检验合格';
							this.model.purchaseState = '在库';
							const res2 = await this.$http.post('rest/Equipment', this.model);
							console.log('this.model',this.model);
						}
						let res = await this.$http.post(`rest/TestList`, this.model);
						this.$router.push('/testList');
						
						console.log('res', res);
						this.$message({
							message: '保存成功！',
							type: 'success'
						}); 
					}else{
						const h = this.$createElement;
								this.$notify({
								  title: '提示',
								  message: h('i', { style: 'color: teal'}, '二级类别未选！')
								});
					}
				}else{
					console.log("类别没选")
					const h = this.$createElement;
							this.$notify({
							  title: '提示',
							  message: h('i', { style: 'color: teal'}, '物资分类未选！')
							});
				}
			
			}else{
				console.log("类别没选")
				const h = this.$createElement;
						this.$notify({
						  title: '提示',
						  message: h('i', { style: 'color: teal'}, '请以管理员身份登录！')
						});
			}
		}
	},
	created(){
		const h = this.$createElement;
				this.$notify({
				  title: '提示',
				  message: h('i', { style: 'color: teal'}, '只有以管理员身份登录才可进行物资入库操作！')
				});
		this.model.applicant = window.localStorage.username
	}
};
</script>

<style>
.el-col-18 {
	width: 75%;
	margin-top: 10px;
	margin-bottom: 10px;
}
.el-textarea__inner {
	width: 75%;
}
.el-card__header {
	padding: 4px 20px;
}
.el-card {
	background-color: #eeeeee;
}
.el-main {
	overflow-y: scroll !important;
}
/* 图片 */
</style>
