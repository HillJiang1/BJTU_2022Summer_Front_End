<template>
    <div>
        <el-upload
            v-model="fileList"
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
        <el-dialog v-model="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
        <button @click="handleClick">shangchuan</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            fileList: [],
            dialogImageUrl: "",
            dialogVisible: false,
            fileParam: "",
        };
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleChange(file, fileList) {
            this.fileParam = new FormData();
            this.fileParam.append("file", file["raw"]);
            this.fileParam.append("fileName", file["name"]);
        },
        handleClick() {
            axios
                .post("http://127.0.0.1:5000/savePicture", this.fileParam)
                .then((response) => {
                    console.log(response);
                    this.fileList = [];
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
};
</script>