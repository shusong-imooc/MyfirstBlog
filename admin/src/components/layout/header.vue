<template>
  <div class="header-box">
      <div>
          <div>
              head-msg
          </div>
          <div>
              user-info
          </div>
      </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            userInfo:tihs.$store.state.UserInfo,
            navmenu:null
        }
    },
    created(){
        

    },
    methods:{
        navquery(userid){
            //根据id获取该user的一级导航 http请求
        }
    }
}
</script>

