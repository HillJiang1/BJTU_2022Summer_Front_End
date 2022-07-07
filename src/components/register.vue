<template>
    <div class="register-container" style="position:absolute; top:8px;left:300px">
            <el-col :xl="37">
                <el-form :model="ruleForm1" :rules="rules1" status-icon ref="ruleForm1"  label-position="left" class="demo-ruleForm register-page">
                    <h3 class="title">注册新用户</h3>

                    <el-form-item label="真实姓名"  prop="realname">
                        <el-input type="text" v-model="ruleForm1.realname" auto-complete="off"  placeholder="请输入您的真实姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="ruleForm1.sex" placeholder="请选择您的性别">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="邮箱"  prop="email">
                        <el-input type="text" v-model="ruleForm1.email" auto-complete="off"  placeholder="请输入您的邮箱"></el-input>
                    </el-form-item>

                     <el-form-item label="电话"  prop="phone">
                        <el-input type="text" v-model="ruleForm1.phone" auto-complete="off"  placeholder="请输入您的电话号码"></el-input>
                    </el-form-item>

                    <el-form-item label="描述" prop="description">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="ruleForm1.description" placeholder="请输入描述" ></el-input>
                    </el-form-item>

                     <el-form-item label="用户名"  prop="userid">
                        <el-input type="text" v-model="ruleForm1.userid" auto-complete="off"  placeholder="请输入您的用户名"></el-input>
                    </el-form-item>
                        <el-form-item prop="pass" label="密码" >
                            <el-input type="password" v-model="ruleForm1.pass" auto-complete="off" placeholder="请输入您的密码"></el-input>
                        </el-form-item>
                    <el-form-item style="width:100%;">
                        <el-button type="primary" style="width:100%;padding-top:10px" @click="register" >注册</el-button>
                        
                    </el-form-item>

                </el-form>
            </el-col>

        

    </div>
</template>

<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script>

export default {
    
    data(){ 
        return{
            logining: false,
            ruleForm1:{
                 realname:'',
                 sex:'',
                 email:'',
                 phone:'',
                 description:'',
                userid: '',
                pass: '',
                checked: 'false',
            },
            rules1: {
              realname: [{required: true, message: 'please enter your account', trigger: 'blur'}],
              sex: [{required: true, message: 'please enter your sex', trigger: 'blur'}],
                email: [{required: true, message: 'enter your password', trigger: 'blur'}],
                phone: [{required: true, message: 'enter your phone', trigger: 'blur'}],
                description: [{required: true, message: 'enter your description', trigger: 'blur'}],
                userid: [{required: true, message: 'enter your userid', trigger: 'blur'}],
                pass: [{required: true, message: 'enter your password', trigger: 'blur'}]
            }
        }
    },
    
    methods: {
        register:function(){
            // alert(this.ruleForm1.realname+"-"+this.ruleForm1.email+"-"+this.ruleForm1.phone+"-"+this.ruleForm1.description+"-"+this.ruleForm1.userid+"-"+this.ruleForm1.pass)
            alert(this.ruleForm1.sex)
            var that = this
            $.ajax({
              url:'http://127.0.0.1:5000/register',
              data:JSON.stringify({"realname":this.ruleForm1.realname, 
                                    "sex":this.ruleForm1.sex,
                                    "email":this.ruleForm1.email,
                                    "phone":this.ruleForm1.phone,
                                    "description":this.ruleForm1.description,
                                    "userid":this.ruleForm1.userid,
                                    "pass":this.ruleForm1.pass}),
              
              type:'post',
              dataType:'json',
              success:function(data){ //后端返回的json数据（此处data为json对象）
                
                // console.log("Print data:")
                // console.log(data)
                // console.log("Finished")
                if(data == '1')
                {
                    alert("注册成功");
                    this.$router.push('/')
                }
                //登录成功与否
                else 
                {
                    alert("注册失败，请重新注册")
                }
                
                
          },
               error:function () {
              alert('异常')
          }
            })
        },
        
    }
};
</script>

<style>
.register-container {
    width: 100%;
    height: 100%;

}
.register-page {
    -webkit-border-radius: 5px; 
    border-radius: 5px;
    margin: 180px auto;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 400px;
    height: 830px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    margin-left: 238px;
    box-shadow: 0 0 25px #cac6c6;
 } 
.remember {
    margin: 0px 0px 15px;
    text-align: left;
}


  .text {
    font-size: 30px;
    text-align: center;
    color: white;
  }

  .item {
    padding: 18px 0;
  }

   .box-card {
    width: 480px; 
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    width: 400px;
    height: 296px;
    padding: 35px 35px 15px;
    background: #409EFF;
    margin-left: 195px; 
    margin-top:180px;
     display: flex; 
    border: 1px solid #eaeaea; 

  }  

 .el-row {
    
    margin: 120px auto;
    
  } 

   .bg-purple-light {
    background: #409EFF;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }  
</style>
