
<template>
<div class="all">
   <div style=" margin-top:5px;margin-bottom:15px">
            <H2 style="float:left;padding-top: 10px;">养老院日程表</H2>
            <div style="margin-top:10px;margin-left:1080px">  
             <div class="green-cycle" style="float: left;"></div> 
             <div style=" font-size:15px;letter-spacing:1px;float:left">
                老人
             </div>
             <div class="orange-cycle" style="float: left;margin-left:40px"></div> 
              <div style=" font-size:15px;letter-spacing:1px;">
                义工
             </div>
             <br>
             <div class="blue-cycle" style="float: left;"></div> 
              <div style=" font-size:15px;letter-spacing:1px;float:left">
                工作人员
             </div>
             <div class="pink-cycle" style="float: left;margin-left:10px"></div> 
              <div style=" font-size:15px;letter-spacing:1px;">
                探望
             </div>
             </div>
        </div>
    <div class="calendar">
        <div>
        <el-calendar :ShowNextPrevMonth = "false">
            <template slot="dateCell" slot-scope="{data}" >
                <div style="font-size:20px">
                {{ data.day.split('-')[2]}}
                </div>
                <div style="width:100%;" v-for="item in scheduleData" :key="item">
                    <div style="margin: 0 10px width:120px" v-if="item.type=='1' &&data.day.split('-')[1]==7&&(item.date).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                     
                        <div class="green-cycle" style="float: left;"></div> 
                        <div style=" font-size:13px;letter-spacing:2px">
                            {{item.name}}
                        </div>
                    </div>
                    <div style="margin: 0 10px width:120px" v-if="item.type=='2' &&data.day.split('-')[1]==7&&(item.date).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                       
                        <div class="orange-cycle" style="float: left;"></div> 
                        <div style=" font-size:13px;letter-spacing:2px">
                            {{item.name}}
                        </div>
                    </div>
                    <div style="margin: 0 10px width:120px" v-if="item.type=='3' &&data.day.split('-')[1]==7&&(item.date).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                        
                        <div class="blue-cycle" style="float: left;"></div> 
                        <div style="font-size:13px;letter-spacing:2px">
                            {{item.name}}
                        </div>
                    </div>
                    <div style="margin: 0 10px width:120px" v-if="item.type=='4' &&data.day.split('-')[1]==7&&(item.date).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                        
                        <div class="pink-cycle" style="float: left;"></div> 
                        <div style="font-size:13px;letter-spacing:2px">
                            {{item.name}}
                        </div>
                    </div>
                </div>
            </template>
        </el-calendar>
       
    </div>
    </div>

 <div class="part2">
    <div class="button" style="margin-left:1100px;margin-top:20px;">
       
        <el-button  style ="float:right" type="primary" icon="el-icon-plus" circle  @click="dialogFormVisible = true"></el-button>
        <el-dialog title="增加日程" :visible.sync="dialogFormVisible">
        <el-form :model="form">
        
         <el-form-item label="请选择日程日期" prop="date">
        <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-col>
        </el-form-item>
        <el-form-item label="请输入完成人选" prop="type">
              <el-select v-model="form.type" placeholder="请选择人选">
                  <el-option label="老人" value="1"></el-option>
                  <el-option label="义工" value="2"></el-option>
                  <el-option label="工作人员" value="3"></el-option>
                  <el-option label="探望" value="4"></el-option>
              </el-select>
        </el-form-item>
         <el-form-item label="请输入日程内容" :label-width="formLabelWidth">
           <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        
       </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="add()">确 定</el-button>
    </div>
  </el-dialog>
    
  </div>
</div>

</div>

</template>

<script>
  export default {

    name: "PatrolSchedule",
    components: {},
    data() {
        // var schedule = JSON.parse(localStorage.getItem('calendar')||'[]')
        return {
            dialogFormVisible: false,
            dialogVisible: false,
            formLabelWidth: '120px',
            value: new Date(),
            scheduleData: [],
            // scheduleData:[
            //     {
            //         date: "02",
            //         name: "土方开挖",
            //         type:1
            //     },
            //     {
            //         date: "03",
            //         name:  "地基验坑",
            //         type:2
            //     },
            //     {
            //         date: "04",
            //         name:  "地基回填",
            //         type:3
            //     },
            //     {
            //         date: "05",
            //         name:  "基础垫层模",
            //         type:4
            //     },
            //     {
            //         date: "06",
            //         name:  "基础垫层混凝土浇筑",
            //         type:1
            //     },
            //     {
            //         date: "07",
            //         name:  "基础钢筋绑扎",
            //         type:1
            //     },
            // ],

            form: {
                date:'',
                type:'',
                name:'',
            },
        
        };
        
    },
  
    created(){
      this.getData()
    },
    watch:{
        dialogFormVisible(){
          this.getData();
        }
    },
    methods: {
      getData(){
        var that = this
         $.ajax({
                url:'http://127.0.0.1:5000/getCalendar',
                type:'get',
                dataType:'json',
                success:function(data){
                    alert('正常');
                    localStorage.setItem("calendar",JSON.stringify(data));
                    that.scheduleData= JSON.parse(localStorage.getItem('calendar')||'[]')
                },
                error:function(){
                    alert('异常')
                }
            });
      },
      click(){
        console.log(this.scheduleData)
      },
      handleClick(row) {
        console.log(row);
      },
       add:function(){
         console.log(this.form.date)
          $.ajax({
               url:'http://127.0.0.1:5000/modifyCalendar',
             
              data:JSON.stringify({"date":this.form.date,
                                    "type":this.form.type,
                                    "name":this.form.name,}),
               type:'post',
               dataType:'json',
               success:function(data){
                alert('正常');
                this.$router.push('/room')
               },
              error:function () {
                alert('异常');
                this.$router.push('/room')
             }
            })
       },
    }
  }
</script>


<style scoped>
.el-calendar-day {
    box-sizing: border-box;
    padding: 5px;
    height: 80px;
}
i#icon{
    font-size:xx-large;
    float:right;
    margin-top: 10px;
    margin-right:5px;
}

</style>
<style>
  .el-calendar-table .el-calendar-day{
    height: 130px;
  }
  .green-cycle{
  margin-top:7px;
  margin-right:5px;
  width: 7px;      
  height: 7px;
  display: inline-block;
  background-color: #73d13d;
  border-radius: 50%;
}
.orange-cycle{
  margin-top:7px;
  margin-right:5px;
  width: 7px;      
  height: 7px;
  display: inline-block;
  background-color: #ff8f00;
  border-radius: 50%;
}
.blue-cycle{
  margin-top:7px;
  margin-right:5px;
  width: 7px;      
  height: 7px;
  display: inline-block;
  background-color: #03a9f4;
  border-radius: 50%;
}
.pink-cycle{
  margin-top:7px;
  margin-right:5px;
  width: 7px;      
  height: 7px;
  display: inline-block;
  background-color: #ff85c0;
  border-radius: 50%;
}
</style>



