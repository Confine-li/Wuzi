<template>
	<div style="width: 100%; height: 100%; ">
		<div class="index" style="width:100% ;height: 100%;margin: 0 atuo; display: flex; flex-direction:column;align-items:center;">
			<div style="display: flex; align-items: center; justify-content: center;flex: 1" >
				<div @click="$router.push('/purchase/create')"  class="caigou" style="width: 100px;height: 100px;">
					<img src="../assets/购物车@1x.png" style="height: 100px;"><p calss="biaoqian" style="text-align: center;font-family: KaiTi;">采购</p>
				</div>
				<div>
					<img src="../assets/箭头3(2).png" style="width: 50px;margin: 0 70px 0 70px;"/>
				</div>
				<div class="jianyan" @click="$router.push('/testList')" style="">
					<img src="../assets/仓库存货.png" style="height: 100px;"><p calss="biaoqian"style="text-align: center; font-family: KaiTi;">检验</p>
				</div>
				<div>
					<img src="../assets/箭头3(2).png" style="width: 50px;margin: 0 70px 0 70px;"/>
				</div>
				<div class="ruku"  @click="$router.push('/test/create')">
					<img src="../assets/发货包裹.png" style="height: 100px;"><p calss="biaoqian"style="text-align: center;font-family: KaiTi;">入库</p>
				</div>
				<div>
					<img src="../assets/箭头3(2).png" style="width: 50px;margin: 0 70px 0 70px;"/>
				</div>
				<div class="仓库"  @click="$router.push('/chanpin/list')">
					<img src="../assets/智能仓库管理系统.png" style="height: 100px;"><p calss="biaoqian" style="text-align: center;font-family: KaiTi;">产品仓库</p>
				</div>
			</div>
			<div style="display: flex ; align-items: center; justify-content: center; flex: 1">
				<div class="外借"   @click="$router.push('/ExWarehouse')">
					<img src="../assets/维修@1x.png" style="height: 100px;"><p calss="biaoqian" style="text-align: center;font-family: KaiTi;">外借</p>
				</div>
				<div class="销售"  @click="$router.push('/ExSale')"  style="margin: 0 160px 0 160px;">
					<img src="../assets/卖点.png" style="height: 100px;"><p calss="biaoqian" style="text-align: center;font-family: KaiTi;">销售</p>
				</div>
				<div class="外借"  @click="$router.push('/OutOfStock')"  >
					<img src="../assets/仓库叉车.png" style="height: 100px;"><p calss="biaoqian" style="text-align: center;font-family: KaiTi;">出库</p>
				</div>
				
			</div>
			<div style="display: flex;align-items: center; justify-content: center;flex: 1" >
				<div class="加班"  @click="$router.push('/workOvertime/list')">
					<img src="../assets/工作.png" style="height: 100px;"><p calss="biaoqian" style="text-align: center;font-family: KaiTi;">加班</p>
				</div>
				<div class="分析"  @click="$router.push({path:'/ExSale', query: {index:'second'}})"  style="margin: 0 160px 0 160px;">
					<img src="../assets/数据分析.png" style="height: 100px;"><p calss="biaoqian" style="text-align: center;font-family: KaiTi;">分析</p>
				</div>
				<div class="分析"  @click="$router.push('/chanpin/list')">
					<img src="../assets/查询.png" style="height: 100px;"><p calss="biaoqian" style="text-align: center;font-family: KaiTi;">查询</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style>
	.biaoqian{
		text-align: center;
	}
</style>
