<template>
    <div v-loading.fullscreen.lock="loading">
        <p style="font-size: 2em; font-weight: bold; color: lightskyblue; margin: 1em">
            {{currentDisplayName}}
        </p>
        <div>
            <p style="font-size: .5em; font-weight: bold; color: lightskyblue; margin: 1em;">
                Update Display Name
            </p>
            <el-input v-model="newDisplayName" placeholder="Enter New Display Name"
                      style="width: 60%; max-width: 460px"></el-input>
            <el-button @click="updateDisplayName"  type="primary" style="width: 20%; margin-left: 4px; min-width: 6em; max-width: 230px " icon="el-icon-finished">Submit</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Display",
        data(){
            return{
                currentDisplayName:"No Display Name for Your Org Now",
                newDisplayName:"",
                loading:false,
            }
        },
        mounted(){
            this.fetchDisplayName();
        },
        methods:{
            updateDisplayName(){
                const that = this;
                this.loading=true;
                this.$http.post('/changeDisplay',{key:this.newDisplayName}).then((resp)=>{
                    that.loading=false;
                    if(resp.data.errCode!=null){
                        that.$message( {
                            message:resp.data.errCode,
                            type:"error"
                        });
                    }
                    that.$message( {
                        message:"Update Done",
                        type:"success"
                    });
                    that.currentDisplayName=that.newDisplayName;
                    that.newDisplayName="";
                }).catch((err)=>{
                    that.loading=false;
                    that.$message( {
                        message:err,
                        type:"error"
                    });
                })
            },

            fetchDisplayName(){
                const that = this;
                this.loading=true;
                this.$http.post('/getDisplay',{}).then((resp)=>{
                    that.loading=false;
                    if(resp.data.errCode!=null){
                        that.$message( {
                            message:resp.data.errCode,
                            type:"error"
                        });
                    }
                    that.currentDisplayName=resp.data.data;
                }).catch((err)=>{
                    that.loading=false;
                    that.$message( {
                        message:err,
                        type:"error"
                    });
                    that.currentDisplayName="<Error>";
                })
            },
        }
    }
</script>

<style scoped>

</style>