<template>
	<div class="adList">
		<h1>物资销售列表</h1>
		<el-button type="primary" plain style="position: absolute;top: 90px;right: 100px;" @click="$router.push(`/exSale/create`)">申请销售</el-button>

		<template>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="产品" name="first">
					<el-table :data="items" :default-sort="{ prop: 'saleTime', order: 'descending' }" @row-click="dianji">
						<!-- prop是绑定的数据字段，label是显示的名称-->
						<el-table-column prop="date" label="时间"></el-table-column>
						<el-table-column prop="applicant" label="申请人"></el-table-column>
						<el-table-column prop="purchaseName" label="物资名称"></el-table-column>
						<el-table-column prop="purchaseId" label="物资编号"></el-table-column>
						<el-table-column prop="num" label="数量"></el-table-column>
						<el-table-column prop="jiage" label="售价"></el-table-column>
						<el-table-column prop="agree" label="状态">
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">
									<el-tag size="medium" :type="scope.row.agree >= '待通过' ? 'danger' : 'success'" :effect="scope.row.agree >= '未通过' ? 'light' : 'plain'">
										{{ scope.row.agree }}
									</el-tag>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<!-- <el-button size="mini" @click="$router.push(`/purchase/edit/${scope.row._id}`)">编辑</el-button> -->
								<el-button size="mini" type="danger" @click.stop="remove(scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
				
				<!-- <el-tab-pane label="分析" name="">
					<div style="width: 400px;height: 400px;" id="xiaoshou"></div>
				</el-tab-pane> -->
				<el-tab-pane label="销量" name="second">
					<div style="width: 1000px;height: 600px;" id="xiaoliang"></div>
				</el-tab-pane>
				<el-tab-pane label="销售额" name="third">
					<el-select v-model="value" placeholder="请选择查看的年份" class='nianfenxuanze' @change="nianfenchange" >
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					<div style="width: 1000px;height: 600px;" id="xiaoshoue"></div>
				</el-tab-pane>
			</el-tabs>
		</template>
	</div>
</template>

<script>
export default {
	props: {
		
	},
	data() {
		return {
			index:0,
			 options: [{
			          value: '2022',
			          label: '2022年'
			        }, {
			          value: '2023',
			          label: '2023年'
			        }, {
			          value: '2024',
			          label: '2024年'
			        }, {
			          value: '2025',
			          label: '2025年'
			        }, {
			          value: '2026',
			          label: '2026年'
			        }, {
			          value: '2027',
			          label: '2027年'
			        }, {
			          value: '2028',
			          label: '2028年'
			        }, {
			          value: '2029',
			          label: '2029年'
			        }, {
			          value: '2030',
			          label: '2030年'
			        }],
			        value: '2022',
			items: [],
			activeName: 'first',
			xiaoshoulist: [],
			nian:'',
		};
	},
	methods: {
		nianfenchange(){
			this.xioashoue()
		},
		async handleClick(tab, event) {
			if(this.$route.query.index != undefined){
				this.index=1
			}else{this.index = tab.index}
			 // console.log(this.index)
			 this.$route.query.index = undefined
			if (this.index == 0) {
				const res = await this.$http.get('rest/Exsalechanpin');
				this.items = res.data;
				this.index = tab.index;
			}  else if (this.index == 1) {
				
				var myChart = this.$echarts.init(document.getElementById('xiaoliang'));
				// 绘制图表
				var option;
					var dataMap = {};
					function dataFormatter(obj) {
					  // prettier-ignore
					  var pList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
					  var temp;
					  for (var year = 2022; year <= 2030; year++) {
					    var max = 0;
					    var sum = 0;
					    temp = obj[year];
					    for (var i = 0, l = temp.length; i < l; i++) {
					      max = Math.max(max, temp[i]);
					      sum += temp[i];
					      obj[year][i] = {
					        name: pList[i],
					        value: temp[i]
					      };
					    }
					    obj[year + 'max'] = Math.floor(max / 100) * 100;
					    obj[year + 'sum'] = sum;
					  }
					  return obj;
					}
					/* 
					1.按每年，每个分类，每个月的和 获取数据
						1）。按分类名称获取第分类 
							for（每个分类）{
								//第一个分类
								i = 0 按年份筛选  把年份传到后台 
								2022：[]
							}
					 */
					var value221 = 0;var value222 = 0;var value223 = 0;var value224 = 0;var value225 = 0;var value226 = 0;var value227 = 0;var value228 = 0;var value229 = 0;var value2210 = 0;var value2211 = 0;var value2212 = 0;
					var value231 = 0;var value232 = 0;var value233 = 0;var value234 = 0;var value235 = 0;var value236 = 0;var value237 = 0;var value238 = 0;var value239 = 0;var value2310 = 0;var value2311 = 0;var value2312 = 0;
					var value241 = 0;var value242 = 0;var value243 = 0;var value244 = 0;var value245 = 0;var value246 = 0;var value247 = 0;var value248 = 0;var value249 = 0;var value2410 = 0;var value2411 = 0;var value2412 = 0;
					var value251 = 0;var value252 = 0;var value253 = 0;var value254 = 0;var value255 = 0;var value256 = 0;var value257 = 0;var value258 = 0;var value259 = 0;var value2510 = 0;var value2511 = 0;var value2512 = 0;
					var value261 = 0;var value262 = 0;var value263 = 0;var value264 = 0;var value265 = 0;var value266 = 0;var value267 = 0;var value268 = 0;var value269 = 0;var value2610 = 0;var value2611 = 0;var value2612 = 0;
					var value271 = 0;var value272 = 0;var value273 = 0;var value274 = 0;var value275 = 0;var value276 = 0;var value277 = 0;var value278 = 0;var value279 = 0;var value2710 = 0;var value2711 = 0;var value2712 = 0;
					var value281 = 0;var value282 = 0;var value283 = 0;var value284 = 0;var value285 = 0;var value286 = 0;var value287 = 0;var value288 = 0;var value289 = 0;var value2810 = 0;var value2811 = 0;var value2812 = 0;
					var value291 = 0;var value292 = 0;var value293 = 0;var value294 = 0;var value295 = 0;var value296 = 0;var value297 = 0;var value298 = 0;var value299 = 0;var value2910 = 0;var value2911 = 0;var value2912 = 0;
					var value301 = 0;var value302 = 0;var value303 = 0;var value304 = 0;var value305 = 0;var value306 = 0;var value307 = 0;var value308 = 0;var value309 = 0;var value3010 = 0;var value3011 = 0;var value3012 = 0;
					
					let fenlei122 = [];let fenlei123 = [];let fenlei124 = [];let fenlei125 = [];let fenlei126 = [];let fenlei127 = [];let fenlei128 = [];let fenlei129 = [];let fenlei130 = [];
					let fenlei222 = [];let fenlei223 = [];let fenlei224 = [];let fenlei225 = [];let fenlei226 = [];let fenlei227 = [];let fenlei228 = [];let fenlei229 = [];let fenlei230 = [];
					let fenlei322 = [];let fenlei323 = [];let fenlei324= [];let fenlei325 = [];let fenlei326 = [];let fenlei327 = [];let fenlei328 = [];let fenlei329 = [];let fenlei330 = [];
					let fenlei422 = [];let fenlei423 = [];let fenlei424= [];let fenlei425 = [];let fenlei426 = [];let fenlei427 = [];let fenlei428 = [];let fenlei429 = [];let fenlei430 = [];
					let fenlei522 = [];let fenlei523 = [];let fenlei524= [];let fenlei525 = [];let fenlei526 = [];let fenlei527 = [];let fenlei528 = [];let fenlei529 = [];let fenlei530 = [];
					let fenlei622 = [];let fenlei623 = [];let fenlei624= [];let fenlei625 = [];let fenlei626 = [];let fenlei627 = [];let fenlei628 = [];let fenlei629 = [];let fenlei630 = [];
					let fenlei722 = [];let fenlei723 = [];let fenlei724= [];let fenlei725 = [];let fenlei726 = [];let fenlei727 = [];let fenlei728 = [];let fenlei729 = [];let fenlei730 = [];
					let fenlei822 = [];let fenlei823 = [];let fenlei824= [];let fenlei825 = [];let fenlei826 = [];let fenlei827 = [];let fenlei828 = [];let fenlei829 = [];let fenlei830 = [];
					let fenlei922 = [];let fenlei923 = [];let fenlei924= [];let fenlei925 = [];let fenlei926 = [];let fenlei927 = [];let fenlei928 = [];let fenlei929 = [];let fenlei930 = [];
					let fenlei1022 = [];let fenlei1023 = [];let fenlei1024= [];let fenlei1025 = [];let fenlei1026 = [];let fenlei1027 = [];let fenlei1028 = [];let fenlei1029 = [];let fenlei1030 = [];
					let fenlei1122 = [];let fenlei1123 = [];let fenlei1124= [];let fenlei1125 = [];let fenlei1126 = [];let fenlei1127 = [];let fenlei1128 = [];let fenlei1129 = [];let fenlei1130 = [];
					let fenlei1222 = [];let fenlei1223 = [];let fenlei1224= [];let fenlei1225 = [];let fenlei1226 = [];let fenlei1227 = [];let fenlei1228 = [];let fenlei1229 = [];let fenlei1230 = [];
					let fenlei1322 = [];let fenlei1323 = [];let fenlei1324= [];let fenlei1325 = [];let fenlei1326 = [];let fenlei1327 = [];let fenlei1328 = [];let fenlei1329 = [];let fenlei1330 = [];
					let fenlei1422 = [];let fenlei1423 = [];let fenlei1424= [];let fenlei1425 = [];let fenlei1426 = [];let fenlei1427 = [];let fenlei1428 = [];let fenlei1429 = [];let fenlei1430 = [];
					let fenlei1522 = [];let fenlei1523 = [];let fenlei1524= [];let fenlei1525 = [];let fenlei1526 = [];let fenlei1527 = [];let fenlei1528 = [];let fenlei1529 = [];let fenlei1530 = [];
					let fenlei1622 = [];let fenlei1623 = [];let fenlei1624= [];let fenlei1625 = [];let fenlei1626 = [];let fenlei1627 = [];let fenlei1628 = [];let fenlei1629 = [];let fenlei1630 = [];
					let fenlei1722 = [];let fenlei1723 = [];let fenlei1724= [];let fenlei1725 = [];let fenlei1726 = [];let fenlei1727 = [];let fenlei1728 = [];let fenlei1729 = [];let fenlei1730 = [];
					let fenlei1822 = [];let fenlei1823 = [];let fenlei1824= [];let fenlei1825 = [];let fenlei1826 = [];let fenlei1827 = [];let fenlei1828 = [];let fenlei1829 = [];let fenlei1830 = [];
					let fenlei1922 = [];let fenlei1923 = [];let fenlei1924= [];let fenlei1925 = [];let fenlei1926 = [];let fenlei1927 = [];let fenlei1928 = [];let fenlei1929 = [];let fenlei1930 = [];
					let fenlei2022 = [];let fenlei2023 = [];let fenlei2024= [];let fenlei2025 = [];let fenlei2026 = [];let fenlei2027 = [];let fenlei2028 = [];let fenlei2029 = [];let fenlei2030 = [];
					const res = await this.$http.get('rest/Partchanpin');
					var zongfenlei=[]
					var barfenlei=[]
					// console.log(res.data)
					// 每一个分类
					for (var i = 0; i < res.data.length; i++) {
						zongfenlei.push(res.data[i].chanpinName)
						// { name: zongfenlei[0], type: 'bar' },
						var chanpinname = res.data[i].chanpinName;
						barfenlei.push({name:chanpinname,type: 'bar'})
						let res2 = await this.$http.get(`rest/Exsalechanpin/xiaoshou/${chanpinname}`);
						// 其中一个分类的不同情况
						value221 = 0;   value222 = 0;   value223 = 0;   value224 = 0;   value225 = 0;   value226 = 0;   value227 = 0;   value228 = 0;   value229 = 0;   value2210 = 0;   value2211 = 0;   value2212 = 0;
						   value231 = 0;   value232 = 0;   value233 = 0;   value234 = 0;   value235 = 0;   value236 = 0;   value237 = 0;   value238 = 0;   value239 = 0;   value2310 = 0;   value2311 = 0;   value2312 = 0;
						   value241 = 0;   value242 = 0;   value243 = 0;   value244 = 0;   value245 = 0;   value246 = 0;   value247 = 0;   value248 = 0;   value249 = 0;   value2410 = 0;   value2411 = 0;   value2412 = 0;
						   value251 = 0;   value252 = 0;   value253 = 0;   value254 = 0;   value255 = 0;   value256 = 0;   value257 = 0;   value258 = 0;   value259 = 0;   value2510 = 0;   value2511 = 0;   value2512 = 0;
						   value261 = 0;   value262 = 0;   value263 = 0;   value264 = 0;   value265 = 0;   value266 = 0;   value267 = 0;   value268 = 0;   value269 = 0;   value2610 = 0;   value2611 = 0;   value2612 = 0;
						   value271 = 0;   value272 = 0;   value273 = 0;   value274 = 0;   value275 = 0;   value276 = 0;   value277 = 0;   value278 = 0;   value279 = 0;   value2710 = 0;   value2711 = 0;   value2712 = 0;
						   value281 = 0;   value282 = 0;   value283 = 0;   value284 = 0;   value285 = 0;   value286 = 0;   value287 = 0;   value288 = 0;   value289 = 0;   value2810 = 0;   value2811 = 0;   value2812 = 0;
						   value291 = 0;   value292 = 0;   value293 = 0;   value294 = 0;   value295 = 0;   value296 = 0;   value297 = 0;   value298 = 0;   value299 = 0;   value2910 = 0;   value2911 = 0;   value2912 = 0;
						   value301 = 0;   value302 = 0;   value303 = 0;   value304 = 0;   value305 = 0;   value306 = 0;   value307 = 0;   value308 = 0;   value309 = 0;   value3010 = 0;   value3011 = 0;   value3012 = 0;
						
						for(var j=0 ; j<res2.data.length;j++){
							  if(res2.data[j].date.indexOf("2022") != -1  ){
								var n=res2.data[j].date.indexOf("-")
								if(res2.data[j].date.substr(n+1,2)=='01' ){
									 value221+= Number(res2.data[j].num);
									 // console.log(j,value221)
								 }else if(res2.data[j].date.substr(n+1,2)=='02' ){
									 value222 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='03' ){
									 value223 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='04' ){
									 value224 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='05' ){
									 value225 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='06' ){
									 value226 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='07' ){
									 value227 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='08' ){
									 value228 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='09' ){
									 value229 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='10' ){
									 value2210 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='11' ){
									 value2211 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='12' ){
									 value2212 += Number(res2.data[j].num);
								 }
								
							}else if(res2.data[j].date.indexOf("2023") != -1 ){
								
								var n=res2.data[j].date.indexOf("-")
								if(res2.data[j].date.substr(n+1,2)=='01' ){
									 value231 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='02' ){
									 value232 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='03' ){
									 value233 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='04' ){
									 value234 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='05' ){
									 value235 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='06' ){
									 value236 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='07' ){
									 value237 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='08' ){
									 value238 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='09' ){
									 value239 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='10' ){
									 value2310 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='11' ){
									 value2311 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='12' ){
									 value2312 += Number(res2.data[j].num);
								 }
							}else if(res2.data[j].date.indexOf("2024") != -1 ){
								var n=res2.data[j].date.indexOf("-")
								if(res2.data[j].date.substr(n+1,2)=='01' ){
									 value241 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='02' ){
									 value242 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='03' ){
									 value243 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='04' ){
									 value244 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='05' ){
									 value245 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='06' ){
									 value246 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='07' ){
									 value247 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='08' ){
									 value248 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='09' ){
									 value249 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='10' ){
									 value2410 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='11' ){
									 value2411 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='12' ){
									 value2412 += Number(res2.data[j].num);
								 }
							}else if(res2.data[j].date.indexOf("2025") != -1 ){
								var n=res2.data[j].date.indexOf("-")
								if(res2.data[j].date.substr(n+1,2)=='01' ){
									 value251 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='02' ){
									 value252 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='03' ){
									 value253 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='04' ){
									 value254 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='05' ){
									 value255 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='06' ){
									 value256 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='07' ){
									 value257 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='08' ){
									 value258 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='09' ){
									 value259 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='10' ){
									 value2510 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='11' ){
									 value2511 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='12' ){
									 value2512 += Number(res2.data[j].num);
								 }
							}else if(res2.data[j].date.indexOf("2026") != -1 ){
								var n=res2.data[j].date.indexOf("-")
								if(res2.data[j].date.substr(n+1,2)=='01' ){
									 value261 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='02' ){
									 value262 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='03' ){
									 value263 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='04' ){
									 value264 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='05' ){
									 value265 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='06' ){
									 value266 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='07' ){
									 value267 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='08' ){
									 value268 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='09' ){
									 value269 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='10' ){
									 value2610 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='11' ){
									 value2611 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='12' ){
									 value2612 += Number(res2.data[j].num);
								 }
							}else if(res2.data[j].date.indexOf("2027") != -1 ){
								var n=res2.data[j].date.indexOf("-")
								if(res2.data[j].date.substr(n+1,2)=='01' ){
									 value271 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='02' ){
									 value272 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='03' ){
									 value273 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='04' ){
									 value274 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='05' ){
									 value275 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='06' ){
									 value276 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='07' ){
									 value277 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='08' ){
									 value278 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='09' ){
									 value279 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='10' ){
									 value2710 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='11' ){
									 value2711 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='12' ){
									 value2712 += Number(res2.data[j].num);
								 }
							}else if(res2.data[j].date.indexOf("2028") != -1 ){
								var n=res2.data[j].date.indexOf("-")
								if(res2.data[j].date.substr(n+1,2)=='01' ){
									 value281 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='02' ){
									 value282 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='03' ){
									 value283 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='04' ){
									 value284 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='05' ){
									 value285 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='06' ){
									 value286 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='07' ){
									 value287 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='08' ){
									 value288 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='09' ){
									 value289 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='10' ){
									 value2810 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='11' ){
									 value2811 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='12' ){
									 value2812 += Number(res2.data[j].num);
								 }
							}else if(res2.data[j].date.indexOf("2029") != -1 ){
								var n=res2.data[j].date.indexOf("-")
								if(res2.data[j].date.substr(n+1,2)=='01' ){
									 value291 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='02' ){
									 value292 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='03' ){
									 value293 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='04' ){
									 value294 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='05' ){
									 value295 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='06' ){
									 value296 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='07' ){
									 value297 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='08' ){
									 value298 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='09' ){
									 value299 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='10' ){
									 value2910 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='11' ){
									 value2911 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='12' ){
									 value2912 += Number(res2.data[j].num);
								 }
							}else if(res2.data[j].date.indexOf("2030") != -1 ){
								var n=res2.data[j].date.indexOf("-")
								if(res2.data[j].date.substr(n+1,2)=='01' ){
									 value301 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='02' ){
									 value302 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='03' ){
									 value303 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='04' ){
									 value304 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='05' ){
									 value305 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='06' ){
									 value306 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='07' ){
									 value307 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='08' ){
									 value308 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='09' ){
									 value309 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='10' ){
									 value3010 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='11' ){
									 value3011 += Number(res2.data[j].num);
								 }else if(res2.data[j].date.substr(n+1,2)=='12' ){
									 value3012 += Number(res2.data[j].num);
								 }
							}
						}
					   if(i == 0 ){fenlei122.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei123.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei124.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei125.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei126.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei127.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei128.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei129.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei130.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
									
									
					   } if(i == 1){fenlei222.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei223.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei224.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei225.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei226.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei227.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei228.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei229.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei230.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
					} if(i == 2){fenlei322.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei323.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei324.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei325.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei326.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei327.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei328.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei329.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei330.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
					} if(i == 3){fenlei422.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei423.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei424.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei425.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei426.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei427.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei428.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei429.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei430.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
					 } if(i == 4){fenlei522.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei523.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei524.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei525.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei526.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei527.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei528.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei529.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei530.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
					} if(i == 5){fenlei622.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei723.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei724.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei725.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei726.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei727.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei728.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei729.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei730.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
					  } if(i == 6){fenlei722.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei723.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei724.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei725.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei726.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei727.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei728.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei729.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei730.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
					} if(i == 7){fenlei822.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei823.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei824.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei825.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei826.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei827.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei828.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei829.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei830.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
					} if(i == 8){fenlei922.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei923.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei924.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei925.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei926.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei927.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei928.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei929.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei930.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
					} if(i == 9){fenlei1022.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei1023.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei1024.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei1025.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei1026.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei1027.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei1028.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei1029.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei1030.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
						} if(i == 10){fenlei1122.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei1123.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei1124.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei1125.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei1126.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei1127.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei1128.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei1129.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei1130.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
					}if(i == 11){fenlei1222.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei1223.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei1224.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei1225.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei1226.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei1227.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei1228.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei1229.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei1230.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
						}if(i == 12){fenlei1322.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei1323.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei1324.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei1325.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei1326.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei1327.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei1328.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei1329.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei1330.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
					}if(i == 13){fenlei1422.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei1423.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei1424.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei1425.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei1426.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei1427.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei1428.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei1429.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei1430.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
						}if(i == 14){fenlei1522.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei1523.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei124.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei1525.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei1526.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei1527.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei1528.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei1529.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei1530.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
						}if(i == 15){fenle1622.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei1623.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei1624.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei1625.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei1626.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei1627.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei1628.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei1629.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei1630.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
					}if(i == 16){fenlei1722.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei1723.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei1724.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei1725.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei1726.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei1727.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei1728.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei1729.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei1730.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
						}if(i == 17){fenlei1822.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei1823.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei1824.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei1825.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei1826.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei1827.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei1928.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei1929.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei1930.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
					}if(i == 18){fenlei1922.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei1923.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei1924.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei1925.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei1926.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei1927.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei1928.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei1929.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei1930.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
						}if(i == 19){fenlei2022.push(value221,value222,value223,value224,value225,value226,value227,value228,value229,value2210,value2211,value2212);
									fenlei2023.push(value231,value232,value233,value234,value235,value236,value237,value238,value239,value2310,value2311,value2312);
									fenlei2024.push(value241,value242,value243,value244,value245,value246,value247,value248,value249,value2410,value2411,value2412);
									fenlei2025.push(value251,value252,value253,value254,value255,value256,value257,value258,value259,value2510,value2511,value2512);
									fenlei2026.push(value261,value262,value263,value264,value265,value266,value267,value268,value269,value2610,value2611,value2612);
									fenlei2027.push(value271,value272,value273,value274,value275,value276,value277,value278,value279,value2710,value2711,value2712);
									fenlei2028.push(value281,value282,value283,value284,value285,value286,value287,value288,value289,value2810,value2811,value2812);
									fenlei2029.push(value291,value292,value293,value294,value295,value296,value297,value298,value299,value2910,value2911,value2912);
									fenlei2030.push(value301,value302,value303,value304,value305,value306,value307,value308,value309,value3010,value3011,value3012);
									}
						// console.log(value1,value12)
					   // console.log(fenlei122,fenlei123)
					}
					 // console.log('分类一',fenlei122)
					// console.log('分类2',fenlei222)
					  // console.log(barfenlei)
					  
					
					
					// prettier-ignore
					
					dataMap.data1 = dataFormatter({
					    2030: fenlei130,2029: fenlei129,2028: fenlei128,2027: fenlei127,2026: fenlei126,2025: fenlei125,2024: fenlei124,2023: fenlei123,2022: fenlei122,
					});dataMap.data2 = dataFormatter({
					    2030: fenlei230,2029: fenlei229,2028: fenlei228,2027: fenlei227,2026: fenlei226,2025: fenlei225,2024: fenlei224,2023: fenlei223,2022: fenlei222,
					});dataMap.data3 = dataFormatter({
					    2030: fenlei330,2029: fenlei329,2028: fenlei328,2027: fenlei327,2026: fenlei326,2025: fenlei325,2024: fenlei324,2023: fenlei323,2022: fenlei322,
					});dataMap.data4 = dataFormatter({
					    2030: fenlei430,2029: fenlei429,2028: fenlei428,2027: fenlei427,2026: fenlei426,2025: fenlei425,2024: fenlei424,2023: fenlei423,2022: fenlei422,
					});dataMap.data5 = dataFormatter({
					    2030: fenlei530,2029: fenlei529,2028: fenlei528,2027: fenlei527,2026: fenlei526,2025: fenlei525,2024: fenlei524,2023: fenlei523,2022: fenlei522,
					});dataMap.data6 = dataFormatter({
					    2030: fenlei630,2029: fenlei629,2028: fenlei628,2027: fenlei627,2026: fenlei626,2025: fenlei625,2024: fenlei624,2023: fenlei623,2022: fenlei622,
					});dataMap.data7 = dataFormatter({
					    2030: fenlei730,2029: fenlei729,2028: fenlei728,2027: fenlei727,2026: fenlei726,2025: fenlei725,2024: fenlei724,2023: fenlei723,2022: fenlei722,
					});dataMap.data8 = dataFormatter({
					    2030: fenlei830,2029: fenlei829,2028: fenlei828,2027: fenlei827,2026: fenlei826,2025: fenlei825,2024: fenlei824,2023: fenlei823,2022: fenlei822,
					});dataMap.data9 = dataFormatter({
					    2030: fenlei930,2029: fenlei929,2028: fenlei928,2027: fenlei927,2026: fenlei926,2025: fenlei925,2024: fenlei924,2023: fenlei923,2022: fenlei922,
					});dataMap.data10 = dataFormatter({
					    2030: fenlei1030,2029: fenlei1029,2028: fenlei1028,2027: fenlei1027,2026: fenlei1026,2025: fenlei1025,2024: fenlei1024,2023: fenlei1023,2022: fenlei1022,
					});dataMap.data11 = dataFormatter({
					    2030: fenlei1130,2029: fenlei1129,2028: fenlei1128,2027: fenlei1127,2026: fenlei1126,2025: fenlei1125,2024: fenlei1124,2023: fenlei1123,2022: fenlei1122,
					});dataMap.data12 = dataFormatter({
					    2030: fenlei1230,2029: fenlei1229,2028: fenlei1228,2027: fenlei1227,2026: fenlei1226,2025: fenlei1225,2024: fenlei1224,2023: fenlei1223,2022: fenlei1222,
					});dataMap.data13 = dataFormatter({
					    2030: fenlei1330,2029: fenlei1329,2028: fenlei1328,2027: fenlei1327,2026: fenlei1326,2025: fenlei1325,2024: fenlei1324,2023: fenlei1323,2022: fenlei1322,
					});dataMap.data14 = dataFormatter({
					    2030: fenlei1430,2029: fenlei1429,2028: fenlei1428,2027: fenlei1427,2026: fenlei1426,2025: fenlei1425,2024: fenlei1424,2023: fenlei1423,2022: fenlei1422,
					});dataMap.data15 = dataFormatter({
					    2030: fenlei1530,2029: fenlei1529,2028: fenlei1528,2027: fenlei1527,2026: fenlei1526,2025: fenlei1525,2024: fenlei1524,2023: fenlei1523,2022: fenlei1522,
					});dataMap.data16 = dataFormatter({
					    2030: fenlei1630,2029: fenlei1629,2028: fenlei1628,2027: fenlei1627,2026: fenlei1626,2025: fenlei1625,2024: fenlei1624,2023: fenlei1623,2022: fenlei1622,
					});dataMap.data17 = dataFormatter({
					    2030: fenlei1730,2029: fenlei1729,2028: fenlei1728,2027: fenlei1727,2026: fenlei1726,2025: fenlei1725,2024: fenlei1724,2023: fenlei1723,2022: fenlei1722,
					});dataMap.data18 = dataFormatter({
					    2030: fenlei1830,2029: fenlei1829,2028: fenlei1828,2027: fenlei1827,2026: fenlei1826,2025: fenlei1825,2024: fenlei1824,2023: fenlei1823,2022: fenlei1822,
					});dataMap.data19 = dataFormatter({
					    2030: fenlei1930,2029: fenlei1929,2028: fenlei1928,2027: fenlei1927,2026: fenlei1926,2025: fenlei1925,2024: fenlei1924,2023: fenlei1923,2022: fenlei1922,
					});dataMap.data20 = dataFormatter({
					    2030: fenlei2030,2029: fenlei2029,2028: fenlei2028,2027: fenlei2027,2026: fenlei2026,2025: fenlei2025,2024: fenlei2024,2023: fenlei2023,2022: fenlei2022,
					});										
					// console.log(dataMap.data1[0])
					// console.log(dataMap.data20)
					var femlei2022=[];var femlei2023=[];var femlei2024=[];var femlei2025=[];var femlei2026=[];var femlei2027=[];var femlei2028=[];var femlei2029=[];var femlei2030=[];
					// for (var m = 0; m <= res.data.length; m++) {
						// const Data =  'data'+m
						// { data: dataMap.data1['2022'] },
						  // femlei2022.push({data: dataMap.data1['2022']})
						// console.log(m)
						var m= res.data.length;
						if(m>=1){
							  femlei2022.push({data: dataMap.data1['2022']})
							  femlei2023.push({data: dataMap.data1['2023']})
							  femlei2024.push({data: dataMap.data1['2024']})
							  femlei2025.push({data: dataMap.data1['2025']})
							  femlei2026.push({data: dataMap.data1['2026']})
							  femlei2027.push({data: dataMap.data1['2027']})
							  femlei2028.push({data: dataMap.data1['2028']})
							  femlei2029.push({data: dataMap.data1['2029']})
							  femlei2030.push({data: dataMap.data1['2030']})
						} if (m>=2){
							femlei2022.push({data: dataMap.data2['2022']})
							femlei2023.push({data: dataMap.data2['2023']})
							femlei2024.push({data: dataMap.data2['2024']})
							femlei2025.push({data: dataMap.data2['2025']})
							femlei2026.push({data: dataMap.data2['2026']})
							femlei2027.push({data: dataMap.data2['2027']})
							femlei2028.push({data: dataMap.data2['2028']})
							femlei2029.push({data: dataMap.data2['2029']})
							femlei2030.push({data: dataMap.data2['2030']})
						}  if (m>=3){
							femlei2022.push({data: dataMap.data3['2022']})
							femlei2023.push({data: dataMap.data3['2023']})
							femlei2024.push({data: dataMap.data3['2024']})
							femlei2025.push({data: dataMap.data3['2025']})
							femlei2026.push({data: dataMap.data3['2026']})
							femlei2027.push({data: dataMap.data3['2027']})
							femlei2028.push({data: dataMap.data3['2028']})
							femlei2029.push({data: dataMap.data3['2029']})
							femlei2030.push({data: dataMap.data3['2030']})
						}  if (m>=4){
							femlei2022.push({data: dataMap.data4['2022']})
							femlei2023.push({data: dataMap.data4['2023']})
							femlei2024.push({data: dataMap.data4['2024']})
							femlei2025.push({data: dataMap.data4['2025']})
							femlei2026.push({data: dataMap.data4['2026']})
							femlei2027.push({data: dataMap.data4['2027']})
							femlei2028.push({data: dataMap.data4['2028']})
							femlei2029.push({data: dataMap.data4['2029']})
							femlei2030.push({data: dataMap.data4['2030']})
						}  if (m>=5){
							femlei2022.push({data: dataMap.data5['2022']})
							femlei2023.push({data: dataMap.data5['2023']})
							femlei2024.push({data: dataMap.data5['2024']})
							femlei2025.push({data: dataMap.data5['2025']})
							femlei2026.push({data: dataMap.data5['2026']})
							femlei2027.push({data: dataMap.data5['2027']})
							femlei2028.push({data: dataMap.data5['2028']})
							femlei2029.push({data: dataMap.data5['2029']})
							femlei2030.push({data: dataMap.data5['2030']})
						}  if (m>=6){
							femlei2022.push({data: dataMap.data6['2022']})
							femlei2023.push({data: dataMap.data6['2023']})
							femlei2024.push({data: dataMap.data6['2024']})
							femlei2025.push({data: dataMap.data6['2025']})
							femlei2026.push({data: dataMap.data6['2026']})
							femlei2027.push({data: dataMap.data6['2027']})
							femlei2028.push({data: dataMap.data6['2028']})
							femlei2029.push({data: dataMap.data6['2029']})
							femlei2030.push({data: dataMap.data6['2030']})
						}  if (m>=7){
							femlei2022.push({data: dataMap.data7['2022']})
							femlei2023.push({data: dataMap.data7['2023']})
							femlei2024.push({data: dataMap.data7['2024']})
							femlei2025.push({data: dataMap.data7['2025']})
							femlei2026.push({data: dataMap.data7['2026']})
							femlei2027.push({data: dataMap.data7['2027']})
							femlei2028.push({data: dataMap.data7['2028']})
							femlei2029.push({data: dataMap.data7['2029']})
							femlei2030.push({data: dataMap.data7['2030']})
						}  if (m>=8){
							femlei2022.push({data: dataMap.data8['2022']})
							femlei2023.push({data: dataMap.data8['2023']})
							femlei2024.push({data: dataMap.data8['2024']})
							femlei2025.push({data: dataMap.data8['2025']})
							femlei2026.push({data: dataMap.data8['2026']})
							femlei2027.push({data: dataMap.data8['2027']})
							femlei2028.push({data: dataMap.data8['2028']})
							femlei2029.push({data: dataMap.data8['2029']})
							femlei2030.push({data: dataMap.data8['2030']})
						}  if (m>=9){
							femlei2022.push({data: dataMap.data9['2022']})
							femlei2023.push({data: dataMap.data9['2023']})
							femlei2024.push({data: dataMap.data9['2024']})
							femlei2025.push({data: dataMap.data9['2025']})
							femlei2026.push({data: dataMap.data9['2026']})
							femlei2027.push({data: dataMap.data9['2027']})
							femlei2028.push({data: dataMap.data9['2028']})
							femlei2029.push({data: dataMap.data9['2029']})
							femlei2030.push({data: dataMap.data9['2030']})
						}  if (m>=90){
							femlei2022.push({data: dataMap.data10['2022']})
							femlei2023.push({data: dataMap.data10['2023']})
							femlei2024.push({data: dataMap.data10['2024']})
							femlei2025.push({data: dataMap.data10['2025']})
							femlei2026.push({data: dataMap.data10['2026']})
							femlei2027.push({data: dataMap.data10['2027']})
							femlei2028.push({data: dataMap.data10['2028']})
							femlei2029.push({data: dataMap.data10['2029']})
							femlei2030.push({data: dataMap.data10['2030']})
						}  if (m>=11){
							femlei2022.push({data: dataMap.data11['2022']})
							femlei2023.push({data: dataMap.data11['2023']})
							femlei2024.push({data: dataMap.data11['2024']})
							femlei2025.push({data: dataMap.data11['2025']})
							femlei2026.push({data: dataMap.data11['2026']})
							femlei2027.push({data: dataMap.data11['2027']})
							femlei2028.push({data: dataMap.data11['2028']})
							femlei2029.push({data: dataMap.data11['2029']})
							femlei2030.push({data: dataMap.data11['2030']})
						}  if (m>=12){
							femlei2022.push({data: dataMap.data12['2022']})
							femlei2023.push({data: dataMap.data12['2023']})
							femlei2024.push({data: dataMap.data12['2024']})
							femlei2025.push({data: dataMap.data12['2025']})
							femlei2026.push({data: dataMap.data12['2026']})
							femlei2027.push({data: dataMap.data12['2027']})
							femlei2028.push({data: dataMap.data12['2028']})
							femlei2029.push({data: dataMap.data12['2029']})
							femlei2030.push({data: dataMap.data12['2030']})
						}  if (m>=13){
							femlei2022.push({data: dataMap.data13['2022']})
							femlei2023.push({data: dataMap.data13['2023']})
							femlei2024.push({data: dataMap.data13['2024']})
							femlei2025.push({data: dataMap.data13['2025']})
							femlei2026.push({data: dataMap.data13['2026']})
							femlei2027.push({data: dataMap.data13['2027']})
							femlei2028.push({data: dataMap.data13['2028']})
							femlei2029.push({data: dataMap.data13['2029']})
							femlei2030.push({data: dataMap.data13['2030']})
						}  if (m>=14){
							femlei2022.push({data: dataMap.data14['2022']})
							femlei2023.push({data: dataMap.data14['2023']})
							femlei2024.push({data: dataMap.data14['2024']})
							femlei2025.push({data: dataMap.data14['2025']})
							femlei2026.push({data: dataMap.data14['2026']})
							femlei2027.push({data: dataMap.data14['2027']})
							femlei2028.push({data: dataMap.data14['2028']})
							femlei2029.push({data: dataMap.data14['2029']})
							femlei2030.push({data: dataMap.data14['2030']})
						}  if (m>=15){
							femlei2022.push({data: dataMap.data15['2022']})
							femlei2023.push({data: dataMap.data15['2023']})
							femlei2024.push({data: dataMap.data15['2024']})
							femlei2025.push({data: dataMap.data15['2025']})
							femlei2026.push({data: dataMap.data15['2026']})
							femlei2027.push({data: dataMap.data15['2027']})
							femlei2028.push({data: dataMap.data15['2028']})
							femlei2029.push({data: dataMap.data15['2029']})
							femlei2030.push({data: dataMap.data15['2030']})
						}  if (m>=16){
							femlei2022.push({data: dataMap.data16['2022']})
							femlei2023.push({data: dataMap.data16['2023']})
							femlei2024.push({data: dataMap.data16['2024']})
							femlei2025.push({data: dataMap.data16['2025']})
							femlei2026.push({data: dataMap.data16['2026']})
							femlei2027.push({data: dataMap.data16['2027']})
							femlei2028.push({data: dataMap.data16['2028']})
							femlei2029.push({data: dataMap.data16['2029']})
							femlei2030.push({data: dataMap.data16['2030']})
						}  if (m>=17){
							femlei2022.push({data: dataMap.data17['2022']})
							femlei2023.push({data: dataMap.data17['2023']})
							femlei2024.push({data: dataMap.data17['2024']})
							femlei2025.push({data: dataMap.data17['2025']})
							femlei2026.push({data: dataMap.data17['2026']})
							femlei2027.push({data: dataMap.data17['2027']})
							femlei2028.push({data: dataMap.data17['2028']})
							femlei2029.push({data: dataMap.data17['2029']})
							femlei2030.push({data: dataMap.data17['2030']})
						}  if (m>=18){
							femlei2022.push({data: dataMap.data18['2022']})
							femlei2023.push({data: dataMap.data18['2023']})
							femlei2024.push({data: dataMap.data18['2024']})
							femlei2025.push({data: dataMap.data18['2025']})
							femlei2026.push({data: dataMap.data18['2026']})
							femlei2027.push({data: dataMap.data18['2027']})
							femlei2028.push({data: dataMap.data18['2028']})
							femlei2029.push({data: dataMap.data18['2029']})
							femlei2030.push({data: dataMap.data18['2030']})
						}  if (m>=19){
							femlei2022.push({data: dataMap.data19['2022']})
							femlei2023.push({data: dataMap.data19['2023']})
							femlei2024.push({data: dataMap.data19['2024']})
							femlei2025.push({data: dataMap.data19['2025']})
							femlei2026.push({data: dataMap.data19['2026']})
							femlei2027.push({data: dataMap.data19['2027']})
							femlei2028.push({data: dataMap.data19['2028']})
							femlei2029.push({data: dataMap.data19['2029']})
							femlei2030.push({data: dataMap.data19['2030']})
						}  if (m>=20){
							femlei2022.push({data: dataMap.data20['2022']})
							femlei2023.push({data: dataMap.data20['2023']})
							femlei2024.push({data: dataMap.data20['2024']})
							femlei2025.push({data: dataMap.data20['2025']})
							femlei2026.push({data: dataMap.data20['2026']})
							femlei2027.push({data: dataMap.data20['2027']})
							femlei2028.push({data: dataMap.data20['2028']})
							femlei2029.push({data: dataMap.data20['2029']})
							femlei2030.push({data: dataMap.data20['2030']})
						}
						// console.log(femlei2022)
					// }
					
					
					option = {
					  baseOption: {
					    timeline: {
					      axisType: 'category',
					      // realtime: false,
					      // loop: false,
					      autoPlay: false,
					      // currentIndex: 2,
					      playInterval: 1000,
					      // controlStyle: {
					      //     position: 'left'
					      // },
					      data: [
					        '2022-01-01',
					        '2023-01-01',
					        '2024-01-01',
					        '2025-01-01',
					        '2026-01-01',
					        '2027-01-01',
					        '2028-01-01',
					        '2029-01-01',
					        '2030-01-01',
					      ],
					      label: {
					        formatter: function (s) {
					          return new Date(s).getFullYear();
					        }
					      }
					    },
					    title: {
					      subtext: '数据来自已确认销售的商品'
					    },
					    tooltip: {},
					    legend: {
					      left: 'right',
					      data: zongfenlei,
					      // selected: {
					      //   GDP: false,
					      //   金融: false,
					      //   房地产: false
					      // }
					    },
					    calculable: true,
					    grid: {
					      top: 80,
					      bottom: 100,
					      tooltip: {
					        trigger: 'axis',
					        axisPointer: {
					          type: 'shadow',
					          label: {
					            show: true,
					            formatter: function (params) {
					              return params.value.replace('\n', '');
					            }
					          }
					        }
					      }
					    },
					    xAxis: [
					      {
					        type: 'category',
					        axisLabel: { interval: 0 },
					        data: [
					          '一月',
					          '\n二月',
					          '三月',
					          '\n四月',
					          '五月',
					          '\n六月',
					          '七月',
					          '\n八月',
					          '九月',
							  '\n十月',
							  '十一月',
							  '\n十二月',
					        ],
					        splitLine: { show: false }
					      }
					    ],
					    yAxis: [
					      {
					        type: 'value',
					        name: '数量（台）'
					      }
					    ],
					    series: barfenlei,
						
					  },
					  options: [
					    {
					      title: { text: '2022销量情况' },
					      series: femlei2022
					    },
					    {
					      title: { text: '2023销售情况' },
					      series: femlei2023
					    },
					    {
					      title: { text: '2024销售情况' },
					      series: femlei2024
					    },
					    {
					      title: { text: '2025销售情况' },
					      series: femlei2025
					    },
					    {
					      title: { text: '2026销售情况' },
					      series: femlei2026
					    },{
					      title: { text: '2027销售情况' },
					      series: femlei2027
					    },{
					      title: { text: '2028销售情况' },
					      series: femlei2028
					    },{
					      title: { text: '2029销售情况' },
					      series: femlei2029
					    },{
					      title: { text: '2030销售情况' },
					      series: femlei2030
					    },
					    
					  ]
					};
				option && myChart.setOption(option);
			} else if (this.index ==2) {
				this.xioashoue()
				
			}},
		async xioashoue(){
			
					/*
					1.遍历chanpinname
					 2.根据chanpinname 便利销售列表
						for（）{
							if 判断是是否是2022年
								if 判断月份
									for（）{
										 if 月份数组下有几个数值，多于两个遍历 价格相加 push
										 else {
											 直接push
										 }
									}
						}
					 */
					let data1=[];let data2=[];let data3=[];let data4=[];let data5=[];let data6=[];let data7=[];let data8=[];let data9=[];let data10=[];let data11=[];let data12=[];let data13=[];let data14=[];let data15=[];let data16=[];let data17=[];let data18=[];let data19=[];let data20=[];
					var jiage1=0;var jiage2=0;var jiage3=0;var jiage4=0;var jiage5=0;var jiage6=0;var jiage7=0;var jiage8=0;var jiage9=0;var jiage10=0;var jiage11=0;var jiage12=0;
					const res = await this.$http.get('rest/Partchanpin');
					
					for (var i = 0; i < res.data.length; i++) {
						var chanpinname = res.data[i].chanpinName;
						let res2 = await this.$http.get(`rest/Exsalechanpin/xiaoshou/${chanpinname}`);
						jiage1=0;  jiage2=0;  jiage3=0;  jiage4=0;  jiage5=0;  jiage6=0;  jiage7=0;  jiage8=0;  jiage9=0;  jiage10=0;  jiage11=0;  jiage12=0;
						
							for(var j=0 ; j<res2.data.length;j++){
								// console.log(res2.data[0])
								var san = '2023'
								  if(res2.data[j].date.indexOf(this.value) != -1  ){
									  // console.log(res2.data[j])
									  var n=res2.data[j].date.indexOf("-")
									  if(res2.data[j].date.substr(n+1,2)=='01' ){
									  	  jiage1 += Number(res2.data[j].jiage)
									   }else if(res2.data[j].date.substr(n+1,2)=='02' ){
									  	  jiage2 += Number(res2.data[j].jiage)
									   }else if(res2.data[j].date.substr(n+1,2)=='03' ){
										    jiage3 += Number(res2.data[j].jiage)
									   }else if(res2.data[j].date.substr(n+1,2)=='04' ){
										    jiage4 += Number(res2.data[j].jiage)
									   }else if(res2.data[j].date.substr(n+1,2)=='05' ){
										    jiage5 += Number(res2.data[j].jiage)
									   }else if(res2.data[j].date.substr(n+1,2)=='06' ){
										    jiage6 += Number(res2.data[j].jiage)
									   }else if(res2.data[j].date.substr(n+1,2)=='07' ){
										    jiage7 += Number(res2.data[j].jiage)
									   }else if(res2.data[j].date.substr(n+1,2)=='08' ){
										    jiage8 += Number(res2.data[j].jiage)
									   }else if(res2.data[j].date.substr(n+1,2)=='09' ){
										    jiage9 += Number(res2.data[j].jiage)
									   }else if(res2.data[j].date.substr(n+1,2)=='10' ){
										    jiage10 += Number(res2.data[j].jiage)
									   }else if(res2.data[j].date.substr(n+1,2)=='11' ){
										    jiage11 += Number(res2.data[j].jiage)
									   }else if(res2.data[j].date.substr(n+1,2)=='12' ){
										    jiage12 += Number(res2.data[j].jiage)
									   }
								  }
								  
								 
						}
						if(i==0){
							data1.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}else if(i==0){
						 	data2.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						 }else if(i==2){
							data3.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}else if(i==3){
							data4.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}else if(i==4){
							data5.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}else if(i==5){
							data6.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}else if(i==6){
							data7.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}else if(i==7){
							data8.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}else if(i==8){
							data9.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}else if(i==9){
							data10.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}else if(i==10){
							data11.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}else if(i==11){
							data12.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}else if(i==12){
							data13.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}else if(i==13){
							data14.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}else if(i==14){
							data15.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}else if(i==15){
							data16.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}else if(i==16){
							data17.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}else  if(i==17){
							data18.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}else if(i==18){
							data19.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}else if(i==19){
							data20.push(chanpinname,jiage1,jiage2,jiage3,jiage4,jiage5,jiage6,jiage7,jiage8,jiage9,jiage10,jiage11,jiage12)
						}
						
						
						   // console.log(i,data1)
					var myChart = this.$echarts.init(document.getElementById('xiaoshoue'));
					setTimeout(function () {
					  let option = {
					    legend: {},
					    tooltip: {
					      trigger: 'axis',
					      showContent: false
					    },
					    dataset: {
					      source: [
					        ['product', '一月', '二月', '三月', '四月', '五月', '六月','七月','八月','九月','十月','十一月','十二月'],
					       data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11,data12,data13,data14,data15,data16,data17,data18,data19,data20
					      ]
					    },
					    xAxis: { type: 'category' },
					    yAxis: { gridIndex: 0 },
					    grid: { top: '55%' },
					    series: [
					      {
					        type: 'line',
					        smooth: true,
					        seriesLayoutBy: 'row',
					        emphasis: { focus: 'series' }
					      },
					      {
					        type: 'line',
					        smooth: true,
					        seriesLayoutBy: 'row',
					        emphasis: { focus: 'series' }
					      },
					      {
					        type: 'line',
					        smooth: true,
					        seriesLayoutBy: 'row',
					        emphasis: { focus: 'series' }
					      },
					      {
					        type: 'line',
					        smooth: true,
					        seriesLayoutBy: 'row',
					        emphasis: { focus: 'series' }
					      },
					      {
					        type: 'pie',
					        id: 'pie',
					        radius: '30%',
					        center: ['50%', '25%'],
					        emphasis: {
					          focus: 'self'
					        },
					        label: {
					          formatter: '{b}: {@2012} ({d}%)'
					        },
					        encode: {
					          itemName: 'product',
					          value: '2022',
					          tooltip: '2022'
					        }
					      }
					    ]
					  };
					  myChart.on('updateAxisPointer', function (event) {
					    const xAxisInfo = event.axesInfo[0];
					    if (xAxisInfo) {
					      const dimension = xAxisInfo.value + 1;
					      myChart.setOption({
					        series: {
					          id: 'pie',
					          label: {
					            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
					          },
					          encode: {
					            value: dimension,
					            tooltip: dimension
					          }
					        }
					      });
					    }
					  });
					  myChart.setOption(option);
					});
				}
			
		},
		dianji(row, column, event) {
			this.$router.push(`/exSale/results/${row._id}`);
		},
		async fetch() {
			const res = await this.$http.get('rest/Exsalechanpin');
			this.items = res.data;
		},
		async remove(row) {
			if (window.localStorage.shenfen == '管理员') {
				this.$confirm(`是否删除"${row.applicant}"的申请？`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(async () => {
						if (this.index == 1) {
							const res = await this.$http.delete(`rest/Exsalewuliao/${row._id}`);
							await this.$http.get('rest/Exsalewuliaos');
						} else if (this.index == 0) {
							const res = await this.$http.delete(`rest/Exsalechanpin/${row._id}`);
							await this.$http.get('rest/Exsalechanpin');
						}
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						//更新数据
						this.fetch();
					})
					.catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
			} else {
				const h = this.$createElement;
				this.$notify({
					title: '提示',
					message: h('i', { style: 'color: teal' }, '请以管理员身份登录！')
				});
			}
		},

		async xiaoshou() {
			var value = 0;
			const res = await this.$http.get('rest/Partchanpin');
			for (var i = 0; i < res.data.length; i++) {
				var chanpinname = res.data[i].chanpinName;
				let res2 = await this.$http.get(`rest/Exsalechanpin/xiaoshou/${chanpinname}`);
				  // console.log(res2.data)
				if (res2.data.length > 1) {
					// console.log('bushi1',res2.data.length)
					for (var j = 0; j < res2.data.length; j++) {
						value += Number(res2.data[j].num);
					}
					this.xiaoshoulist.push({ value: value, name: res.data[i].chanpinName });
					value = 0
				} else if (res2.data.length == 1) {
					this.xiaoshoulist.push({ value: Number(res2.data[0].num), name: res.data[i].chanpinName });
				}
			}
			 // console.log(this.xiaoshoulist);
		}
	},
	created() {
		
		this.fetch();
		this.xiaoshou();
	},
	mounted() {
		if(this.$route.query.index != undefined){
			this.activeName=this.$route.query.index
			this.handleClick()
		}
	}
};
</script>

<style>
.el-button--danger {
	background-color: #f04936;
}
.el-main {
    overflow-y: scroll !important;
}
.nianfenxuanze{
	width: 150px;
}
</style>
