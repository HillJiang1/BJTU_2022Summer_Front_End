<template>

 <el-descriptions class="margin-top" title="详情信息" :column="1" :size="size" border>
    <template slot="extra">
      <el-button type="primary" size="small" @click="modify()">提交</el-button>
    </template>
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
   
    // var old = {"oldName":121,"sex":111}
  export default {
    // "updateName":localStorage.getItem("userName"),
    // let aData = new Date();
    // lete uodateTime=aData.getFullYear()+"-"+(aData.getMonth()+1)+"-"+aData.getDate();

    data() {
       var old = JSON.parse(localStorage.getItem('concreteOld'));
    console.log(old)
    console.log(old['oldName'])
      return {
        dialogFormVisible1:false,
        dialogFormVisible2:false,
        dialogFormVisible3:false,
        dialogFormVisible4:false,
        dialogFormVisible5:false,
        dialogFormVisible6:false,
        dialogFormVisible7:false,
        dialogFormVisible8:false,
        dialogFormVisible9:false,
        dialogFormVisible10:false,
        dialogFormVisible11:false,
        dialogFormVisible12:false,
        dialogFormVisible13:false,
        dialogFormVisible14:false,

    
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

        // oldName:'111',
        // sex:'男',
        // phone:'',
        // ID:'',
        // birthday:'',
        // date_in:'',
        // date_out:'',
        // roomNumber:'',
        // guardian1_name:'',
        // guardian1_phone:'',
        // guardian1_wechat:'',
        // guardian2_name:'',
        // guardian2_phone:'',
        // guardian2_wechat:'',
        // situation:'',
        // des:'',
        // createTime:'',
        // createName:'',
        // updateTime:'',
        // updateName:'',


      }
    },
    methods: {
        modify:function(){
         var that = this
         let aData = new Date();
          let updateTime = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
          alert(that.sex)
         console.log(that.oldName)
          $.ajax({
              url:'http://127.0.0.1:5000/changeOld',
             
              data:JSON.stringify({
                                    "id":localStorage.getItem("old_id"),
                                    "oldName":that.oldName,
                                    "sex":that.sex,
                                    "phone":that.phone,
                                    "ID":that.ID,
                                    "date_in":that.date_in,
                                    "birthday":that.birthday,
                                    "date_in":that.date_in,
                                    "date_out":that.date_out,
                                    "roomNumber":that.roomNumber,
                                    "guardian1_name":that.guardian1_name,
                                    "guardian1_phone":that.guardian1_phone,
                                    "guardian1_wechat":that.guardian1_wechat,
                                    "guardian2_name":that.guardian2_name,
                                    "guardian2_phone":that.guardian2_phone,
                                    "guardian2_wechat":that.guardian2_wechat,
                                    "situation":that.situation,
                                    "des":that.des,
                                    "createTime":that.createTime,
                                    "createName":that.createName,
                                    "updateTime":updateTime,
                                    "updateName":localStorage.getItem("realName"),}),
               
               type:'post',
               dataType:'json',
               success:function(data){
                 if(data == 1)
                 {
                  alert('修改成功');
                  this.$router.push('/oldMen')
                 }else
                 {
                   alert('修改失败')
                 }
               
               },
              error:function () {
                alert('异常')
             }
            })
       
       },
        mounted:function(){
            var mes = JSON.parse(localStorage.getItem("oldMen"))
            this.ID = mes['id'];
            this.oldName = mes['oldName'];
            this.sex=mes['sex'];
            //  this.sex = array[0]['totalCredit'];
            console.log(this.ID)
            console.log(this.sex);
            // delete array.totalCredit;
            // this.formData = array;
    }
  
    
  }
  }
</script>