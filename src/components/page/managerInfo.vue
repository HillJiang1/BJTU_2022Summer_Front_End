<template>
<div style="width:500px;margin-left:270px;">
    <el-form ref="form" :model="form" label-width="140px">

 <el-descriptions-item label="头像" prop="image" > 
      <div>
        <el-upload
            v-model="fileList"
            ref="uploadref"
            action="#"
            :auto-upload="false"
            list-type="picture-card"
            :file-list="fileList"
            :limit="1"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="handleChange"
        >
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>
    </el-descriptions-item>
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
    <el-button type="primary" @click="modify()"  style="width:50%;margin-left:80px;margin-top:10px">保存修改</el-button>
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
         fileList: [],
          dialogImageUrl: "",
          dialogVisible: false,
          fileParam: "",
        form: {
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
       handleRemove(file, fileList) {
            this.fileList.pop();
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleChange(file,fileList){
          this.fileParam=new FormData();
          this.fileParam.append("file",file["raw"]);
          this.fileParam.append("fileName",file["name"]);
          this.fileParam.append("userName",localStorage.getItem("userName"));
          this.fileParam.append("realName",this.realName);
          this.fileParam.append("sex",this.sex);
          this.fileParam.append("mail",this.mail);
          this.fileParam.append("phone",this.phone);
          this.fileParam.append("des",this.des);
        },
       modify(){
          this.$axios.post("http://127.0.0.1:5000/change",this.fileParam
        ).then(res =>{
          if(res.data ==1)
          {
            alert("更新成功");
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
</style>