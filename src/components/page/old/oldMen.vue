
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
      prop="oldName"
      label="姓名"
      width="170"
      align="center">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话"
      width="250"
      align="center">
    </el-table-column>
    <el-table-column
      prop="roomNumber"
      label="房间号"
      width="150"
      align="center">
    </el-table-column>
    <el-table-column
      prop="guardian1_phone"
      label="监护人电话"
      width="250"
      align="center">
    </el-table-column>
    <el-table-column
      float="right"
      label="操作"
      width="250"
      align="center">
      <template slot-scope="scope">
        <el-button  type="text" size="small" @click.native.prevent="queryMan(scope.$index)" >查看</el-button>
        <el-button type="text" size="small" @click.native.prevent = "deleteRow(scope.$index,tableData)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <i id="icon" class = "el-icon-circle-plus" @click = "addOld"></i>
</div>
  
  
</template>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script>
  export default {

    data() {
      var olds_info = JSON.parse(localStorage.getItem('olds')||'[]');
      return {
        tableData: olds_info,
     
      }
    },

    methods:{
      //查看老人
        queryMan:function(index){
          alert(this.tableData[index].id)
         var id = this.tableData[index].id
         //通过id向后端获取老人数据
          localStorage.setItem("old_id",id)
          this.$axios.post("http://127.0.0.1:5000/queryOld",{id:id})
          .then(res =>{
            localStorage.setItem("concreteOld",JSON.stringify(res))
          })
         this.$router.push('/concreteOld')
         },
        
        
        addOld:function(){
            alert(111)
            this.$router.push('/addOld')
        },

        deleteRow:function(index,rows){
            rows.splice(index,1);
            //删除老人
            $.ajax({
              url:'http://127.0.0.1:5000/deleteOld',
              type:'post',
              dataType:'json',
              data:JSON.stringify({"id": this.tableData[index].id}),
              success:function(data){ 
                if(data == 1)
                    alert("删除老人成功")
                else
                    alert("删除老人失败")
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