<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router> 
              <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-user-solid"></i>
                    <span>老人信息管理</span>
                </template>
                <el-menu-item-group>
                    <template slot="title"></template>
                        <!-- <el-menu-item index="1-1" class="el-icon-reading" @click="old_face()">   录入人脸</el-menu-item> -->
                        <el-menu-item index="1-2" class="el-icon-tickets" @click="old_mes()">   相关信息</el-menu-item>
                        <el-menu-item index="1-3" class="el-icon-data-line" @click="old_ana()">   统计分析</el-menu-item>
                </el-menu-item-group>
            </el-submenu>   
            
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-user-solid"></i>
                    <span>义工信息管理</span>
                </template>
                <el-menu-item-group>
                    <template slot="title"></template>
                        <!-- <el-menu-item index="2-1" class="el-icon-s-management" @click="v_face()" >   录入人脸</el-menu-item> -->
                        <el-menu-item index="2-2"  class="el-icon-tickets" @click="v_mes()">   相关信息</el-menu-item>
                        <el-menu-item index="2-3"  class="el-icon-data-line" @click="v_ana()">   统计分析</el-menu-item>
                </el-menu-item-group>
            </el-submenu>   

            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-user-solid"></i>
                    <span>工作人员信息管理</span>
                </template>
                <el-menu-item-group>
                    <template slot="title"></template>
                        <!-- <el-menu-item index="3-1" class="el-icon-s-management" @click="w_face()" >   录入人脸</el-menu-item> -->
                        <el-menu-item index="3-2"  class="el-icon-tickets" @click="w_mes()">   相关信息</el-menu-item>
                        <el-menu-item index="3-3"  class="el-icon-data-line" @click="w_ana()">   统计分析</el-menu-item>
                </el-menu-item-group>
            </el-submenu>   

            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-video-camera-solid"></i>
                    <span>实时监控</span>
                </template>
                <el-menu-item-group>
                    <template slot="title"></template>
                        <el-menu-item index="4-1" class="el-icon-camera-solid" @click = "room">   房间</el-menu-item>
                        <el-menu-item index="4-2" class="el-icon-camera-solid" @click = "corridor">   走廊</el-menu-item>
                        <el-menu-item index="4-3" class="el-icon-camera-solid" @click = "yard">   院子</el-menu-item>
                        <el-menu-item index="4-4" class="el-icon-camera-solid" @click = "desk">   桌子</el-menu-item>
                </el-menu-item-group>
            </el-submenu>   


            <el-menu-item index="5" @click = "record">
                <i class="el-icon-tickets"></i>
                <span slot="title" >突发情况记录</span>
            </el-menu-item>

             <el-menu-item index="6" @click = "calendar">
                <i class="el-icon-s-claim"></i>
                <span slot="title" >日程表</span>
            </el-menu-item>


        </el-menu>
    </div>
</template>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>

<script>
import bus from '../common/bus';
export default {
    data(){
        return{
            collapse: false,
        };
    },
         created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
         bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
         });
    },
    methods: {
      old_face(){
          this.$router.push('/old_face');
      },
      old_mes(){
        //后端传老人信息
        $.ajax({
                url:'http://127.0.0.1:5000/queryOlds',
                type:'post',
                dataType:'json',
                success:function(data){ //后端返回的json数据（此处data为json对象）
                localStorage.setItem("olds",JSON.stringify(data));
               }
             })
        this.$router.push('/oldMen');
      },
      old_ana(){
          //获取老人年龄分析图
          this.$axios.get("http://127.0.0.1:5000/analysisImage_old")
          .then(res =>{
              localStorage.setItem("oldImage",JSON.stringify(res.data.url))
              console.log(res.data.url)
          });
          this.$axios.post("http://127.0.0.1:5000/old_details")
          .then(res =>{
              localStorage.setItem("old_details",JSON.stringify(res.data))
              console.log(res.data)
          });
          this.$router.push('/oldImage');

        
      },
      chart(){
          this.$router.push('/chart');
      },
      member(){
          this.$router.push('/member');
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      record(){
          //从后端获取突发情况记录
          this.$axios.get("http://127.0.0.1:5000/readRecord")
          .then(res =>{
              localStorage.setItem("record",JSON.stringify(res.data))
          })
          //查看突发情况记录
          this.$router.push('/emergency')
      },
      w_mes(){
          //获取工作人员信息
        $.ajax({
                url:'http://127.0.0.1:5000/queryWorkers',
                type:'post',
                dataType:'json',
                success:function(data){ //后端返回的json数据（此处data为json对象）
                console.log(data)
                localStorage.setItem("workers",JSON.stringify(data));
               }
             })

          this.$router.push('/workers')
      },
      w_ana(){
          //获取工作人员分析图
          this.$axios.get("http://127.0.0.1:5000/workerImage")
          .then(res =>{
              localStorage.setItem("workerImage",JSON.stringify(res.data.url))
          })
          this.$axios.post("http://127.0.0.1:5000/w_details")
          .then(res =>{
              localStorage.setItem("w_details",JSON.stringify(res.data))
          })
          this.$router.push('/workerImage');
      },
      v_mes(){
          //获取义工全部信息
            $.ajax({
                url:'http://127.0.0.1:5000/queryVolunteers',
                type:'post',
                dataType:'json',
                success:function(data){ //后端返回的json数据（此处data为json对象）
                localStorage.setItem("volunteers",JSON.stringify(data));
               }
             })

          this.$router.push('/volunteers')
      },
      v_ana(){
           //获取义工分析图
          this.$axios.get("http://127.0.0.1:5000/volunteerImage")
          .then(res =>{
              localStorage.setItem("volunteerImage",res.data.url)
              console.log(res.data.url)
          })
           this.$axios.post("http://127.0.0.1:5000/v_details")
          .then(res =>{
              localStorage.setItem("v_details",JSON.stringify(res.data))
              console.log(res.data)
          });
          this.$router.push('/volunteerImage');
      },
      v_face(){
           this.$router.push('/v_face');
      },
      w_face(){
            this.$router.push('/w_face');
      },
      room(){
          this.$router.push('/room')
      },
      corridor(){
          this.$router.push('/corridor')
      },
      yard(){
          this.$router.push('/yard')
      },
      desk(){
          this.$router.push('/desk')
      }, 
      calendar(){
       this.$router.push('/calendar');
        }
    }

}
</script>


<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>