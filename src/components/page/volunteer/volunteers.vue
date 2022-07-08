<template>
<div>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="编号"
      width="150"
      align="center">
    </el-table-column>
    <el-table-column
      prop="volunteerName"
      label="姓名"
      width="170"
      align="center">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="170"
      align="center">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话"
      width="290"
      align="center">
    </el-table-column>
    <el-table-column
      prop="workTime"
      label="工时"
      width="270"
      align="center">
    </el-table-column>
    <el-table-column
      float="right"
      label="操作"
      width="270"
      align="center">
      <template slot-scope="scope">
        <el-button  type="text" size="small" @click.native.prevent="queryVolunteer(scope.$index)" >查看</el-button>
        <el-button type="text" size="small" @click.native.prevent = "deleteRow(scope.$index,tableData)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <i id="icon" class = "el-icon-circle-plus" @click = "addVolunteer"></i>
</div>
  
  
</template>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script>
  export default {
    data() {
      var volunteers_info = JSON.parse(localStorage.getItem('volunteers')||'[]');
      return {
        tableData: volunteers_info,
        // tableData:[
        //   {
        //     id:'1',
        //     volunteerName:'小李',
        //     sex:'男',
        //     phone:'1221111',
        //     workTime:'1-1-1'
        //   },
        //    {
        //     id:'5',
        //     volunteerName:'小李',
        //     sex:'男',
        //     phone:'1221111',
        //     workTime:'1-1-1'
        //   }
        // ]
     
      }
    },

    methods:{
      //查看义工
        queryVolunteer:function(index){
         alert(this.tableData[index].id)
         var id = this.tableData[index].id
         //通过id向后端获取义工数据
        //  localStorage.setItem("worker_id",id)
        localStorage.setItem("id",id)
          this.$axios.post("http://127.0.0.1:5000/queryVolunteer")
          .then(res =>{
            localStorage.setItem("concreteVolunteer",JSON.stringify(res))
          })
         this.$router.push('/concreteVolunteer')
        },
        
        addVolunteer:function(){
            alert(111)
            this.$router.push('/addVolunteer')
        },

        deleteRow:function(index,rows){
            alert(this.tableData[index].id)
            var id = this.tableData[index].id
            rows.splice(index,1);
            //删除义工
            $.ajax({
              url:'http://127.0.0.1:5000/deleteVolunteer',
              type:'post',
              dataType:'json',
              data:JSON.stringify({"id": id}),
              success:function(data){ 
                if(data == 1)
                    alert("删除义工成功")
                else
                    alert("删除义工失败")
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