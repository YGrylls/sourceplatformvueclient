<template>
    <div >
        <div id="centre">
            <div >
                <p style="font-size: 2em; font-weight: bold; color: lightskyblue;">
                    Products
                    Traceability
                </p>
                <el-input v-model="globalId" placeholder="Enter Product ID"
                style="width: 60%;"></el-input>
                <el-button @click="submitSearch(globalId)" type="primary" style="width: 20%; margin-left: 4px; min-width: 6em ">Search</el-button>
                <el-button :disabled="this.scanDisable" @click="scanQR" type="primary" icon="el-icon-camera" style="margin: 0.5em; width: 80%; font-size: 1.2em">SCAN QRCODE</el-button>

            </div>
            <video ref="video"
                   id="video"
                   width="200"
                   height="200"
                   style="border: 1px solid lightskyblue; margin-left: auto; margin-right: auto">
            </video>
        </div>
        <div id="bg">

        </div>
    </div>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import adapter from 'webrtc-adapter';
    import { BrowserQRCodeReader } from '@zxing/library';
    export default {
        name: "HomePage",
        data(){
            return {
                globalId:'',
                codeReader: new BrowserQRCodeReader(),
                scanDisable:false,
                oneDevice:undefined,
            }
        },
        mounted(){
            const that = this;
            this.codeReader.listVideoInputDevices().then(
                (videoInputDevices)=>{
                    that.oneDevice = videoInputDevices[0].deviceId;
                }).catch((err)=>{
                that.$message({
                    message:err,
                    type:"error"
                });
            })

        },
        methods:{
            submitSearch(id){
                if(!id || id===""){
                    return;
                }
                this.$router.push({
                    path:'/graph/'+id,
                })
            },
            scanQR(){
                this.decodeOnce(this.codeReader, this.oneDevice);

            },
            decodeOnce(codeReader, deviceId){
                const that = this;
                codeReader.decodeFromInputVideoDevice(deviceId, 'video').then((result)=>{
                    that.$message({
                        type:"success",
                        message:result,
                    });
                    that.globalId=result;
                    that.submitSearch(result);
                }).catch((err)=>{
                    that.$message({
                        type:"warning",
                        message:err
                    })
                })
            },

        },

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
    #centre{
        text-align: center;
        width: 60%;
        margin-top: 6em;
        margin-left: auto;
        margin-right: auto;
        max-width: 640px;
        min-width: 300px;
        background-color: rgba(255,255,255,.1);
        border-radius: 10px;
        padding-top: 2em;
        padding-bottom: 2em;
        padding-left:1em;
        padding-right:1em;
        box-shadow: 2px 2px 10px 1px lightskyblue;
        backdrop-filter: blur(10px);
    }

</style>