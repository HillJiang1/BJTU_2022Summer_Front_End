<template>
<div style="width:500px;margin-left:270px;">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px">
  <el-form-item label="工号">
    <el-input v-model="form.id" :disabled="true"></el-input>
  </el-form-item>
 <el-form-item label="姓名">
    <el-input v-model="form.workerName" :disabled="true"></el-input>
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
   <el-form-item label="入职日期">
    <el-input v-model="form.hire_date"></el-input>
  </el-form-item>
  <el-form-item label="离职日期">
    <el-input v-model="form.resign_date"></el-input>
  </el-form-item>
  <el-form-item label="描述">
    <el-input v-model="form.des"></el-input>
  </el-form-item>
  <el-form-item label="创建日期">
    <el-input v-model="form.createTime"></el-input>
  </el-form-item>
  <el-form-item label="创建人">
    <el-input v-model="form.createName"></el-input>
  </el-form-item>


  <el-form-item label="头像">
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
    <el-button type="primary" @click="modify"  style="width:50%;margin-left:80px;margin-top:10px">更改工作人员信息</el-button>
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
      var worker = JSON.parse(localStorage.getItem('concreteWorker')).data;
      // alert(worker.image)
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
        
        
        // fileParam: "",
        form:{
          fileList: [{url:worker.image}],
            dialogImageUrl: "",
            dialogVisible: false,
            uploadDisabled:'',
            id:worker.id,
            workerName: worker.workerName,
            sex :worker.sex,
            phone :worker.phone,
            ID:worker.ID,
            birthday:worker.birthday,
            hire_date:worker.hire_date,
            resign_date:worker.resign_date,
            des:worker.des,
            createTime:worker.createTime,
            createName:worker.createName,
            fileParam: "",
      },
      rules:{
         ID: [{validator:validateID ,  trigger: 'blur'}],
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
            console.log(file['name'])
            this.fileParam.append("file",file["raw"]);
            console.log(file)
          this.fileParam.append("fileName",file["name"]);
            this.fileParam.append("id",this.form.id);
          this.fileParam.append("workerName",this.form.workerName);
          this.fileParam.append("sex",this.form.sex);
          this.fileParam.append("phone",this.form.phone);
          this.fileParam.append("ID",this.form.ID);
          this.fileParam.append("birthday",this.form.birthday);
          this.fileParam.append("hire_date",this.form.hire_date);
          this.fileParam.append("resign_date",this.form.resign_date);
          this.fileParam.append("des",this.form.des);
          this.fileParam.append("createTime",this.form.createTime);
          this.fileParam.append("createName",this.form.createName);
          console.log(this.form.fileParam)
        },
          modify(){
          var that=this
          console.log(this.form)
          console.log(this.fileParam)
          this.$axios.post("http://127.0.0.1:5000/changeWorker",this.fileParam
        ).then(res =>{
          if(res.data ==1)
          {
            alert("更新成功");
            that.$router.push('/workers');
          }
          else
            alert("更新失败")
            })
            }
  }
  }
</script>