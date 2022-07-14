<template>
    <div>
    <h2 style="margin-left:10px">详细信息</h2>
    <div class = example style="width:200px;height:150px;margin-left:20px;margin-top:15px;">
        <img src="./worker.png" width="50" height="50" style="float:left;padding-top: 8px;padding-left: 5px;" v-image-preview/>
        <p style=" font-weight: bold;font-size:20px;font-style: italic;padding-top: 22px;">工作人员人数</p>
        <p><div style=" font-weight: bold;font-size:30px;font-style: italic;padding-top: 22px;padding-left: 80px;">{{allno}}人</div></p>
    </div>
    <div class = example style="width:200px;height:150px;position: absolute;left: 290px;top: 85px;">
        <img src="./inworker.png" width="50" height="50" style="float:left;padding-top: 15px;padding-left:20px;" v-image-preview/>
        <p style=" font-weight: bold;font-size:20px;font-style: italic;padding-top: 22px;padding-left: 12px;">入职人数</p>
        <p><div style=" font-weight: bold;font-size:20px;font-style: italic;padding-left: 90px;">{{inno}}人</div></p>
        
        <img src="./outworker.png" width="50" height="50" style="float:left;padding-top: 20px;padding-left: 20px;" v-image-preview/>
        <p style=" font-weight: bold;font-size:20px;font-style: italic;padding-top: 22px;padding-left: 12px;">离职人数</p>
       <p><div style=" font-weight: bold;font-size:20px;font-style: italic;padding-left: 90px;">{{outno}}人</div></p>
    </div>
    <div>
        <h2 style="margin-left:10px;margin-top:15px">工作人员离职/入职对比</h2><br>
        <img :src=url width="500" height="300" v-image-preview/>
    </div>
    </div>
</template>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>

<script>
export default{
    data(){
        var w = JSON.parse(localStorage.getItem('w_details'));

        return{
            // url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"  
            url:"http://127.0.0.1:5000/static/image/worker.png",
             allno:w.allno,
            outno:w.outno,
            inno:w.inno, 
        }
    }
}
</script>

<style scoped>
.example{
    background: rgba(255, 255, 255, 1);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    border-radius: 25px;
    box-shadow:inset 0 0 6px rgba(255, 255, 255, 0.2);
}

</style>