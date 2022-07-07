<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="userid" style="margin-left:100px; margin-top:100px">
     <el-col :span="8">
         <el-input type="text" v-model="ruleForm.userid" autocomplete="off"></el-input>
     </el-col>
  </el-form-item>
  <el-form-item label="新密码" prop="pass" style="margin-left:100px; margin-top:30px">
    <el-col :span="8">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass" style="margin-left:100px; margin-top:30px">
    <el-col :span="8">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item  style="margin-left:280px; margin-top:30px">
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
  export default {
    data() {
      
      var validatePass = (rules, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rules, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          userid:'',
          pass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm:function() {
        var that=this
       $.ajax({
             url:'http://127.0.0.1:5000/change_pwd',
             data:JSON.stringify({"userid":this.ruleForm.userid, "pass":this.ruleForm.pass}),
             type:'post',
             dataType:'json',
              success:function(data){ //后端返回的json数据（此处data为json对象）
                alert("成功！！！")
                console.log("Print data:")
                console.log(data)
                console.log("Finished")
                if(data == '0')
                {
                    alert("修改失败");
                }
                //登录成功与否
                else if(data  == '1')
                {
                    alert('修改成功')
                    that.$router.push('/home')
                }
                
          },
               error:function () {
              alert('异常')
          }
      })},

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>