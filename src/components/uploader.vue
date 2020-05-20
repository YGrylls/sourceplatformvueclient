<template>
    <div>
        <el-col :span="16" class="centre" v-loading.fullscreen.lock="loading">
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
                    drag
                    :action="uploadTarget"
                    :show-file-list=false
                    :on-success="uploadSuc"
                    :on-error="uploadErr"
                    :before-upload="uploadLoading"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text" style="font-weight: bold; color: lightskyblue;">{{uploadTip}}</div>
            </el-upload>
            <el-button-group>
                <el-button @click="clickLink" class="gpBtn" :type="linkType" :disabled="linkDisable" icon="el-icon-share">LINK</el-button>
                <el-button @click="clickStart" class="gpBtn" :type="startType" :disabled="startDisable" icon="el-icon-plus">START</el-button>
                <el-button @click="clickComplete" class="gpBtn" :type="completeType" :disabled="completeDisable" icon="el-icon-check">COMPLETE</el-button>
            </el-button-group>
        </el-col>
        <el-col :span="8" class="centre">
            <div>
                <p style="font-size: 2em; font-weight: bold; color: lightskyblue;">
                    JSON Format
                    Tips
                </p>
                <el-input type="textarea" autosize v-model="jsonForm" readonly>

                </el-input>
            </div>
        </el-col>
    </div>
</template>

<script>
    import {targetURL} from "../url";
    const startForm =
        "{\n" +
        "    \"2020051501\":{\n" +
        "        \"optionName\":\"Sale\",\n" +
        "        \"startTime\":1589517152000,\n" +
        "        \"startPosition\":\"YangPu\",\n" +
        "        \"preKey\":[\n" +
        "            \"demo1MSP:demo1\"\n" +
        "        ],\n" +
        "        \"spec\":\"\\\"key\\\":\\\"value\\\"\"\n" +
        "    },\n" +
        "    \"2020051502\":{\n" +
        "        \"optionName\":\"Sale\",\n" +
        "        \"startTime\":1589517152000,\n" +
        "        \"startPosition\":\"JiaDing\",\n" +
        "        \"preKey\":[\n" +
        "        ],\n" +
        "        \"spec\":\"\"\n" +
        "    }\n" +
        "}";
    const linkForm =
        "{\n" +
        "    \"demoMSP:2020051502\":[\n" +
        "        \"demo2MSP:demo2\",\n" +
        "        \"demo1MSP:demo1\",\n" +
        "    ]\n" +
        "}";
    const completeForm =
        "{\n" +
        "    \"demoMSP:2020051501\":{\n" +
        "        \"completeTime\":1589519748000,\n" +
        "        \"completePosition\":\"YangPu\"\n" +
        "    },\n" +
        "\n" +
        "    \"demoMSP:2020051502\":{\n" +
        "        \"completeTime\":1589519748000,\n" +
        "        \"completePosition\":\"YangPu\"\n" +
        "    }     \n" +
        "}";
    export default {
        name: "Uploader",
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

                jsonForm:startForm,
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
                this.jsonForm=linkForm;
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
                this.jsonForm=startForm;
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
                this.jsonForm=completeForm;
            }
        }
    }
</script>

<style scoped>
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
    .centre{
        text-align: center;
    }
</style>