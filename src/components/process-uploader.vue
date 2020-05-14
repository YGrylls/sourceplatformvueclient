<template>
    <div >
        <div id="centre">
            <div >
                <p style="font-size: 2em; font-weight: bold; color: lightskyblue;">
                    Process
                    Uploader
                </p>
                <p style="font-size: .5em; font-weight: bold; color: lightskyblue;">
                    JSON files under 10kb
                </p>
            </div>
            <el-upload
                    class="upload"
                    accept=".json"
                    limit="1"
                    drag
                    :action="uploadTarget"
                    >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text" style="font-weight: bold; color: lightskyblue;">{{uploadTip}}</div>
            </el-upload>
            <el-button-group>
                <el-button @click="clickLink" class="gpBtn" :type="linkType" :disabled="linkDisable" icon="el-icon-share">LINK</el-button>
                <el-button @click="clickStart" class="gpBtn" :type="startType" :disabled="startDisable" icon="el-icon-plus">START</el-button>
                <el-button @click="clickComplete" class="gpBtn" :type="completeType" :disabled="completeDisable" icon="el-icon-check">COMPLETE</el-button>
            </el-button-group>
        </div>
        <div id="bg">
        </div>
    </div>
</template>

<script>
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
                targetURL:"http://118.178.181.104:8080",
                uploadTarget: "http://118.178.181.104:8080/start"

            }
        },
        methods:{
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
    #bg{
        width: 100vw;
        height: 100vh;
        position:absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom:0;
        z-index: -100;
        background: url('../assets/bg.jpg') center center no-repeat;

    }
    .upload{
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 1em;
    }
    .gpBtn{
        width: 120px;
        text-align: center;
        font-size: .5em;
    }
    #centre{
        text-align: center;
        width: 60%;
        margin-top: 6em;
        margin-left: auto;
        margin-right: auto;
        max-width: 720px;
        min-width: 400px;
        background-color: rgba(255,255,255,.2);
        border-radius: 10px;
        padding-top: 2em;
        padding-bottom: 2em;
        padding-left:1em;
        padding-right:1em;
        box-shadow: 2px 2px 10px 1px lightskyblue;
        backdrop-filter: blur(10px);
    }

</style>