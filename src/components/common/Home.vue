<template>

   
    <div class="wrapper" color = "black">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                 <!-- <el-image :src="require('@/components/common/back.png')" style="margin-left:200px"></el-image>               -->
                     <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
                
               
            </div>
        </div>
    </div>

</template>

<script>
import vHead from './Header.vue';


// 管理员端
import vSidebar from './Sidebar.vue';
import vTags from './Tabs.vue';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false,
            fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
            
        };
        
    },
    components: {
        vHead,
        vSidebar,
        vTags,
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    }
};
</script>

<style>
/* #building{
  background:url("../common/back.png");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
} */

</style>