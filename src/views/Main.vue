<template>
  <el-container  style="height: 100vh;">
	  
    <el-aside width="200px" >
		<div calss="logo"
				style="  color: white;width: 200px; height: 100px; background-color: #343843; position: absolute;"
				  @click="$router.push('/')">
					<img src="../assets/图片1.png"  class="logo-img"/>
					<p class="logo-p">物资管理系统</p>
				</div>
      <el-menu  style="top: 100px;" router :default-active="$router.path">  
	  <!-- :default-openeds="['1', '1']" -->
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-goods" style="margin: 4px; color: white;"></i>采购</template>
          <el-menu-item-group>
            <el-menu-item  index="/purchase/create">采购申请</el-menu-item>
            <el-menu-item  index="/purchase/list">申请记录</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><span class="iconfont icon-xinruku" style="margin: 7px;"></span>入库</template>
          <el-menu-item-group>
			  <!-- <el-menu-item index="/testList">入库</el-menu-item> -->
			  <el-menu-item index="/test/create">入库</el-menu-item>
            <el-menu-item index="/testList">入库列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><span class="iconfont icon-xinchuku"  style="margin: 7px;"></span>出库</template>
         <el-menu-item-group>
             <el-menu-item index="/ExWarehouse">外借</el-menu-item>
			 <el-menu-item index="/ExSale">销售</el-menu-item>
			  <el-menu-item index="/OutOfStock">出库</el-menu-item>
          </el-menu-item-group>
		</el-submenu>
		<el-submenu index="4">
		  <template slot="title"><span class="iconfont icon-chukuguanli"  style="margin: 7px;"></span>仓库</template>
		  <el-menu-item-group>
			  <el-menu-item  index="/chanpin/list">产品</el-menu-item>
			  <el-menu-item  index="/equipment/list">物料</el-menu-item>
			  <el-menu-item  index="/shebei/list">设备</el-menu-item>
			    <el-menu-item  index="/qita/list">其他</el-menu-item>
		  </el-menu-item-group>
		</el-submenu>
		<el-submenu index="5">
		  <template slot="title"><span class="el-icon-user" ></span>人员管理</template>
		  <el-menu-item-group>
		    <!-- <el-menu-item @click='toPurchaseCreate()'>管理员</el-menu-item> -->
		    <el-menu-item index="/staff/list">员工</el-menu-item>
			<el-menu-item index="/workOvertime/list">加班记录</el-menu-item>
		  </el-menu-item-group>
		</el-submenu>
      </el-menu>
    </el-aside>

      <el-container >
        <el-header style="width: 100%; height: 60px;text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-s-custom" style="margin-right: 10px;color: white;"></i>
            <el-dropdown-menu slot="dropdown">
				<el-dropdown-item >
					
					<span @click="outlogin()">退出</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="color: white" >{{this.username}}</span>
        </el-header>

        <el-main>
			<div @click="goOff()"><img src="../assets/返回.png" style="width: 18px; " />
				<span style="color: #333;font-size: small;">&nbsp;返回</span>
			</div>
           <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
 </template>
<script>
  export default {
	data() {
      return {
		  username:''
      }
    },
	methods:{
		  goOff(){undefined
		                this.$router.go(-1);
		            },
		outlogin(){
			        this.$confirm('是否确认退出登录?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
						window.localStorage.clear()
						this.$router.push('/login')
			          this.$message({
			            type: 'success',
			            message: '退出登录!'
			          });
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '取消退出登录'
			          });          
			        });
		}
	},
	created(){
		this.username = window.localStorage.username
		},

  };
</script>

<style>
	body{
		margin: 0;
	}
	.el-container{
		/* height: 97.9vh !important; */
	}
	.el-submenu__title i {
	    color: white;
	}
  .el-header {
    background-color: #343843;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
	background-color:#2C3039;
    color: white;
	position: relative;
	overflow-x: clip;
  }
  .el-menu{
	  background-color: rgba(23,23,23,0.1);
  }
  .el-submenu__title {
	  color: white;
  }
  .el-menu-item{
	  color: white;
  }
  .el-submenu__title:hover{
  	background-color: #409EFF !important;
  }
  .el-menu-item:hover{
  	background-color: #409EFF;
  }
  .el-menu-item:focus{
  	background-color: #409EFF;
	color: white;
  }
  .el-header{
	  width: 100%;
	  /* position: relative;
	  left: -200px; */
  }
  .logo-img{
	  height: 50px;
	  margin-left: 20px;
	  margin-top: 10px;
  }
  .logo-p{
	  font-size: 18px;
	  position: relative;
	  top:-10px;
	  margin-left: 40px;
	  font-family:LiSu;
  }
  i{
	  color: white ;
  }
  .el-main{
	  overflow: hidden;
  }
</style>
