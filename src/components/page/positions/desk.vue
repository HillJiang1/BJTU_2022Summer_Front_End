<template>
    <div>
        <img src="http://127.0.0.1:5001/desk">
    <div style="height:500px;float:right;margin-top:20px;padding-bottom: 40px;border:3px solid #000">
    <h2 style="margin-left:5px">书桌实时记录显示</h2>
    <el-scrollbar style = "height:100%">
        <div style="height:450px float: right;margin-top: 10px;margin-left: 10px;margin-right: 10px;margin-bottom: 10px;">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="70"
        align="center">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="130"
        align="center">
      </el-table-column>
       <el-table-column prop="pic" align="center" label="图片" width="180" show-overflow-tooltip>
        <template slot-scope="scope">
            <img :src="scope.row.image" width="40" height="30" v-image-preview/>
        </template>
    </el-table-column>
    </el-table>
    </div>  
    </el-scrollbar>
</div>
    </div>
</template>


<script>
    export default {
      data() {
        return {
            tableData:[],
            timer:null,
            num:0
        }
      },
      created(){
          this.getData()
      },
      mounted(){
          if(this.timer){
              clearInterval(this.timer)
          }else{
              var that = this
              this.timer = setInterval(()=>{
                  that.getData();
              },2000
              )
          }
      },
      methods:{
          getData:function(){
            //   this.num = this.num+1
            //   console.log(this.num)
            //   var json =[{
            //     id:'1',
            //     type:'老人笑了',
            //     image:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            // }, {
            //     id:'1',
            //     type:'老人笑了',
            //     image:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            // }, {
            //     id:'1',
            //     type:'老人笑了',
            //     image:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            // }, {
            //     id:'1',
            //     type:'老人笑了',
            //     image:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            // },
            // {
            //     id:'1',
            //     type:'老人笑了',
            //     image:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            // }, {
            //     id:'1',
            //     type:'老人笑了',
            //     image:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            // }]
            // this.tableData =json
            //获取记录
            var that = this
            this.$axios.get("http://127.0.0.1:5000/deskRecord")
            .then(res =>{
              localStorage.setItem("deskRecord",JSON.stringify(res.data))
              that.tableData = JSON.parse(localStorage.getItem('deskRecord')||'[]')
            })
          }
      },
      beforeDestroy(){
          clearInterval(this.timer)
      }
    }
  </script>
  
  <style>
      .el-scrollbar__wrap{
        overflow-x: hidden;
      }

  </style>