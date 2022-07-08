
<template>
<div style="width:500px;margin-left:270px;">
    <el-form ref="form" :model="form" label-width="140px">
  <el-form-item label="老人姓名">
    <el-input v-model="form.oldName"></el-input>
  </el-form-item>

   <el-form-item label="出生日期">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" v-model="form.birthday" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="进入养老院日期">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="form.date_in"  style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>

  <el-form-item label="性别" prop="sex">
      <el-select v-model="form.sex" placeholder="请选择您的性别">
      <el-option label="男" value="男"></el-option>
      <el-option label="女" value="女"></el-option>
      </el-select>
  </el-form-item>
<el-form-item label="老人电话">
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
  <el-form-item label="老人身份证号">
    <el-input v-model="form.ID"></el-input>
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

  <el-form-item label="身体状况">
    <el-input type="textarea" v-model="form.situation"></el-input>
  </el-form-item>
  <el-form-item label="描述">
    <el-input type="textarea" v-model="form.des"></el-input>
  </el-form-item>
  
  <el-form-item label="设置老人头像">
    <div>
        <el-upload
            v-model="form.fileList"
            ref="uploadref"
            action="#"
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
    <el-button type="primary" @click="addOld"  style="width:50%;margin-left:80px;margin-top:10px">添加老人</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script>
  export default {
    data() {
      return {
        fileParam: "",
        form: {
          oldName: '',
          sex:'',
          phone:'',
          ID:'',
          birthday:'',
          date_in:'',
          roomNumber:'',
          guardian1_name:'',
          guardian1_phone:'',
          guardian1_wechat:'',
          guardian2_name:'',
          guardian2_phone:'',
          guardian2_wechat:'',
          situation:'',
          des:'',
          fileList: [],
          dialogImageUrl: "",
          dialogVisible: false,
        }
      }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.form.dialogImageUrl = file.url;
            this.form.dialogVisible = true;
        },
        handleChange(file, fileList) {
          var birthday = this.form.birthday
          let aData = new Date();
          let createTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();

            this.fileParam = new FormData();
            this.fileParam.append("file", file["raw"]);
            this.fileParam.append("fileName", file["name"]);
            this.fileParam.append("oldName", this.form.oldName);
            this.fileParam.append("sex",this.form.sex);
            this.fileParam.append("phone",this.form.phone);
            this.fileParam.append("birthday",birthday);
            this.fileParam.append("ID",this.form.ID);
            this.fileParam.append("date_in",this.form.date_in);
            this.fileParam.append("date_out"," ");
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
            this.fileParam.append("createName",localStorage.getItem("realName"));
            this.fileParam.append("updateTime",createTime);
            this.fileParam.append("updateName",localStorage.getItem("realName"));
        },


      addOld(){
        var that=this
          // var birthday = this.form.birthday
          // let aData = new Date();
          // let createTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
          this.$axios.post("http://127.0.0.1:5000/addOld",this.fileParam
            ).then(res =>{
             if(res.data == 1)
                {
                    alert("添加老人成功");
                    that.$router.push('/oldMen');
                }
                else
                    alert("添加老人失败")
          })
          
          
          
//           $.ajax({
//               url:'http://127.0.0.1:5000/addOld',
//               type:'post',
//               dataType:'json',
//               data:JSON.stringify({"oldName": this.form.oldName,"sex":this.form.sex,"phone":this.form.phone,"birthday":birthday,"ID":this.form.ID,
//                                     "date_in":this.form.date_in,"date_out":"","roomNumber":this.form.roomNumber,
//                                     "guardian1_name":this.form.guardian1_name,"guardian1_phone":this.form.guardian1_phone,
//                                     "guardian1_wechat":this.form.guardian1_wechat,"guardian2_name":this.form.guardian2_name,
//                                     "guardian2_phone":this.form.guardian2_phone, "guardian2_wechat":this.form.guardian2_wechat,
//                                     "situation":this.form.situation,"des":this.form.des,"createTime":createTime,
//                                     "createName":localStorage.getItem("realName"),"updateTime":createTime,"updateName":localStorage.getItem("realName")}),
//               success:function(data){
//                 if(data == 1)
//                 {
//                     alert("添加老人成功");
//                     that.$router.push('/oldMen');
//                 }
//                 else
//                     alert("添加老人失败")
//                }
//             })
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