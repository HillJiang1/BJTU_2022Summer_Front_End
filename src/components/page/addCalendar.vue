
<template>
<div style="width:500px;margin-left:270px;">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px">
  <el-form-item label="日程名称" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>

<el-form-item label="日期" prop="date">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" v-model="form.date" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>


  <el-form-item  style="width:100%;">
    <el-button type="primary" @click="add" style="width:50%;margin-left:80px;margin-top:10px">添加日程</el-button>
  </el-form-item>
  <el-form-item  style="width:100%;">
    <el-button type="primary" @click="cancel" style="width:50%;margin-left:80px;margin-top:10px">取消</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script>
  export default {
    data() {
       let validateName =(rule,value,callback)=>{
            if(!value){
                callback(new Error('日程内容不能为空'));
            }
        };
        let validateDate =(rule,value,callback)=>{
            if(!value){
                callback(new Error('日期不能为空'));
            }
        };
        
      return {
        form: {
          name:'',
          date:'',
        },
         rules:{
           name: [{validator:validateName ,  trigger: 'blur'}],
           date: [{validator:validateDate, trigger: 'blur'}],
      }
    }
    },

    methods: {
      add(){
         this.$axios.post("http://127.0.0.1:5000/modifyCalendar",form
        ).then(res =>{
          if(res.data ==1)
          {
            alert("更新成功");
            this.$router.push('/calendar');

          }
          else
            alert("更新失败")
            })
      },
      cancel(){
         alert(111)
        this.$router.push('/calendar')
      }
    }
  }
</script>
<style>
.disabled .el-upload--picture-card {
    display: none;
}
</style>
<style scoped>

.page{
    -webkit-border-radius: 5px; 
    border-radius: 5px;
    margin: 180px auto;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 600px;
    height: 596px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    margin-left: 138px;
    box-shadow: 0 0 25px #cac6c6;
    /* margin-top:300px */
}
</style>