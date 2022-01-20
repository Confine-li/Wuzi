<template>
	<div
		calss="purchaseResults"
		:data="items"
		style="
    height: 100%; width:100%; margin: 0 auto;overflow: scroll;overflow-x: hidden;"
	>
		<el-container style="width: 800px; margin: 0 auto;">
			<h1 style="margin: 30px auto;">物资借还清单</h1>
			<el-descriptions :column="2" :size="size" border>
				<el-descriptions-item>
					<template slot="label">
						<!-- <i class="el-icon-user">1</i> -->
						<p style="width: 80px;">申请人</p>
					</template>
					<p style="width:200px;">{{ items.applicant }}</p>
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						<p style="width:100px;">负责人</p>
					</template>
					{{items.leader}}
				</el-descriptions-item>
				<el-descriptions-item :span="2">
					<template slot="label">
						申请理由
					</template>
					<p style="width:200px;">{{ items.reason }}</p>
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						<!-- <i class="el-icon-user">1</i> -->
						<p style="width: 80px;">借出时物资状态</p>
					</template>
					<p style="width:200px;">{{ items.exSituation }}</p>
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						<p style="width:100px;">借出图片</p>
					</template>
					<template>
						<template>
							<img :src="items.exPurchaseIcon" style="height: 3rem;" />
						</template>
					</template>
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						<!-- <i class="el-icon-user">1</i> -->
						<p style="width: 80px;">借用时间</p>
					</template>
					{{ items.date }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						<p>物资名称</p>
					</template>
					<p style="width:100px;">{{ items.purchaseName }}</p>
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						<p>物资编号</p>
					</template>
					<p style="width:200px;">{{ items.purchaseId }}</p>
				</el-descriptions-item>
				<el-descriptions-item :span="2">
					<template slot="label">
						申请数量
					</template>
					<p style="width:200px;">{{ items.num }}</p>
				</el-descriptions-item>
				<el-descriptions-item :span="2">
					<template slot="label">
						审批状态
					</template>
					<p style="width:200px;">
						{{ items.agree }}
						<span>{{ items.agreeTime }}</span>
					</p>
				</el-descriptions-item>
				<el-descriptions-item :span="2">
					<template slot="label">
						借还状态
					</template>
					<p style="width:200px;">
						{{ items.returnStock }}
						<span>{{ items.returnTime }}</span>
					</p>
				</el-descriptions-item>
				<el-descriptions-item :span="2">
					<template slot="label">
						备注
					</template>
					<p style="width:200px;">
						{{ items.text }}
					</p>
					<el-input :disabled="inputable" type="textarea" v-model="items.text" ></el-input>
				</el-descriptions-item>
				<el-descriptions-item :span="2">
					<template slot="label">
						归还照片
					</template>
					<div class="grid-content bg-purple" style="width: 200px; border: #bbb dashed 1px;line-height: 200px;">
						<el-upload
							class="avatar-uploader"
							:action="$http.defaults.baseURL + '/upload'"
							:show-file-list="false"
							:on-success="res => $set(items, 'returnPurchaseIcon', res.url)"
							:disabled="inputable">
							<img v-if="items.returnPurchaseIcon" :src="items.returnPurchaseIcon" class="avatar" />
							<i v-else class="el-icon-plus avatar-uploader-icon" style="color: #999; "></i>
						</el-upload>
					</div>
				</el-descriptions-item>
			</el-descriptions>
			<el-footer>
				<el-row :gutter="5" style="display: flex;">
					<el-col :span="10"><div style=";font-weight: 600;margin-top: 8px;">负责人意见</div></el-col>
					<el-col :span="14">
						<div style="display: flex;">
							<el-button :plain="true" @click="open2" :disabled="agreebtn">同意</el-button>
							<el-button :plain="true" @click="open4" :disabled="agreebtn">不同意</el-button>
							<el-button type="primary" plain @click="returnStock()":disabled="agreebtn">归还</el-button>
							<el-button type="success" plain @click="exUpdate()" :disabled="agreebtn">更新</el-button>
						</div>
					</el-col>
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
			index: '',
			items: [],
			list: [],
			size: '',
			inputable:true,
			agreebtn:true,
		};
	},
	methods: {
		async exUpdate() {
			if (this.index==1) {
				let res = await this.$http.put(`rest/ExChanpin/${this.id}`, this.items);
			} else if (this.index==2) {
				let res = await this.$http.put(`rest/ExEquipment/${this.id}`, this.items);
			} else if (this.inde==3) {
				let res = await this.$http.put(`rest/ExShebei/${this.id}`, this.items);
			} else if (this.index==4) {
				let res = await this.$http.put(`rest/ExQitas/${this.id}`, this.items);
			} 
			
			this.$message({
				message: '您已成功更新借用还信息',
				type: 'success'
			});
		},
		async returnStock() {
			this.$message({
				message: '该物资已成功归还',
				type: 'success'
			});
			//获取当前时间并打印
			var _this = this;
			let yy = new Date().getFullYear();
			let mm = new Date().getMonth() + 1;
			let dd = new Date().getDate();
			let hh = new Date().getHours();
			let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
			let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
			_this.gettime = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss;
			this.items.returnTime = _this.gettime;
			console.log(this.items.returnTime);
			
			this.items.returnStock = '归还';
			if (this.index==1) {
				let res = await this.$http.put(`rest/ExChanpin/${this.id}`, this.items);
				const res1 = await this.$http.get(`rest/chanpin/${this.items.parent}`);
				res1.data.purchaseState = '在库';
				res1.data.purchaseNum = Number(res1.data.purchaseNum) + Number(this.items.num);
				let res11 = await this.$http.put(`rest/chanpin/${this.items.parent}`, res1.data);
			} else if (this.index==2) {
				let res = await this.$http.put(`rest/ExEquipment/${this.id}`, this.items);
				const res1 = await this.$http.get(`rest/equipment/${this.items.parent}`);
				res1.data.purchaseState = '在库';
				res1.data.purchaseNum = Number(res1.data.purchaseNum) + Number(this.items.num);
				let res11 = await this.$http.put(`rest/equipment/${this.items.parent}`, res1.data);
			} else if (this.inde==3) {
				let res = await this.$http.put(`rest/ExShebei/${this.id}`, this.items);
				const res1 = await this.$http.get(`rest/shebei/${this.items.parent}`);
				res1.data.purchaseState = '在库';
				res1.data.purchaseNum = Number(res1.data.purchaseNum) + Number(this.items.num);
				let res11 = await this.$http.put(`rest/shebei/${this.items.parent}`, res1.data);
			} else if (this.index==4) {
				let res = await this.$http.put(`rest/ExQitas/${this.id}`, this.items);
				const res1 = await this.$http.get(`rest/qitas/${this.items.parent}`);
				res1.data.purchaseState = '在库';
				res1.data.purchaseNum = Number(res1.data.purchaseNum) + Number(this.items.num);
				let res11 = await this.$http.put(`rest/qitas/${this.items.parent}`, res1.data);
			}
		},
		async open2() {
			this.$message({
				message: '您已成功同意该申请',
				type: 'success'
			});
			//点击时间
			var _this = this;
			let yy = new Date().getFullYear();
			let mm = new Date().getMonth() + 1;
			let dd = new Date().getDate();
			let hh = new Date().getHours();
			let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
			let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
			_this.gettime = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss;
			this.items.agreeTime = _this.gettime;
			console.log(this.items.agreeTime);

			// if (this.items.purchaseNum == 0) {
			// 	this.items.purchaseState = '数量为0';
			// }
			// console.log(this.items.purchaseNum)
			this.items.agree = await '已通过';
			this.items.returnStock = '已借出';
			
			if (this.index==1) {
				let res = await this.$http.put(`rest/ExChanpin/${this.id}`, this.items);
				const res1 = await this.$http.get(`rest/chanpin/${this.items.parent}`);
				res1.data.purchaseNum = Number(res1.data.purchaseNum) - Number(this.items.num);
				 	if (res1.data.purchaseNum == 0) {
				 		res1.data.purchaseState = '数量为0';
				 	}
				let res11 = await this.$http.put(`rest/chanpin/${this.items.parent}`, res1.data);
			} 
			else if (this.index==2) {
				let res = await this.$http.put(`rest/ExEquipment/${this.id}`, this.items);
				const res1 = await this.$http.get(`rest/equipment/${this.items.parent}`);
				res1.data.purchaseNum = Number(res1.data.purchaseNum) - Number(this.items.num);
				 	if (res1.data.purchaseNum == 0) {
				 		res1.data.purchaseState = '数量为0';
				 	}
				let res11 = await this.$http.put(`rest/equipment/${this.items.parent}`, res1.data);
			} else if (this.inde==3) {
				let res = await this.$http.put(`rest/ExShebei/${this.id}`, this.items);
				const res1 = await this.$http.get(`rest/shebei/${this.items.parent}`);
				res1.data.purchaseNum = Number(res1.data.purchaseNum) - Number(this.items.num);
				 	if (res1.data.purchaseNum == 0) {
				 		res1.data.purchaseState = '数量为0';
				 	}
				let res11 = await this.$http.put(`rest/shebei/${this.items.parent}`, res1.data);
			} else if (this.index==4) {
				let res = await this.$http.put(`rest/ExQitas/${this.id}`, this.items);
				const res1 = await this.$http.get(`rest/qitas/${this.items.parent}`);
				res1.data.purchaseNum = Number(res1.data.purchaseNum) - Number(this.items.num);
				 	if (res1.data.purchaseNum == 0) {
				 		res1.data.purchaseState = '数量为0';
				 	}
				let res11 = await this.$http.put(`rest/qitas/${this.items.parent}`, res1.data);
			} 
		},
		async open4() {
			this.$message.error('您已拒绝同意该申请！');
			this.items.agree = '未通过';
			if (this.index==1) {
				let res = await this.$http.put(`rest/ExChanpin/${this.id}`, this.items);
			} else if (this.index==2) {
				let res = await this.$http.put(`rest/ExEquipment/${this.id}`, this.items);
			} else if (this.inde==3) {
				let res = await this.$http.put(`rest/ExShebei/${this.id}`, this.items);
			} else if (this.index==4) {
				let res = await this.$http.put(`rest/ExQitas/${this.id}`, this.items);
			} 
			this.$router.push('/exequipment/list');
		},
		async fetch() {
			const res1 = await this.$http.get(`rest/ExChanpin/${this.id}`);
			const res2 = await this.$http.get(`rest/ExEquipment/${this.id}`);
			const res3 = await this.$http.get(`rest/ExShebei/${this.id}`);
			const res4 = await this.$http.get(`rest/ExQitas/${this.id}`);
			if (res1.data.length != []) {
				this.index = '1';
				this.items = res1.data;
			} 
			else if (res2.data.length != []) {
				this.index = '2';
				this.items = res2.data;
			} else if (res3.data.length != []) {
				this.index = '3';
				this.items = res3.data;
			} else if (res4.data.length != []) {
				this.index = '4';
				this.items = res4.data;
			} 
			if(window.localStorage.shenfen == '管理员' && this.items.agree == '待通过'){
				this.agreebtn = false
				this.inputable = false
				this.items.leader = window.localStorage.username
			}
		}
	},
	created() {
		this.fetch();
	}
};
</script>

<style >
.purchaseResults {
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
div {
	/* margin: 0 auto; */
}
.purchaseResults {
	height: 100%;
	font-weight: bold;
	font-size: 14px;
	/* color: #909399; */
	position: absolute;
	width: 100%;
}
.main_container {
	height: 100%;
	width: 100%;
	min-height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.el-container {
	height: 100%;
}
.elMain {
	height: 100%;
	overflow: hidden;
}
.el-footer {
	display: flex;
	height: 4vh;
	width: 100%;
	align-items: center;
	background-color: #eee;
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
.el-upload{
	width: 200px;
}
</style>
