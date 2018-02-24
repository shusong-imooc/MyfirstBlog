<template>
  <div>
      <nav>
          <router-link ></router-link>
      </nav>
  </div>
</template>
<script>
export default {
  data(){
      return{
          navlist:this.$stroe.state.navlist
      }
  }
}
</script>

