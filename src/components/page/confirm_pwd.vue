<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="输入用户名" prop="userid" style="margin-left:100px; margin-top:100px">
      <el-col :span="8">
        <el-input type="text" v-model="ruleForm.userid" autocomplete="off" ></el-input>
      </el-col>
    
    </el-form-item>
    <el-form-item label="密码" prop="pass" style="margin-left:100px; margin-top:50px">
       <el-col :span="8">
       <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
       </el-col> 
    </el-form-item>

    <el-form-list style="margin-left:450px; margin-top:70px">
         <el-button type="primary" @click="test()" >提交</el-button>
    </el-form-list>

    </el-form>
</template>

<script>
  export default {
    data(){ 
        
      return {

        logining: false,
            ruleForm:{
                userid: '',
                pass: '',
                checked: 'false',
            },
            rules: {
                userid: [{required: true, message: 'please enter your account', trigger: 'blur'}],
                pass: [{required: true, message: 'enter your password', trigger: 'blur'}]
            }
        
      }
    },
    
    methods: {
        test:function(){
           alert(this.ruleForm.userid +" "+this.ruleForm.pass)
            var that = this
            // this.$router.push('/changePwd');
            $.ajax({
              url:'http://127.0.0.1:5000/confirm',
              data:JSON.stringify({"userid":this.ruleForm.userid, "pass":this.ruleForm.pass}),
              type:'post',
              dataType:'json',
              success:function(data){ //后端返回的json数据（此处data为json对象）
                alert("用户名密码一致")
                console.log("Print data:")
                console.log(data)
                console.log("Finished")
                if(data == '0')
                {
                    alert("账号或密码不对");
                }
                //登录成功与否
                else if(data  == '1')
                {
                    alert('成功')
                    that.$router.push('/changePwd');
                }
                
          },
               error:function () {
              alert('异常')
          }
            })
        
        },
    }
  }
</script>