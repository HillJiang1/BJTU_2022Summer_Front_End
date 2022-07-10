<template>
<div style="width:500px;margin-left:270px;">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px">

 <el-form-item label="头像" prop="image" > 
      <div>
        <el-upload
            v-model="form.fileList"
            ref="uploadref"
            action="#"
            :class="uploadDisabled"
            :auto-upload="false"
            list-type="picture-card"
            :file-list="form.fileList"
            :limit="1"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="handleChange"
        >
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="form.dialogVisible">
            <img width="100%" :src="form.dialogImageUrl" alt="" />
        </el-dialog>
      </div>
    </el-form-item>
  <el-form-item label="用户名">
    <el-input v-model="form.userName" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="真实姓名">
    <el-input v-model="form.realName" :disabled="true"></el-input>
  </el-form-item>
  
  <el-form-item label="性别" >
    <el-input v-model="form.sex" :disabled="true"></el-input>
  </el-form-item>

  <el-form-item label="邮箱" prop="email">
    <el-input v-model="form.email"></el-input>
  </el-form-item>
  <el-form-item label="电话" prop="phone">
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
  <el-form-item label="描述">
    <el-input v-model="form.des"></el-input>
  </el-form-item>
  
  <el-form-item  style="width:100%;">
    <el-button type="primary" @click="modify()"  style="width:50%;margin-left:80px;margin-top:10px">保存修改</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script>
  
  export default {
    data() {

       let validatePhone =(rule,value,callback)=>{
        console.log(value)
            if(!value){
                callback(new Error('手机号不能为空'));
            }
            if (!/^1[3456789]\d{9}$/.test(value)){
                callback(new Error('手机号不正确！'));
            }
        };
        let validateEmail =(rule,value,callback)=>{
          console.log(value)
            if(!value){
                callback(new Error('邮箱不能为空'));
            }
            if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)){
                callback(new Error('邮箱不正确！'));
            }
        };

      console.log(localStorage.getItem("managerInfo"))
      var info =JSON.parse(localStorage.getItem("managerInfo")).data;
      console.log(info)
      return {
         
        form: {
          fileList: [{url:info.image}],
          dialogImageUrl: "",
          dialogVisible: false,
          uploadDisabled:'',
          fileParam: "",
          userName:info.userName,
          realName:info.realName,
          sex:info.sex,
          email:info.mail,
          phone:info.phone,
          des:info.des,
        },
         rules: {
              email: [{validator:validateEmail ,  trigger: 'blur'}],
              phone: [{validator:validatePhone, trigger: 'blur'}],
            }
      }
    },
    methods: {
       handleRemove(file, fileList) {
            this.fileList.pop();
            console.log(file, fileList);
            if(fileList.length ==0){
              this.uploadDisabled=''
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleChange(file,fileList){
          if (fileList.length >0){
            this.uploadDisabled ='disabled'
          }
          this.fileParam=new FormData();
          this.fileParam.append("file",file["raw"]);
          this.fileParam.append("fileName",file["name"]);
        this.fileParam.append("userName",localStorage.getItem("userName"));
          this.fileParam.append("realName",this.form.realName);
          this.fileParam.append("sex",this.form.sex);
          this.fileParam.append("mail",this.form.mail);
          this.fileParam.append("phone",this.form.phone);
          this.fileParam.append("des",this.form.des);
         
          
        },
       modify(){
        console.log(this.fileParam)
          var that=this
          this.$axios.post("http://127.0.0.1:5000/change",this.fileParam
        ).then(res =>{
          if(res.data ==1)
          {
            alert("更新成功");
            that.$router.push('/home')
          }
          else
            alert("更新失败")
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

.disabled .el-upload--picture-card{
  display: none;
}
</style>