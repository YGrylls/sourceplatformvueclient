<template>
    <div>


        <div id="centre">
            <p style="font-size: 2em; font-weight: bold; color: deepskyblue">
                Products
                Traceability
            </p>
            <el-input v-model="globalId" placeholder="Enter Product ID"
            style="width: 60%;"></el-input>
            <el-button @click="submitSearch(globalId)" type="primary" style="width: 20%; margin-left: 4px; min-width: 6em ">Search</el-button>
            <el-button :disabled="this.scanDisable" @click="scanQR" type="primary" icon="el-icon-camera" style="margin: 0.5em; width: 80%; font-size: 2em"></el-button>

        </div>
        <video ref="video"
               id="video"
               width="200"
               height="200"
               style="border: 1px solid deepskyblue; margin-left: auto; margin-right: auto">
        </video>
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
    #centre{
        text-align: center;
        width: 60%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 6em;
        max-width: 600px;
        height: auto;
    }
</style>