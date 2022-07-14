<template>
<div style="width:500px;margin-left:270px;">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px">
  <el-form-item label="义工号">
    <el-input v-model="form.id" :disabled="true"></el-input>
  </el-form-item>
 <el-form-item label="姓名">
    <el-input v-model="form.volunteerName" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="性别">
    <el-input v-model="form.sex" :disabled="true"></el-input>
  </el-form-item>
 <el-form-item label="电话" prop="phone">
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
   <el-form-item label="身份证号" prop="ID">
    <el-input v-model="form.ID" :disabled="true"></el-input>
  </el-form-item>
 <el-form-item label="生日">
    <el-input v-model="form.birthday"></el-input>
  </el-form-item>
  <el-form-item label="工时">
    <el-input v-model="form.workTime"></el-input>
  </el-form-item>
   <el-form-item label="入职日期">
    <el-input v-model="form.hire_date"></el-input>
  </el-form-item>
  <el-form-item label="离职日期">
    <el-input v-model="form.resign_date"></el-input>
  </el-form-item>


  <el-form-item label="头像">
    <div>
        <el-upload
            v-model="fileList"
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
        <el-dialog v-model="form.dialogVisible">
            <img width="100%" :src="form.dialogImageUrl" alt="" />
        </el-dialog>
    </div>
  </el-form-item>


  
  <el-form-item  style="width:100%;">
    <el-button type="primary" @click="modify"  style="width:50%;margin-left:80px;margin-top:10px">更改义工信息</el-button>
  </el-form-item>
</el-form>
</div>

</template>

   
</template>

<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script>
   
   import axios from "axios";
  export default {
    data() {
      var volunteer = JSON.parse(localStorage.getItem('concreteVolunteer')).data;
      let validatePhone =(rule,value,callback)=>{
            if(!value){
                callback(new Error('手机号不能为空'));
            }
            if (!/^1[3456789]\d{9}$/.test(value)){
                callback(new Error('手机号不正确！'));
            }
        };
      let validateID =(rule,value,callback)=>{
            if(!value){
                callback(new Error('身份证号不能为空'));
            }
            if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(([0-2][1-9])|10|20|30|31)\d{3}(\d|X|x)$/.test(value)){
                callback(new Error('身份证号不正确！'));
            }
        };
      return {
        uploadDisabled:'disabled',
        fileList: [{url:volunteer.image}],
        form:{
              
            dialogImageUrl: "",
            dialogVisible: false,
            
            fileParam: "",
            id:volunteer.id,
            volunteerName: volunteer.volunteerName,
            sex:volunteer.sex,
            phone:volunteer.phone,
            ID:volunteer.ID,
            birthday:volunteer.birthday,
            workTime:volunteer.workTime,
            hire_date:volunteer.hire_date,
            resign_date:volunteer.resign_date,
            },
            rules:{
                ID: [{validator:validateID ,  trigger: 'blur'}],
                phone: [{validator:validatePhone, trigger: 'blur'}],
      }
        
      }
    },
    methods: {
      handleRemove(file, fileList) {
            fileList.pop();
            alert(fileList.length)
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
          this.fileParam.append("id",localStorage.getItem("id"));
          this.fileParam.append("volunteerName",this.form.volunteerName);
          this.fileParam.append("sex",this.form.sex);
          this.fileParam.append("phone",this.form.phone);
          this.fileParam.append("ID",this.form.ID);
          this.fileParam.append("birthday",this.form.birthday);
          this.fileParam.append("workTime",this.form.workTime);
          this.fileParam.append("hire_date",this.form.hire_date);
          this.fileParam.append("resign_date",this.form.resign_date);
        },
        modify(){
          this.$axios.post("http://127.0.0.1:5000/changeVolunteer",this.fileParam
        ).then(res =>{
          if(res.data ==1)
          {
            alert("更新成功");
            this.$router.push('/volunteers');

          }
          else
            alert("更新失败")
            })
            }
  }
  }
</script>
<style>
.disabled .el-upload--picture-card{
   display: none;
}
</style>