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
    <el-descriptions-item label="姓名" > <el-input v-model="oldName" :disabled="true"></el-input></el-descriptions-item>
    <el-descriptions-item label="性别"> <el-input v-model="sex" :disabled="true"></el-input></el-descriptions-item>
    <el-descriptions-item label="电话号"> <el-input v-model="phone"></el-input></el-descriptions-item>
    <el-descriptions-item label="身份证号"> <el-input v-model="ID" :disabled="true"></el-input></el-descriptions-item>
    <el-descriptions-item label="出生日期"> <el-input v-model="birthday" :disabled="true"></el-input></el-descriptions-item>
    <el-descriptions-item label="入院日期"> <el-input v-model="date_in"></el-input></el-descriptions-item>
    <el-descriptions-item label="出院日期"> <el-input v-model="date_out"></el-input></el-descriptions-item>
    <el-descriptions-item label="房间号"> <el-input v-model="roomNumber"></el-input></el-descriptions-item>
    <el-descriptions-item label="第一监护人姓名"> <el-input v-model="guardian1_name"></el-input></el-descriptions-item>
    <el-descriptions-item label="第一监护人电话"> <el-input v-model="guardian1_phone"></el-input></el-descriptions-item>
    <el-descriptions-item label="第一监护人微信"> <el-input v-model="guardian1_wechat"></el-input></el-descriptions-item>
    <el-descriptions-item label="第二监护人姓名"> <el-input v-model="guardian2_name"></el-input></el-descriptions-item>
    <el-descriptions-item label="第二监护人电话"> <el-input v-model="guardian2_phone"></el-input></el-descriptions-item>
    <el-descriptions-item label="第二监护人微信"> <el-input v-model="guardian2_wechat"></el-input></el-descriptions-item>
    <el-descriptions-item label="健康状态"> <el-input v-model="situation"></el-input></el-descriptions-item>
    <el-descriptions-item label="描述"> <el-input v-model="des"></el-input></el-descriptions-item>
    <el-descriptions-item label="创建时间"><el-input v-model="createTime" :disabled="true"></el-input></el-descriptions-item>
    <el-descriptions-item label="创建人"><el-input v-model="createName" :disabled="true"></el-input></el-descriptions-item>
    <el-descriptions-item label="更新时间"><el-input v-model="updateTime" :disabled="true"></el-input></el-descriptions-item>
    <el-descriptions-item label="更新人"> <el-input v-model="updateName" :disabled="true"></el-input></el-descriptions-item>
  </el-descriptions>
</template>

   
</template>

<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script>
   
import axios from "axios";
export default {
        data() {
        var old = JSON.parse(localStorage.getItem('concreteOld'));
        console.log(old)
        console.log(old['oldName'])
        return {
            fileList: [],
            dialogImageUrl: "",
            dialogVisible: false,
            fileParam: "",
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
           var birthday = this.birthday
          let aData = new Date();
          let createTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();

            this.fileParam=new FormData();
            this.fileParam.append("file",file["raw"]);
            this.fileParam.append("fileName",file["name"]);
            this.fileParam.append("userid","12323");
            this.filmParam.append("id",localStorage.getItem("old_id"));
            this.fileParam.append("oldName",this.oldName);
            this.fileParam.append("sex",this.sex);
            this.fileParam.append("phone",this.phone);
            this.fileParam.append("ID",this.ID);
            this.fileParam.append("date_in",this.date_in);
            this.fileParam.append("birthday",birthday);
            this.fileParam.append("date_in",this.date_in);
            this.fileParam.append("date_out",this.date_out);
            this.fileParam.append("roomNumber",this.roomNumber);
            this.fileParam.append("guardian1_name",this.guardian1_name);
            this.fileParam.append("guardian1_phone",this.guardian1_phone);
            this.fileParam.append("guardian1_wechat",this.guardian1_wechat);
            this.fileParam.append("guardian2_name",this.guardian2_name);
            this.fileParam.append("guardian2_phone",this.guardian2_phone);
            this.fileParam.append("guardian2_wechat",this.guardian2_wechat);
            this.fileParam.append("situation",this.situation);
            this.fileParam.append("des",this.des);
            this.fileParam.append("createTime",createTime);
            this.fileParam.append("createName",this.createName);
            this.fileParam.append("updateTime",this.updateTime);
            this.filmParam.append("updateName",localStorage.getItem("realName"));
        },
    
     modify() {
        this.$axios.post("http://127.0.0.1:5000/changeOld",this.fileParam
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