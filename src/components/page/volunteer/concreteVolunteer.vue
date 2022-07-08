<template>

 <el-descriptions class="margin-top" title="详情信息" :column="1" :size="size" border>
    <template slot="extra">
      <el-button type="primary" size="small" @click="modify()">提交</el-button>
    </template>
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
    <el-descriptions-item label="义工号" > <el-input v-model="id" :disabled="true"></el-input></el-descriptions-item>
    <el-descriptions-item label="姓名"> <el-input v-model="volunteerName" :disabled="true"></el-input></el-descriptions-item>
    <el-descriptions-item label="性别"> <el-input v-model="sex" :disabled="true"></el-input></el-descriptions-item>
    <el-descriptions-item label="电话"> <el-input v-model="phone"></el-input></el-descriptions-item>
    <el-descriptions-item label="身份证号"> <el-input v-model="ID" :disabled="true"></el-input></el-descriptions-item>
    <el-descriptions-item label="生日"> <el-input v-model="birthday"></el-input></el-descriptions-item>
    <el-descriptions-item label="工时"> <el-input v-model="workTime"></el-input></el-descriptions-item>
    <el-descriptions-item label="入职日期"> <el-input v-model="hire_date"></el-input></el-descriptions-item>
    <el-descriptions-item label="离职日期"> <el-input v-model="resign_date"></el-input></el-descriptions-item>
  </el-descriptions>
</template>

   
</template>

<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script>
   
   import axios from "axios";
  export default {
    data() {
      var volunteer = JSON.parse(localStorage.getItem('concreteVolunteer'));
      return {
        fileList: [],
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
          this.fileParam.append("id",localStorage.getItem("id"));
          this.fileParam.append("volunteerName",this.volunteerName);
          this.fileParam.append("sex",this.sex);
          this.fileParam.append("phone",this.phone);
          this.fileParam.append("ID",this.ID);
          this.fileParam.append("birthday",this.birthday);
          this.fileParam.append("workTime",this.workTime);
          this.fileParam.append("hire_date",this.hire_date);
          this.fileParam.append("resign_date",this.resign_date);
        },
        modify(){
          this.$axios.post("http://127.0.0.1:5000/changeVolunteer",this.fileParam
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