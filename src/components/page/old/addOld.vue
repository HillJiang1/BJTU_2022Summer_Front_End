
<template>
<div style="width:500px;margin-left:270px;">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px">
  <el-form-item label="老人姓名"  prop="name">
    <el-input v-model="form.oldName"></el-input>
  </el-form-item>

   <el-form-item label="出生日期" prop="birthday">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" v-model="form.birthday" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="进入养老院日期" prop="date_in">
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
<el-form-item label="老人电话" prop="phone">
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
  <el-form-item label="老人身份证号" prop="ID">
    <el-input v-model="form.ID"></el-input>
  </el-form-item>

 
  <el-form-item label="房间号" prop="rno">
    <el-input v-model="form.roomNumber"></el-input>
  </el-form-item>
  <el-form-item label="第一监护人姓名" prop="g1name">
    <el-input v-model="form.guardian1_name"></el-input>
  </el-form-item>
  <el-form-item label="第一监护人电话" prop="g1tel">
    <el-input v-model="form.guardian1_phone"></el-input>
  </el-form-item>
  <el-form-item label="第一监护人微信" prop="g1wechat">
    <el-input v-model="form.guardian1_wechat"></el-input>
  </el-form-item>

  <el-form-item label="第二监护人姓名" prop="g2name">
    <el-input v-model="form.guardian2_name"></el-input>
  </el-form-item>
  <el-form-item label="第二监护人电话" prop="g2tel">
    <el-input v-model="form.guardian2_phone"></el-input>
  </el-form-item>
  <el-form-item label="第二监护人微信" prop="g2wechat">
    <el-input v-model="form.guardian2_wechat"></el-input>
  </el-form-item>

  <el-form-item label="身体状况" prop="situation">
    <el-input type="textarea" v-model="form.situation"></el-input>
  </el-form-item>
  <el-form-item label="描述" prop="des">
    <el-input type="textarea" v-model="form.des"></el-input>
  </el-form-item>
  
  <el-form-item label="设置老人头像">
    <div>
        <el-upload
            v-model="form.fileList"
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
    <el-button type="primary" @click="addOld"  style="width:50%;margin-left:80px;margin-top:10px">添加老人</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script>
  export default {
    data() {
      let validatePhone =(rule,value,callback)=>{
            if(!value){
                callback(new Error('手机号不能为空'));
            }
            if (!/^1[3456789]\d{9}$/.test(value)){
                callback(new Error('手机号不正确！'));
            }
        };
        let validatePhone1 =(rule,value,callback)=>{
            if(!value){
                callback(new Error('手机号不能为空'));
            }
            if (!/^1[3456789]\d{9}$/.test(value)){
                callback(new Error('手机号不正确！'));
            }
        };
        
        
        let validatePhone2 =(rule,value,callback)=>{
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
        fileParam: "",
        uploadDisabled:'',
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
        },
        rules:{
          des: [{required: true, message: 'please enter your description', trigger: 'blur'}],
          situation: [{required: true, message: 'please enter  situation', trigger: 'blur'}],
          birthday: [{required: true, message: 'please enter your birthday', trigger: 'blur'}],
          date_in: [{required: true, message: 'Please enter the entry date', trigger: 'blur'}],
          ID: [{validator:validateID ,  trigger: 'blur'}],
          phone: [{validator:validatePhone, trigger: 'blur'}],
        }
      }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
            if(fileList.length == 0){
             this.uploadDisabled =''}
        },
        handlePictureCardPreview(file) {
            this.form.dialogImageUrl = file.url;
            this.form.dialogVisible = true;
        },
        handleChange(file, fileList) {
          if(fileList.length>0){
              this.uploadDisabled = 'disabled'
          }
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
 
      }
    }
  }
</script>

<style>
.disabled .el-upload--picture-card {
    display: none;
}
</style>

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