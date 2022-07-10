<template>
    <div><h1>义工离职/入职对比</h1><br>
        <img :src=url width="500" height="300" v-image-preview/>
    </div>
</template>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>

<script>
var image = localStorage.getItem("volunteerImage")
export default{
    
    data(){
        return{
            // url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"  
            url:"http://127.0.0.1:5000/static/image/volunteer.png"  
        }
    }
}
</script>
