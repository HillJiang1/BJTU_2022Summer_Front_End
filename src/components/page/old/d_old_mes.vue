<template>
<div style="width:500px;margin-left:270px;">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px">
 
 <el-form-item label="姓名">
    <el-input v-model="form.oldName" :disabled="true"></el-input>
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
    <el-input v-model="form.birthday" :disabled="true"></el-input>
  </el-form-item>
   <el-form-item label="入院日期">
    <el-input v-model="form.date_in"></el-input>
  </el-form-item>
  <el-form-item label="出院日期">
    <el-input v-model="form.date_out"></el-input>
  </el-form-item>
   <el-form-item label="房间号">
    <el-input v-model="form.roomNumber"></el-input>
  </el-form-item>
   <el-form-item label="第一监护人姓名">
    <el-input v-model="form.guardian1_name"></el-input>
  </el-form-item>
   <el-form-item label="第一监护人电话">
    <el-input v-model="form.guardian1_phone"></el-input>
  </el-form-item>
   <el-form-item label="第一监护人微信">
    <el-input v-model="form.guardian1_wechat"></el-input>
  </el-form-item>
  <el-form-item label="第二监护人姓名">
    <el-input v-model="form.guardian2_name"></el-input>
  </el-form-item>
   <el-form-item label="第二监护人电话">
    <el-input v-model="form.guardian2_phone"></el-input>
  </el-form-item>
   <el-form-item label="第二监护人微信">
    <el-input v-model="form.guardian2_wechat"></el-input>
  </el-form-item>
  <el-form-item label="健康状态">
    <el-input v-model="form.situation"></el-input>
  </el-form-item>
  <el-form-item label="描述">
    <el-input v-model="form.des"></el-input>
  </el-form-item>
  <el-form-item label="创建日期">
    <el-input v-model="form.createTime" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="创建人">
    <el-input v-model="form.createName" :disabled="true"></el-input>
  </el-form-item>
<el-form-item label="更新时间">
    <el-input v-model="form.updateTime" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="更新人">
    <el-input v-model="form.updateName" :disabled="true"></el-input>
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
    <el-button type="primary" @click="modify"  style="width:50%;margin-left:80px;margin-top:10px">更改老人信息</el-button>
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
        var old = JSON.parse(localStorage.getItem('concreteOld')).data;
        console.log(old)
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
         fileList: [{url:old.image}],
          form:{
            
            dialogImageUrl: "",
            dialogVisible: false, 
            fileParam: "",
          id:old.id,
          oldName:old.oldName,
          sex:old.sex,
          phone:old.phone,
          ID:old.ID,
          birthday:old.birthday,
          date_in:old.date_in,
          date_out:old.date_out,
          roomNumber:old.roomNumber,
          guardian1_name:old.guardian1_name,
          guardian1_phone:old.guardian1_phone,
          guardian1_wechat:old.guardian1_wechat,
          guardian2_name:old.guardian2_name,
          guardian2_phone:old.guardian2_phone,
          guardian2_wechat:old.guardian2_wechat,
          situation:old.situation,
          des:old.des,
          createTime:old.createTime,
          createName:old.createName,
          updateTime:old.updateTime,
          updateName:old.updateName,
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
           var birthday = this.birthday
            if (fileList.length >0){
            this.uploadDisabled ='disabled'
          }

            this.fileParam=new FormData();
            this.fileParam.append("file",file["raw"]);
            this.fileParam.append("fileName",file["name"]);
            console.log(this.form.id)
            // this.filmParam.append("id",this.form.id);
            console.log(this.form.id)
            this.fileParam.append("oldName",this.form.oldName);
            this.fileParam.append("sex",this.form.sex);
            this.fileParam.append("phone",this.form.phone);
            this.fileParam.append("ID",this.form.ID);
            this.fileParam.append("date_in",this.form.date_in);
            this.fileParam.append("birthday",this.form.birthday);
            this.fileParam.append("date_in",this.form.date_in);
            this.fileParam.append("date_out",this.form.date_out);
            this.fileParam.append("roomNumber",this.form.roomNumber);
            this.fileParam.append("guardian1_name",this.form.guardian1_name);
            this.fileParam.append("guardian1_phone",this.form.guardian1_phone);
            this.fileParam.append("guardian1_wechat",this.form.guardian1_wechat);
            this.fileParam.append("guardian2_name",this.form.guardian2_name);
            this.fileParam.append("guardian2_phone",this.form.guardian2_phone);
            this.fileParam.append("guardian2_wechat",this.form.guardian2_wechat);
            this.fileParam.append("situation",this.form.situation);
            this.fileParam.append("des",this.form.des);
            this.fileParam.append("createTime",createTime);
            this.fileParam.append("createName",this.form.createName);
            this.fileParam.append("updateTime",this.form.updateTime);
            this.filmParam.append("updateName",localStorage.getItem("realName"));
        },
    
     modify() {
      console.log(this.fileParam)
      this.fileParam.append("id",this.form.id)
        this.$axios.post("http://127.0.0.1:5000/changeOld",this.fileParam
        ).then(res =>{
          if(res.data ==1)
          {
            alert("更新成功");
            this.$router.push('/oldMen');
          }
          else
            alert("更新失败")
            })
 
    }
    

}
}

</script>
.disabled .el-upload--picture-card{
  display: none;
}
</style>