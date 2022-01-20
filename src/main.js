import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
import http from './http'

Vue.config.productionTip = false

// 用户名
let username='';
export{username}

// Vue.mixin({
// 	methods:{
// 		getAuthHeader(){
// 			return{
// 				Authorization:`Bearer ${localStorage.token || ''}s`
// 			}
// 		}
// 	}
// })

Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
