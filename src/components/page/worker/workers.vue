
<template>
<div>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="编号"
      width="80"
      align="center">
    </el-table-column>
    <el-table-column
      prop="workerName"
      label="姓名"
      width="170"
      align="center">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="80"
      align="center">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话"
      width="290"
      align="center">
    </el-table-column>
    <el-table-column
      prop="hire_date"
      label="雇佣日期"
      width="250"
      align="center">
    </el-table-column>
    <el-table-column
      float="right"
      label="操作"
      width="375"
      align="center">
      <template slot-scope="scope">
        <el-button  type="text" size="small" @click.native.prevent="w_face(scope.$index)" >录入人脸</el-button>
        <el-button  type="text" size="small" @click.native.prevent="queryWorker(scope.$index)" >查看</el-button>
        <el-button type="text" size="small" @click.native.prevent = "deleteRow(scope.$index,tableData)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <i id="icon" class = "el-icon-circle-plus" @click = "addWorker"></i>
</div>
  
  
</template>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script>
  export default {
    data() {
      return {
        tableData: []
        // tableData:[
        //   {
        //     id:'1',
        //     workerName:'小李',
        //     sex:'男',
        //     phone:'1221111',
        //     hire_date:'1-1-1'
        //   },
        //   {
        //     id:'5',
        //     workerName:'小李',
        //     sex:'男',
        //     phone:'1221111',
        //     hire_date:'1-1-1'
        //   }
        // ]
     
      }
    },
    created(){
      this.getData()
    },
    methods:{
      getData:function(){
        var that = this
        $.ajax({
                url:'http://127.0.0.1:5000/queryWorkers',
                type:'post',
                dataType:'json',
                success:function(data){ //后端返回的json数据（此处data为json对象）
                console.log(data)
                localStorage.setItem("workers",JSON.stringify(data));
                that.tableData = JSON.parse(localStorage.getItem('workers')||'[]')
               }
             })
      },
      //录入人脸
        w_face:function(index){
         alert(this.tableData[index].id)
         var id = this.tableData[index].id
         console.log(id)
         //通过id向后端获取工作人员数据
         localStorage.setItem("id",id)
          this.$router.push('/w_face')
         this.$axios.post("http://127.0.0.1:5000/faceCollectemp",{id:id})
          .then(res =>{
            localStorage.setItem("w_face",JSON.stringify(res))
          })
//           this.$router.push('/concreteWorker')
        },
       //查看工作人员
        queryWorker:function(index){
         alert(this.tableData[index].id)
         var id = this.tableData[index].id
         console.log(id)
         //通过id向后端获取工作人员数据
         localStorage.setItem("id",id)
         this.$axios.post("http://127.0.0.1:5000/queryWorker",{id:id})
          .then(res =>{
            localStorage.setItem("concreteWorker",JSON.stringify(res))
          })
          this.$router.push('/concreteWorker')
        },
        
        addWorker:function(){
            alert(111)
            this.$router.push('/addWorker')
        },

        deleteRow:function(index,rows){
            var id = this.tableData[index].id
            rows.splice(index,1);
            //删除工作人员
            $.ajax({
              url:'http://127.0.0.1:5000/deleteWorker',
              type:'post',
              dataType:'json',
              data:JSON.stringify({"id": id}),
              success:function(data){ 
                if(data == 1)
                    alert("删除工作人员成功")
                else
                    alert("删除工作人员失败")
               }
            })

        }
    }
  }
</script>
<style scoped>
i#icon{
    font-size:xx-large;
    float:right;
    margin-top: 10px;
    margin-right:5px;
}
</style>