<template>
<div style="width:500px;margin-left:270px;">
    <el-form ref="form" :model="form" label-width="140px">
  <el-form-item label="用户名">
    <el-input v-model="form.userName" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="真实姓名">
    <el-input v-model="form.realName"></el-input>
  </el-form-item>
  
  <el-form-item label="性别" prop="sex">
     <el-select v-model="form.sex" placeholder="请选择您的性别">
     <el-option label="男" value="男"></el-option>
      <el-option label="女" value="女"></el-option>
  </el-select>
  </el-form-item>

  <el-form-item label="邮箱">
    <el-input v-model="form.mail"></el-input>
  </el-form-item>
  <el-form-item label="电话">
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
  <el-form-item label="描述">
    <el-input v-model="form.des"></el-input>
  </el-form-item>
  
  <el-form-item  style="width:100%;">
    <el-button type="primary" @click="save"  style="width:50%;margin-left:80px;margin-top:10px">保存修改</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script>
  
  export default {
    data() {
      var info =JSON.parse(localStorage.getItem("managerInfo"));
      return {
        form: {
        //     userName:"info.userName",
        //   realName:"info.realName",
        //   sex:"info.sex",
        //   mail:"info.mail",
        //   phone:"info.phone",
        //   des:"info.des",
          
          userName:info.userName,
          realName:info.realName,
          sex:info.sex,
          mail:info.mail,
          phone:info.phone,
          des:info.des,
        }
      }
    },
    methods: {
      save(){
          alert(this.form.sex)
        //   this.$router.push('/home');
        var that=this
          $.ajax({
              url:'http://127.0.0.1:5000/change',
              type:'post',
              dataType:'json',
              data:JSON.stringify({"realName":this.form.realName,"sex":this.form.sex,"mail":this.form.mail,
                                    "phone":this.form.phone,"des":this.form.des,"userName":this.form.userName}),
              success:function(data){ 
                if(data == 1)
                {
                    alert("修改信息成功");
                    that.$router.push('/home');
                }
                else
                    alert("修改信息失败")
               }
            })
      }
    }
  }
</script>
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
    margin-left: 238px;
    box-shadow: 0 0 25px #cac6c6;
}
</style>