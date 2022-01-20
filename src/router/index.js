import Vue from 'vue'
import VueRouter from 'vue-router'

//解决点击同一个路由，就报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

//懒加载
const Main = ()=>import('../views/Main')

const Index = ()=>import('../views/index')
const PurchaseEdit = ()=>import('../views/purchase/PurchaseEdit')
const PurchaseList = ()=>import('../views/purchase/PurchaseList')
const PurchaseResults = ()=>import('../views/purchase/PurchaseResults')
const TestList = ()=>import('../views/putInStorage/TestList')
const TestEdit = ()=>import('../views/putInStorage/TestEdit')
const TestResults = ()=>import('../views/putInStorage/TestResults')
// const Consumable = ()=>import('../views/stock/Consumable')
const Equipment = ()=>import('../views/stock/IProductComponents/Equipment')
// const ConsumableStock = ()=>import('../views/stock/ConsumableStock')
const EquipmentStock = ()=>import('../views/stock/IProductComponents/EquipmentStock')
const StaffList = ()=>import('../views/staff/StaffList')
const WorkOvertime = ()=>import('../views/staff/WorkOvertimeList')
const WorkOvertimeEdit = ()=>import('../views/staff/WorkOvertimeEdit')
const WorkOvertimeResults = ()=>import('../views/staff/WorkOvertimeResults')
const OutOfStockEdit = ()=>import('../views/exWarehouse/OutOfStock/OutOfStockEdit')
const OutOfStockList = ()=>import('../views/exWarehouse/OutOfStock/OutOfStockList')
const OutOfStockResults = ()=>import('../views/exWarehouse/OutOfStock/OutOfStockResults')
const Chanpin = ()=>import('../views/stock/FProductComponents/Chanpin')
const ChanpinStock = ()=>import('../views/stock/FProductComponents/ChanpinStock')
const Qita = ()=>import('../views/stock/Qita/Qita')
const QitaStock = ()=>import('../views/stock/Qita/QitaStock')
const Shebei = ()=>import('../views/stock/Shebei/Shebei')
const ShebeiStock = ()=>import('../views/stock/Shebei/ShebeiStock')
const OutOfStock = ()=>import('../views/exWarehouse/OutOfStock/OutOfStockList')
const ExSale = ()=>import('../views/exWarehouse/ExSaleComponents/ExSaleList')
const ExSaleEdit = ()=>import('../views/exWarehouse/ExSaleComponents/ExSaleEdit')
const ExSaleResults = ()=>import('../views/exWarehouse/ExSaleComponents/ExSaleResults')
const ExWarehouse = ()=>import('../views/exWarehouse/ExWarehouseComponents/ExWarehouseList')
const ExWarehouseEdit = ()=>import('../views/exWarehouse/ExWarehouseComponents/ExWarehouseEdit')
const ExWarehouseResults = ()=>import('../views/exWarehouse/ExWarehouseComponents/ExWarehouseResults')

const Login =()=>import('../views/Login')

const routes = [
	{
		path:'/login',
		name:'Login',
		component:Login,
		meta:{isPublic:true}
	},
  {
    path: '/',
    name: 'Main',
    component: Main,
	children:[
		  {path:'/',component:Index},
		{path:'/purchase/create',component:PurchaseEdit},
		{path:'/purchase/results/:id',component:PurchaseResults,props:true},//复用,编辑页面
		{path:'/purchase/list',component:PurchaseList},
		{path:'/testList/',component:TestList},//复用,编辑页面
		{path:'/testResults/results/:id',component:TestResults,props:true},
		{path:'/test/create',component:TestEdit},
		{path:'/equipment/list',component:Equipment},
		{path:'/equipmentStock/:id',component:EquipmentStock,props:true},
		{path:'/staff/list',component:StaffList},
		{path:'/exWarehouse/create',component:ExWarehouseEdit},
		{path:'/exWarehouse/results/:id',component:ExWarehouseResults,props:true},
		 {path:'/ExWarehouse',component:ExWarehouse},
		{path:'/exSale/create',component:ExSaleEdit},
		{path:'/ExSale',component:ExSale},
		{path:'/exSale/results/:id',component:ExSaleResults,props:true},
		{path:'/workOvertime/list',component:WorkOvertime},
		{path:'/workOvertime/create',component:WorkOvertimeEdit},
		{path:'/workOvertime/results/:id',component:WorkOvertimeResults,props:true},
		{path:'/outOfStock/create',component:OutOfStockEdit},
		{path:'/outOfStock',component:OutOfStock},
		{path:'/outOfStock/results/:id',component:OutOfStockResults,props:true},
		{path:'/chanpin/list',component:Chanpin},
		{path:'/chanpin/:id',component:ChanpinStock,props:true},
		{path:'/qita/list',component:Qita},
		{path:'/qita/:id',component:QitaStock,props:true},
		{path:'/shebei/list',component:Shebei},
		{path:'/shebei/:id',component:ShebeiStock,props:true},
		
	]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
	console.log('to',to)
	if(!to.meta.isPublic && !localStorage.token){
		return next('/login')
	}
	next()
})

export default router
