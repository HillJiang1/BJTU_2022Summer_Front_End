<template>
    <div class="register-container" style="position:absolute; top:8px;left:300px">
            <el-col :xl="37">
                <el-form :model="ruleForm1" :rules="rules1" status-icon ref="ruleForm1"  label-position="left" class="demo-ruleForm register-page">
                    <h3 class="title">注册新用户</h3>

                    <el-form-item label="邀请码"  prop="code">
                        <el-input type="text" v-model="ruleForm1.code" auto-complete="off"  placeholder="请输入您的邀请码"></el-input>
                    </el-form-item>

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

                        <el-form-item label="设置头像">
                        <div>
                            <el-upload
                                v-model="ruleForm1.fileList"
                                ref="uploadref"
                                action="#"
                                :class="uploadDisabled"
                                :auto-upload="false"
                                list-type="picture-card"
                                :file-list="fileList"
                                :limit="1"
                                :on-change="handleChange"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove"
                            >
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog v-model="ruleForm1.dialogVisible">
                                <img width="100%" :src="ruleForm1.dialogImageUrl" alt="" />
                            </el-dialog>
                        </div>
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
            fileParam: "",
            uploadDisabled:'',
            ruleForm1:{
                code:'',
                realname:'',
                sex:'',
                email:'',
                phone:'',
                description:'',
                userid: '',
                pass: '',
                checked: 'false',
                fileList: [],
                dialogImageUrl: "",
                dialogVisible: false,
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
        handleRemove(file, fileList) {
            console.log(file, fileList);
            if(fileList.length == 0){
             this.uploadDisabled =''
            }
        },
        handlePictureCardPreview(file) {
            this.form.dialogImageUrl = file.url;
            this.form.dialogVisible = true;
        },
        handleChange(file, fileList) {
            if(fileList.length>0){
              this.uploadDisabled = 'disabled'
          }
            this.fileParam = new FormData();
            this.fileParam.append("file", file["raw"]);
            this.fileParam.append("fileName", file["name"]);
            this.fileParam.append("realName", this.ruleForm1.realName);
            this.fileParam.append("sex",this.ruleForm1.sex);
            this.fileParam.append("email", this.ruleForm1.email);
            this.fileParam.append("phone",this.ruleForm1.phone);
            this.fileParam.append("description",this.ruleForm1.description);
            this.fileParam.append("userid",this.ruleForm1.userid);
            this.fileParam.append("pass",this.ruleForm1.pass);
            this.fileParam.append("code", this.ruleForm1.code);
        },

        register:function(){
            var that = this
             this.$axios.post("http://127.0.0.1:5000/register",this.fileParam
            ).then(res =>{
             if(res.data == 1)
                {
                    alert("注册管理员成功");
                    that.$router.push('/');
                }
                else
                    alert("注册管理员失败")
          })
//             $.ajax({
//               url:'http://127.0.0.1:5000/register',
//               data:JSON.stringify({"realname":this.ruleForm1.realname, 
//                                     "sex":this.ruleForm1.sex,
//                                     "email":this.ruleForm1.email,
//                                     "phone":this.ruleForm1.phone,
//                                     "description":this.ruleForm1.description,
//                                     "userid":this.ruleForm1.userid,
//                                     "pass":this.ruleForm1.pass}),
              
//               type:'post',
//               dataType:'json',
//               success:function(data){ //后端返回的json数据（此处data为json对象）
                
//                 // console.log("Print data:")
//                 // console.log(data)
//                 // console.log("Finished")
//                 if(data == '1')
//                 {
//                     alert("注册成功");
//                     this.$router.push('/')
//                 }
//                 //登录成功与否
//                 else 
//                 {
//                     alert("注册失败，请重新注册")
//                 }
                
                
//           },
//                error:function () {
//               alert('异常')
//           }
//             })
        },
        
    }
};
</script>

<style>
.disabled .el-upload--picture-card {
    display: none;
}
.register-container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}
.register-page {
    width: 400px;
    height: 1050px;
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
