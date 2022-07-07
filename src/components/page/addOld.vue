
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
        }
      }
    },
    methods: {
      addOld(){
        var that=this
          var birthday = this.form.birthday
          let aData = new Date();
          let createTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
          $.ajax({
              url:'http://127.0.0.1:5000/addOld',
              type:'post',
              dataType:'json',
              data:JSON.stringify({"oldName": this.form.oldName,"sex":this.form.sex,"phone":this.form.phone,"birthday":birthday,"ID":this.form.ID,
                                    "date_in":this.form.date_in,"date_out":"","roomNumber":this.form.roomNumber,
                                    "guardian1_name":this.form.guardian1_name,"guardian1_phone":this.form.guardian1_phone,
                                    "guardian1_wechat":this.form.guardian1_wechat,"guardian2_name":this.form.guardian2_name,
                                    "guardian2_phone":this.form.guardian2_phone, "guardian2_wechat":this.form.guardian2_wechat,
                                    "situation":this.form.situation,"des":this.form.des,"createTime":createTime,
                                    "createName":localStorage.getItem("realName"),"updateTime":createTime,"updateName":localStorage.getItem("realName")}),
              success:function(data){
                if(data == 1)
                {
                    alert("添加老人成功");
                    that.$router.push('/oldMen');
                }
                else
                    alert("添加老人失败")
               }
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