<template>
    <div>
        <el-upload
            v-model="fileList"
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
        <el-dialog v-model="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
        <button @click="handleClick">点我保存图片</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            fileList: [{url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"}],
            dialogImageUrl: "",
            dialogVisible: false,
            fileParam: "",
            uploadDisabled:'disabled'
        };
    },
    methods: {
        handleRemove(file, fileList) {
            this.fileList.pop();
            console.log(file, fileList);
            if(fileList.length ==0){
              this.uploadDisabled=''
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleChange(file, fileList) {
            if (fileList.length >0){
            this.uploadDisabled ='disabled'
          }
            this.fileParam = new FormData(); //创建form对象
            this.fileParam.append("file", file["raw"]);
            this.fileParam.append("fileName", file["name"]);
        },
        // handleClick() {
        //     axios
        //         .post("http://127.0.0.1:5000/savePicture", this.fileParam)
        //         .then((response) => {
        //             console.log(response);
        //             this.fileList = [];
        //         })
        //         .catch((e) => {
        //             console.log(e);
        //         });
        // },
    },
};
</script>

<style>
.disabled .el-upload--picture-card{
   display: none;
}
</style>