
<template>
<div style="width:500px;margin-left:270px;">
    <el-form ref="form" :model="form" label-width="140px">
  <el-form-item label="义工姓名">
    <el-input v-model="form.volunteerName"></el-input>
  </el-form-item>

    <el-form-item label="性别" prop="sex">
      <el-select v-model="form.sex" placeholder="请选择您的性别">
      <el-option label="男" value="男"></el-option>
      <el-option label="女" value="女"></el-option>
      </el-select>
  </el-form-item>
<el-form-item label="出生日期">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" v-model="form.birthday" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>

 <el-form-item label="入职时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="form.hire_date"  style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>


<el-form-item label="义工电话">
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
  
  <el-form-item label="义工身份证号">
    <el-input v-model="form.ID"></el-input>
  </el-form-item>

  <el-form-item label="工时">
    <el-input v-model="form.workTime"></el-input>
  </el-form-item>

  <el-form-item label="设置义工头像">
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
    <el-button type="primary" @click="addVolunteer" style="width:50%;margin-left:80px;margin-top:10px">添加义工</el-button>
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
        uploadDisabled:'',
        form: {
          volunteerName:'',
          sex:'',
          phone:'',
          ID:'',
          birthday:'',
          workTime:'',
          hire_date:'',
          fileList: [],
          dialogImageUrl: "",
          dialogVisible: false
        }
      }
    },
    computed: {
   
    uploadDisabled:function() {
        return this.form.fileList.length >0
    },
  
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
            this.fileParam.append("volunteerName",this.form.volunteerName);
            this.fileParam.append("sex",this.form.sex);
            this.fileParam.append("phone",this.form.phone);
            this.fileParam.append("ID",this.form.ID);
            this.fileParam.append("birthday",this.form.birthday);
            this.fileParam.append("workTime",this.form.workTime);
            this.fileParam.append("hire_date",this.form.hire_date);
            this.fileParam.append("resign_date"," ");
        },
      addVolunteer(){
        var that=this
        this.$axios.post("http://127.0.0.1:5000/addVolunteer",this.fileParam
            ).then(res =>{
             if(res.data == 1)
                {
                    alert("添加义工成功");
                    that.$router.push('/volunteers');
                }
                else
                    alert("添加义工失败")
          })
//           $.ajax({
//               url:'http://127.0.0.1:5000/addVolunteer',
//               type:'post',
//               dataType:'json',
//               data:JSON.stringify({"volunteerName":this.form.volunteerName,"sex":this.form.sex,"phone":this.form.phone,
//                                     "ID":this.form.ID,"birthday":birthday,"workTime":this.form.workTime}),
//               success:function(data){
//                 if(data == 1)
//                 {
//                     alert("添加义工成功");
//                     that.$router.push('/volunteers');
//                 }
//                 else
//                     alert("添加义工失败")
//                }
//             })
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