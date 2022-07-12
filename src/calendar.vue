<template>
<div>
<el-calendar >

    <template slot="dateCell" slot-scope="{date:date}">
        {{date.day.split('-').slice(1).join('-')}}
        <div style="width:100%;" v-for="item in scheduleData" :key="item">
            <el-tag type="danger" v-if="(item.workingDay).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                {{item.content}}
            </el-tag>
        </div>
    </template>
</el-calendar>

 <i id="icon" class = "el-icon-circle-plus" @click = "modify"></i>
 </div>
</template>

<script>
import { Calendar } from '@fullcalendar/core';
var array= JSON.parse(localStorage.getItem("calendar")|| '[]');
console.log(array)
  export default {
    components:{},
    data() {
      return {
        value: new Date(),

        scheduleData:[]
     
      }
    },
    mounted:function(){
        for(var i=0;i<array.length;i++){
            var num=array[i]['date']
            if(num[1]==1){
                workingDay=array[i].date
                content=array[i].name
            }
        }
        
    },
    methods:{
     modify:function(){
            alert(111)
            this.$router.push('/addCalendar')
        },
    }
  };


</script>

<style scoped>
i#icon{
    font-size:xx-large;
    float:right;
    margin-top: 10px;
    margin-right:5px;
}
</style>
