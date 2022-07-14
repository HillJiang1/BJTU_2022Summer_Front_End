<template>
    <el-table :data="tableData" border style="width: 100%"  >
    <el-table-column prop="id" align="center" label="id" width="80"></el-table-column>
    <el-table-column prop="type" align="center" label="类型" width="170"></el-table-column>
    <el-table-column prop="time" align="center" label="时间" width="180"></el-table-column>
    <el-table-column prop="destination" align="center" label="地点" width="200"></el-table-column>
    <el-table-column prop="des" align="center" label="描述" width="220"></el-table-column>
    <el-table-column prop="old_id" align="center" label="老人ID" width="180"></el-table-column>
    <el-table-column prop="pic" align="center" label="图片" width="182" show-overflow-tooltip>
        <template slot-scope="scope">
               <img :src="scope.row.image" width="50" height="50" v-image-preview/>
        </template>
    </el-table-column>
    </el-table>
</template>

// <script>

export default {
  
    data() {
        var record = JSON.parse(localStorage.getItem('record')||'[]');
        return{
            tableData:record,
        // tableData:[
        //   {
        //     id:'1',
        //     type:'1',
        //     time:'1',
        //     destination:'1',
        //     des:'1',
        //     old_id:'1',
        //     image :"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        //   },
        //   {
        //     id:'1',
        //     type:'1',
        //     time:'1',
        //     destination:'1',
        //     des:'1',
        //     old_id:'1',
        //     image :"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        //   }
        // ]
        }
        // var array = JSON.parse(localStorage.getItem('record')||'[]');
        // console.log(array)
        // return {
        //     fileList: [],
        //     dialogImageUrl: "",
        //     dialogVisible: false,
        //     fileParam: "",
        //     tableData: array,
        // };
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
    },
}
</script>