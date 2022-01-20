<template>
	<div
		calss="purchaseResults"
		:data="items"
		style="
    height: 100%; width: 800px; margin: 0 auto;border: #999 1px solid;"
	>
		<el-drawer :title="items.staff + '加班记录'" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="未补偿" name="first">
					<el-table :data="listsum" style="width: 100%;overflow-x: hidden;">
						<el-table-column prop="date" label="日期" width="180"></el-table-column>
						<el-table-column prop="time" label="加班时长" width="180"></el-table-column>
					</el-table>
					<p>累计时长：{{ sumtime2 }}</p>
				</el-tab-pane>
				<el-tab-pane label="补偿" name="second">
					<el-table :data="listsum" style="width: 100%;overflow-x: hidden;">
						<el-table-column prop="date" label="日期" width="180"></el-table-column>
						<el-table-column prop="time" label="加班时长" width="180"></el-table-column>
					</el-table>
					<p>累计时长：{{ sumtime2 }}</p>
				</el-tab-pane>
			</el-tabs>
		</el-drawer>
		<el-container>
			<h1 style="margin: 30px auto; color: #666;">加班信息详情</h1>
			<el-descriptions title="" :column="2" :size="size" border>
				<el-descriptions-item>
					<template slot="label">
						加班人
					</template>
					<p style="color: #555;font-weight: 600;">{{ items.staff }}</p>
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						加班时长
					</template>
					<p style="color: #555;font-weight: 600;">{{ items.time }}</p>
				</el-descriptions-item>
			</el-descriptions>
			<el-descriptions title="" :column="2" :size="size" border>
				<el-descriptions-item>
					<template slot="label">
						从何时开始
					</template>
					<p style="color: #555;font-weight: 600;">{{ items.starTime }}</p>
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						到何时结束
					</template>
					<p style="color: #555;font-weight: 600;">{{ items.overTime }}</p>
				</el-descriptions-item>

				<el-descriptions-item :span="2">
					<template slot="label">
						加班原因
					</template>
					<p style="width:600px;">{{ items.reason }}</p>
				</el-descriptions-item>
				<el-descriptions-item :span="2">
					<template slot="label">
						状态
					</template>
					<p style="width:600px;" v-if="items.state == '补偿'">{{ items.state }}{{ items.text }}</p>
					<el-input v-model="items.text" v-else placeholder="请填写给与加班补偿方式及结果" :disabled="inputable"></el-input>
				</el-descriptions-item>
			</el-descriptions>

			<div style="height: 100%;"></div>
			<el-footer>
				<el-row :gutter="5">
					<el-col :span="10"><div class="grid-content " style="margin-top: 33px;font-weight: 600;">负责人意见</div></el-col>
					<el-col :span="14">
						<div class="grid-content " style="display: flex;margin-top: 25px;position: relative;left: 20px;">
							<el-button :plain="true" @click="open2" style="display: inline;" :disabled="agreebtn">更新</el-button>
							<el-button @click="drawer = true" type="primary" plain style="">查看{{ items.staff }}累计加班记录</el-button>
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
		id: {},
		index: 1
	},
	data() {
		return {
			items: [],
			list: [],
			size: '',
			agreebtn: true,
			inputable: true,
			drawer: false,
			direction: 'rtl',
			activeName: 'first',
			staff: '',
			sumtime2: '',
			listsum:[]
		};
	},
	methods: {
		async handleClick(tab, event) {
			 if(tab.index==0){
				 this.fetchovertime()
			 }else{
				   const res3 = await this.$http.get(`rest/WorkOvertime/buchang/${this.staff}`)
				  // const res2 = await this.$http.get(`rest/WorkOvertime/jiaban/${this.staff}`)
				  this.listsum = res3.data
				  this.overtime()
			 }
		},
		async open2() {
			this.$message({
				message: '您已成功同意该申请',
				type: 'success'
			});
			this.items.agree = await '已通过';
			this.items.state = '补偿';
			this.items.leader = window.localStorage.username;
			let res = await this.$http.put(`rest/WorkOvertime/${this.id}`, this.items);
			this.list = this.items.items;
			const res2 = await this.$http.post('rest/testList', this.list);
			this.$router.push('/workOvertime/list');
		},
		overtime() {
			var day = 0;
			var hours = 0;
			var minutes = 0;
			for (var i = 0; i < this.listsum.length; i++) {
				var index2 = this.listsum[i].time.indexOf('时');
				var index1 = this.listsum[i].time.indexOf('天');
				day += Number(this.listsum[i].time.substr(0, index1));
				if (this.listsum[i].time.substr(0, index1).length == 2) {
					hours += Number(this.listsum[i].time.substr(index1 + 1, index2 - 4));
				} else {
					hours += Number(this.listsum[i].time.substr(index1 + 1, index2 - 3));
				}
				minutes += Number(this.listsum[i].time.substr(index2 + 1, index2 + 3));
			}
			// console.log(day,'天',hours,'小时',minutes,'分钟')
			hours+=parseInt(minutes/60)
			day+=parseInt(hours/24)
			hours = hours % 24
			minutes = minutes%60
			this.sumtime2 = day+'天'+hours+'小时'+minutes+'分钟'
			// console.log('天结果',day,'小时结果',hours,'分钟结果',minutes)
		},
		async fetch() {
			const res = await this.$http.get(`rest/WorkOvertime/${this.id}`);
			this.items = res.data;
			this.staff = res.data.staff;
			if (window.localStorage.shenfen == '管理员' && this.items.state == '加班') {
				this.agreebtn = false;
				this.inputable = false;
				this.items.leader = window.localStorage.username;
			}
			this.fetchovertime()
		},
		async fetchovertime(){
			const res2 = await this.$http.get(`rest/WorkOvertime/jiaban/${this.staff}`)
			this.listsum = res2.data
			this.overtime()
		},
		handleClose(done) {
			this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
		}
	},
	created() {
		this.fetch()
	}
};
</script>

<style scoped="scoped">
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
	/* background-color: white; */
	/* border:   #000000 1px solid; */
}
.row-bg {
	/* padding: 10px 0; */
	/* background-color: #f9fafc; */
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
}
.el-main {
	overflow: hidden !important;
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
	background: #eeeeee;
}
.grid-content[data-v-bdfdddbe] {
	/* background: #eee; */
}
.el-descriptions .is-bordered {
	table-layout: fixed;
}
.el-table {
	overflow: scroll;
}
</style>
