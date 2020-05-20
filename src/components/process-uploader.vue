<template>
    <div style="min-width: 960px">
        <el-row class="row">
            <div style="width:100%;padding: 1em 0 1em 0; font-size: 2em; background-color: lightskyblue; color: white;">
                Product Traceability Platform Interface
            </div>
        </el-row>
        <el-row class="row">
            <el-col :span="4" style="height: 100%">
                <el-menu style="margin: 0; text-align: left; font-weight: bold; border: 0"
                    default-active="upload"
                    active-text-color="lightskyblue"
                    text-color="grey"
                    :router="true">
                    <el-menu-item index="upload">
                        <i class="el-icon-upload2"></i>
                        <span slot="title">Process Upload</span>
                    </el-menu-item>
                    <el-menu-item index="display">
                        <i class="el-icon-finished"></i>
                        <span slot="title">Display Name</span>
                    </el-menu-item>

                </el-menu>
            </el-col>
            <el-col :span="18" style="border-left: solid 1px #e6e6e6; padding:1em">
                <router-view></router-view>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import {targetURL} from "../url";
    export default {
        name: "ProcessUploader",
        data(){
            return {
                linkType:"primary",
                startType:"success",
                completeType:"primary",

                linkDisable:false,
                startDisable:true,
                completeDisable:false,

                uploadTip:"START PROCESS",
                targetURL:targetURL,
                uploadTarget: targetURL + "/start",

                loading:false,
            }
        },
        methods:{
            uploadLoading(){
                this.loading=true;
            },
            uploadSuc(resp){
                console.log(resp);
                this.loading=false;
                if (resp.errCode!=null){
                    this.uploadErr(resp.errCode);
                } else{
                    this.$notify({
                        duration:0,
                        title:'Success',
                        message: 'Fail List: '+ resp.data
                    })
                }

            },
            uploadErr(err){
                this.loading=false;
                this.$notify({
                    duration:0,
                    title:'Error',
                    message: err
                })
            },
            clickLink(){
                this.linkType="success";
                this.linkDisable=true;
                this.completeType="primary";
                this.completeDisable=false;
                this.startType="primary";
                this.startDisable=false;
                this.uploadTarget = this.targetURL+"/link";
                this.uploadTip="LINK PROCESS";
            },
            clickStart(){
                this.linkType="primary";
                this.linkDisable=false;
                this.completeType="primary";
                this.completeDisable=false;
                this.startType="success";
                this.startDisable=true;
                this.uploadTarget = this.targetURL+"/start";
                this.uploadTip="START PROCESS";
            },
            clickComplete(){
                this.linkType="primary";
                this.linkDisable=false;
                this.completeType="success";
                this.completeDisable=true;
                this.startType="primary";
                this.startDisable=false;
                this.uploadTarget = this.targetURL+"/complete";
                this.uploadTip="COMPLETE PROCESS";
            }
        }
    }
</script>

<style scoped>


    .row{
        margin:0
    }
</style>