<template>
    <div class="login-page">
        <div class="login-box">
            <div class="title">
                <span>新康医疗后台登陆</span>
            </div>
            <div class="login-inputbox">
                <div class="item row1">
                    <span>
                        <el-input placeholder="请输入用户名" type="text" name="username" id="username" v-model="UserInfo.username">
                            <template slot="prepend">用户：</template>
                        </el-input>
                    </span>
                </div>
                <div class="item row2">
                    <span>
                        <el-input placeholder="请输入密码" type="password" name="password" id="password" v-model="UserInfo.password">
                            <template slot="prepend">密码：</template>
                        </el-input>
                    </span>
                </div>
                <div class="item row3">
                    <span ><el-button style="width:100%" type="primary" @click="submit">登陆</el-button></span>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
    export default {
        data(){
            return{
                UserInfo:{
                    username:null,
                    password:null
                }
            }
        },
        methods:{
            submit:function(){
                let params=this.UserInfo;//登陆http请求参数
                console.log(params)
            }
        }
    }
</script>
<style scoped>
.login-page{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../assets/bj_03.png')
}
.login-box{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border:1px solid rgb(250, 249, 249);
}
.item{
    margin-top:5px; 
}
.login-inputbox{
    padding: 20px;
}
.el-button--primary{
    background-color: rgb(31, 106, 245);
    color: aliceblue;
}
.title{
    background-color: rgb(32, 32, 32);
    color: aliceblue;
    width: 100%;
    height: 40px;
    line-height: 40px;
}
</style>

