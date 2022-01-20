//1.引入axios
import axios from 'axios'
import Vue from 'vue'

//2.创建axios实例
const http = axios.create({
	baseURL:'http://localhost:3000/admin/api'
})

//响应拦截
http.interceptors.response.use(res=>{
	return res
},err=>{
	console.log(err.response)
	if(err.response.data.message){
		Vue.prototype.$message({
			type:'error',
			message:err.response.data.message
		})
		if(err.response.status === 401){
			router.push('/login')
		}
	}
	return Promise.reject(err)
})


//3.导出http

export default http