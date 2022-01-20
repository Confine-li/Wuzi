/* 
商品详情模块 
 */

import request from '@/utils/request.js'

 
 //轮播图
 export const getItemDetails = id =>{
	 return request({
		 method:'GET',
		 url:`rest/goods/${id}`
	 })
 }
 
 
 //关注品牌
 export const addFollow = data =>{
	 return request({
		 method:'POST',
		 url:'/follow',
		 data
	 })
 }
 
 //删除关注
 export const deleteFollow = data =>{
 	 return request({
 		 method:'POST',
 		 url:'/noFollow',
 		 data
 	 })
 }
 
 
 // 加入购物车
 export const addToCartList = data =>{
 	 return request({
 		 method:'POST',
 		 url:'/addToCartList',
 		 data
 	 })
 }
 // 移除购物车
 export const removeToCartList = data =>{
 	 return request({
 		 method:'POST',
 		 url:'/removeToCartList',
 		 data
 	 })
 }
 
 
 //获取购物车列表
 export const getCartList = username =>{
 	return request({
 		method:'GET',
 		url:'/addToCartList',
 		params:{
  			username
  		}
  	})
  }
 
 
 
 // 加入订单
 export const addToCartOrder = data =>{
 	 return request({
 		 method:'POST',
 		 url:'/addToCartOrder',
 		 data
 	 })
 }
 
 /* //加入购物车addToCartList
  export const addToCartList = data =>{
  	return request({
  		method:'POST',
  		url:'/addToCartList',
  		data
   	})
   }
   
  //获取购物车列表
  export const getCartList = username =>{
  	return request({
  		method:'GET',
  		url:'/addToCartList',
  		params:{
 			username
 		}
   	})
   } */