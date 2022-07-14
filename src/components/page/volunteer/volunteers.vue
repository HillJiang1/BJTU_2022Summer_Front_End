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
      prop="volunteerName"
      label="姓名"
      width="180"
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
      prop="workTime"
      label="工时"
      width="250"
      align="center">
    </el-table-column>
    <el-table-column
      float="right"
      label="操作"
      width="365"
      align="center">
      <template slot-scope="scope">
        <el-button  type="text" size="small" @click.native.prevent="v_face(scope.$index)" >录入人脸</el-button>
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
      
      return {
        tableData: []
        // tableData:[
        //       {
        //           id:1,
        //           oldName:2,
        //           sex:1,
        //           phone:12,
        //           roomNumber:11,
        //           guardian1_phone:121
        //         }
        //     ]
     
      }
    },
    created(){
      this.getData()
    },
    methods:{
      getData:function(){
        // let  json = [
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
        // this.tableData = json
        var that = this
         $.ajax(
           {
                url:'http://127.0.0.1:5000/queryVolunteers',
                type:'post',
                dataType:'json',
                success:function(data){ //后端返回的json数据（此处data为json对象）
                localStorage.setItem("volunteers_info",JSON.stringify(data));    
                that.tableData = JSON.parse(localStorage.getItem('volunteers_info')||'[]')
  
                }
             })
      },
      // 录入人脸
      v_face:function(index){
       alert(this.tableData[index].id)
        var id = this.tableData[index].id
         //通过id向后端获取义工数据
        //  localStorage.setItem("worker_id",id)
        localStorage.setItem("id",id)
          this.$router.push('/v_face')
          this.$axios.post("http://127.0.0.1:5000/faceCollectvol",{id:id})
          .then(res =>{
            localStorage.setItem("v_face",JSON.stringify(res))
          })
//          this.$router.push('/concreteVolunteer')
        },

      //查看义工
       queryVolunteer:function(index){
       alert(this.tableData[index].id)
        var id = this.tableData[index].id
         //通过id向后端获取义工数据
        //  localStorage.setItem("worker_id",id)
        localStorage.setItem("id",id)
          this.$axios.post("http://127.0.0.1:5000/queryVolunteer",{id:id})
          .then(res =>{
            localStorage.setItem("concreteVolunteer",JSON.stringify(res))
            console.log(JSON.stringify(res))
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