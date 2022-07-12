<template>
    <div><h1>老人年龄分析图</h1><br>
        <img :src=url width="500" height="300" v-image-preview/>
    </div>
</template>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>

<script>
var image = localStorage.getItem("oldImage")
console.log(222)
console.log(image)
export default{
    data(){
        
        return{
            url : "http://127.0.0.1:5000/static/image/oldAna.png"
        }
    }
}
</script>
