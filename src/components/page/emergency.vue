<template>
    <el-table :data="tableData" height="250" border style="width: 100%">
    <el-table-column prop="id" label="id" width="60"></el-table-column>
    <el-table-column prop="type" label="类型" width="100"></el-table-column>
    <el-table-column prop="time" label="时间" width="180"></el-table-column>
    <el-table-column prop="destination" label="地点" width="180"></el-table-column>
    <el-table-column prop="des" label="描述" width="220"></el-table-column>
    <el-table-column prop="old_id" label="老人ID" width="180"></el-table-column>
    <el-table-column prop="pic" label="图片" show-overflow-tooltip></el-table-column>
    </el-table>
</template>

<script>
  export default {
    data() {
      var array=JSON.parse(localStorage.getItem("record"||'[]'))
      return {
             tableData:array
      }
    }
  }
</script>