<template>
    <div class="login-container">
        <el-row>
            
            <el-col :lg="7" type="flex" jusity="end">
                <el-card class="box-card">
                    <div v-for="o in 1" :key="o" class="text item">
                        {{'欢迎登陆'}}
                    </div>
                </el-card>
            </el-col>
            <el-col :lg="17">
                <el-form :model="ruleForm2" :rules="rules2" status-icon ref="ruleForm2" label-position="left" label-width="0px"  class="demo-ruleForm login-page">
                    <h3 class="title">系统登录</h3>
                    <el-form-item prop="username">
                        <el-input type="text" v-model="ruleForm2.username" auto-complete="off"  placeholder="请输入您的用户名"></el-input>
                    </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="请输入您的密码"></el-input>
                        </el-form-item>
                    
                

                    <div style = "margin-left:300px;">
                        <el-button type="text" @click="gotoRegister()">注册新账号</el-button>
                    </div>
                    
                    <!-- <el-button type="primary"  @click="gotoRegister" >登录</el-button> -->
                    

                    <el-form-item style="width:100%;">
                        <el-button type="primary" style="width:100%;padding-top:10px" @click="login" >登录</el-button>
                        
                    </el-form-item>

                </el-form>
            </el-col>
            
        </el-row>
        

    </div>
</template>

<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script>
export default {
    data(){ 
        return{
            logining: false,
            ruleForm2:{
                username: '',
                password: '',
                checked: 'false',
            },
            rules2: {
                username: [{required: true, message: 'please enter your account', trigger: 'blur'}],
                password: [{required: true, message: 'enter your password', trigger: 'blur'}]
            }
        }
    },
    
    methods: {
        gotoRegister:function(){
            this.$router.push('/register');
        },
        confirm:function(){
            this.$router.push('/confirm');
        },

        login:function(){
           alert(this.ruleForm2.username +" "+this.ruleForm2.password)
            // this.$router.push('/home');
            var that = this
            $.ajax({
              url:'http://127.0.0.1:5000/login',
              data:JSON.stringify({"userid":this.ruleForm2.username, "pass":this.ruleForm2.password}),
              type:'post',
              dataType:'json',
              success:function(data){ //后端返回的json数据（此处data为json对象）
                alert("登录成了")
                
                //var array = JSON.stringify(data[0]);
                console.log("Print data:")
                console.log(data)
                console.log("Finished")
                if(data == '0')
                {
                    alert("账号或密码不对");
                }
                //登录成功与否
                else //登录成功-返回管理员姓名
                {   console.log(data)
                    localStorage.setItem("userName",data[0].userName)
                    localStorage.setItem("realName",data[0].realName)
                    alert(localStorage.getItem("userName")+localStorage.getItem("realName"))
                    that.$router.push('/home');
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
.login-container {
    width: 100%;
    height: 100%;
}
.login-page {
    -webkit-border-radius: 5px; 
    border-radius: 5px;
    margin: 180px auto;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 400px;
    height: 296px;
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
