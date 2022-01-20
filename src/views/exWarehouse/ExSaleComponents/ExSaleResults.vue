<template>
	<div
		calss="purchaseResults"
		:data="items"
		style="height: 100%; width: 800px; margin: 0 auto;">
		<el-container>
			<el-descriptions title="销售申请表" :column="2" :size="size" border>
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
					{{ items.leader }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						<!-- <i class="el-icon-user">1</i> -->
						<p style="width: 80px;">购货方</p>
					</template>
					<p style="width:200px;">{{ items.buyer }}</p>
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						<p style="width:100px;">售价</p>
					</template>
					{{ items.jiage }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						<!-- <i class="el-icon-user">1</i> -->
						<p style="width: 80px;">销售时间</p>
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
						备注
					</template>
					<p style="width:200px;">{{ items.text }}</p>
				</el-descriptions-item>
				<el-descriptions-item :span="2">
					<template slot="label">
						审批状态
					</template>
					<p style="width:200px;">
						{{ items.agree }}
						<span>{{ items.saleTime }}</span>
					</p>
				</el-descriptions-item>
			</el-descriptions>
			<el-footer>
				<el-row :gutter="5" style="display: flex;">
					<el-col :span="10"><div style=";font-weight: 600;margin-top: 8px;">负责人意见</div></el-col>
					<el-col :span="14">
						<div style="display: flex;">
							<el-button :plain="true" @click="open2" :disabled="agreebtn">同意</el-button>
							<el-button :plain="true" @click="open4" :disabled="agreebtn">不同意</el-button>
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
			agreebtn: true
		};
	},
	methods: {
		async open2() {
			this.$message({
				message: '您已成功同意该申请',
				type: 'success'
			});
			var _this = this;
			let yy = new Date().getFullYear();
			let mm = new Date().getMonth() + 1;
			let dd = new Date().getDate();
			let hh = new Date().getHours();
			let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
			let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
			_this.gettime = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss;
			this.items.saleTime = _this.gettime;
			this.items.agree = await '已通过';

			if (this.index == 1) {
				let res = await this.$http.put(`rest/Exsalechanpin/${this.id}`, this.items);
				const res1 = await this.$http.get(`rest/chanpin/${this.items.parent}`);
				res1.data.purchaseNum = Number(res1.data.purchaseNum) - Number(this.items.num);
				if (res1.data.purchaseNum == 0) {
					res1.data.purchaseState = '数量为0';
				}
				let res11 = await this.$http.put(`rest/chanpin/${this.items.parent}`, res1.data);
			} else if (this.index == 2) {
				let res = await this.$http.put(`rest/Exsalewuliao/${this.id}`, this.items);
				const res1 = await this.$http.get(`rest/equipment/${this.items.parent}`);
				res1.data.purchaseNum = Number(res1.data.purchaseNum) - Number(this.items.num);
				if (res1.data.purchaseNum == 0) {
					res1.data.purchaseState = '数量为0';
				}
				let res11 = await this.$http.put(`rest/equipment/${this.items.parent}`, res1.data);
			} 
			this.$router.push('/exSale');
		},
		async open4() {
			this.$message.error('您已拒绝同意该申请！');
			this.items.agree = '未通过';
			// let res = await this.$http.put(`rest/ExSale/${this.id}`, this.items)
			if (this.index == 1) {
				let res = await this.$http.put(`rest/Exsalechanpin/${this.id}`, this.items);
			} else if (this.index == 2) {
				let res = await this.$http.put(`rest/Exsalewuliao/${this.id}`, this.items);
			} 
			this.$router.push('/exSale');
		},
		async fetch() {
			const res1 = await this.$http.get(`rest/Exsalechanpin/${this.id}`);
			const res2 = await this.$http.get(`rest/Exsalewuliao/${this.id}`);
			if (res1.data.length != []) {
				this.index = '1';
				this.items = res1.data;
			} else if (res2.data.length != []) {
				this.index = '2';
				this.items = res2.data;
			} 
			console.log('this.items ', this.items);
			if (window.localStorage.shenfen == '管理员' && this.items.agree == '待通过') {
				this.agreebtn = false;
				this.items.leader = window.localStorage.username;
			}
		}
	},
	created() {
		this.fetch();
	}
};
</script>

<style scoped="scoped">
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
	position: fixed;
	bottom: 20px;
	height: 4vh;
	width: 800px;
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
</style>
