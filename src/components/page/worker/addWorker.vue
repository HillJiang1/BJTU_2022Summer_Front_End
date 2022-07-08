
<template>
<div style="width:500px;margin-left:270px;">
    <el-form ref="form" :model="form" label-width="140px">
  <el-form-item label="工作人员姓名">
    <el-input v-model="form.workerName"></el-input>
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
  <el-form-item label="入职日期">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="form.hire_date"  style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>


<el-form-item label="工作人员电话">
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
  
  <el-form-item label="工作人员身份证号">
    <el-input v-model="form.ID"></el-input>
  </el-form-item>

  <el-form-item label="描述">
    <el-input v-model="form.des"></el-input>
  </el-form-item>

  <el-form-item label="设置工作人员头像">
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
    <el-button type="primary" @click="addWorker"  style="width:50%;margin-left:80px;margin-top:10px">添加工作人员</el-button>
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
          workerName:'',
          sex:'',
          phone:'',
          ID:'',
          birthday:'',
          hire_date:'',
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
          let aData = new Date();
          let createTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();

            this.fileParam = new FormData();
            this.fileParam.append("file", file["raw"]);
            this.fileParam.append("fileName", file["name"]);
            this.fileParam.append("workerName", this.form.workerName);
            this.fileParam.append("sex",this.form.sex);
            this.fileParam.append("phone",this.form.phone);
            this.fileParam.append("ID",this.form.ID);
            this.fileParam.append("birthday",this.form.birthday);
            this.fileParam.append("hire_date",this.form.hire_date);
            this.fileParam.append("des",this.form.des);
            this.fileParam.append("createTime",createTime);
            this.fileParam.append("createName",localStorage.getItem("realName"));
        },
      addWorker(){
        var that=this
        this.$axios.post("http://127.0.0.1:5000/addWorker",this.fileParam
            ).then(res =>{
             if(res.data == 1)
                {
                    alert("添加工作人员成功");
                    that.$router.push('/oldMen');
                }
                else
                    alert("添加工作人员失败")
          })

//           $.ajax({
//               url:'http://127.0.0.1:5000/addWorker',
//               type:'post',
//               dataType:'json',
//               data:JSON.stringify({"workerName":this.form.workerName,"sex":this.form.sex,"phone":this.form.phone,
//                                     "ID":this.form.ID,"birthday":birthday,"hire_date":this.form.hire_date,
//                                     "des":this.form.des,"createTime":createTime,"createName":localStorage.getItem("realName")}),
//               success:function(data){
//                 if(data == 1)
//                 {
//                     alert("添加工作人员成功");
//                     that.$router.push('/workers');
//                 }
//                 else
//                     alert("添加工作人员失败")
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