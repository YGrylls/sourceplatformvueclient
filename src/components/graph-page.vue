<template>
    <div id="graphContainer" style="width: 100vw; height: 100vh">
    </div>
</template>

<script>
    import echarts from 'echarts';
    export default {
        name: "GraphPage",
        data(){
            return {
                gChart:undefined,
                id:"",
                nodes:[],
                links:[],
                //to avoid duplicate
                safetySet: new Set(),
                prevSet: new Set(),
            }
        },
        mounted(){
            //init echarts
            this.gChart=echarts.init(document.getElementById("graphContainer"));
            const that = this;
            //listen window resize
            window.onresize = ()=>{
                that.gChart.resize();
            };
            this.id=this.$route.params.id;
            this.initData();
            this.gChart.on('click',(param) =>{
                if(param.dataType==="node"){
                    that.prevProcess(param.data.name,param.data.x,param.data.y);
                }
            })

        },
        methods:{
            updateCharts(){
                console.log(this.nodes);
                console.log(this.links);
                let option = {
                    tooltip: {
                        show:false
                    },
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series:[
                        {
                            type:'graph',
                            layout:'none',
                            symbolSize:50,
                            roam:true,
                            label:{
                                show:true,
                                position:'right',
                                backgroundColor: '#ddd',
                                borderColor: '#555',
                                borderWidth: 1,
                                borderRadius: 5,
                                color: '#000',
                                fontSize: 14,
                                rich:{
                                    title: {
                                        height: 30,
                                        borderRadius: [5, 5, 0, 0],
                                        padding: [0, 10, 0, 10],
                                        color: '#000',
                                    },
                                    tc: {
                                        align: 'center',
                                        color: '#eee',
                                    },
                                    row:{
                                        padding: [0, 10, 0, 10],
                                        height:25,
                                    },
                                    hr: {
                                        borderColor: '#777',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    }
                                }

                            },
                            edgeSymbol:['circle','arrow'],
                            edgeSymbolSize:[0,10],
                            edgeLabel: {
                                show:false
                            },
                            lineStyle:{
                                width:4,
                                curveness:0.2
                            },
                            data:this.nodes,
                            links:this.links,
                        }
                    ]
                };
                this.gChart.setOption(option)
            },
            initData(){
                this.queryProcess(this.id);
                this.prevProcess(this.id,0,0);

            },
            addProcess(proc,x,y){
                if(this.safetySet.has(proc.key)){
                    return;
                }
                let fmt=[];
                fmt.push('{title|'+proc.key+'}');
                fmt.push('{hr|}');
                fmt.push('{row|'+proc.ownerOrg+'}');
                fmt.push('{hr|}');
                fmt.push('{row|'+proc.optionName+'}');
                fmt.push('{hr|}');
                if(proc.state===1){
                    fmt.push('{row|'+this.timestampCvt(proc.startTime)+" => "+this.timestampCvt(proc.completeTime)+'}');
                    fmt.push('{hr|}');
                    fmt.push('{row|'+proc.startPosition+" => "+proc.completePosition+'}');
                }else{
                    fmt.push('{row|'+this.timestampCvt(proc.startTime)+'}');
                    fmt.push('{hr|}');
                    fmt.push('{row|'+proc.startPosition+'}');
                }
                let newNode = {
                    name:proc.key,
                    x:x,
                    y:y,
                    label: {
                        formatter:fmt.join('\n')
                    }
                };
                this.safetySet.add(proc.key);
                this.nodes.push(newNode);
            },
            addLink(newKey, oldKey){
                let link = {
                    source:newKey,
                    target:oldKey
                };
                this.links.push(link);
            },
            queryProcess(id){
                let req = {
                    key:id
                };
                const that = this;
                this.$http.post('/query',req).then((resp)=>{

                    if(resp.data.errCode!=null){
                        that.$message({
                            message:"Query "+resp.data.errCode,
                            type:"error"
                        });
                        return;
                    }
                    that.$message({
                        message:"Query OK",
                        type:"success"
                    });
                    let proc=resp.data.data;
                    that.addProcess(proc,0,0);
                    //update charts
                    this.updateCharts();
                }).catch((err)=>{
                    that.$message({
                        message:"Query "+err,
                        type:"error"
                    });
                });
            },
            prevProcess(id,x,y){
                if(this.prevSet.has(id)){
                    return;
                }
                let req = {
                    key:id
                };
                const that = this;
                that.gChart.showLoading();
                this.$http.post('/prev',req).then((resp)=>{
                    that.gChart.hideLoading();
                    if(resp.data.errCode!=null){
                        that.$message({
                            message:"Prev "+resp.data.errCode,
                            type:"error"
                        });
                        return;
                    }
                    that.$message({
                        message:"Prev OK",
                        type:"success"
                    });
                    let list=resp.data.data;
                    list.forEach((proc,index)=>{
                        that.addProcess(proc,x+index*50,y+50);
                        that.addLink(proc.key,id);
                    });
                    that.prevSet.add(id);
                    //update charts
                    this.updateCharts();
                }).catch((err)=>{
                    that.gChart.hideLoading();
                    that.$message({
                        message:"Prev "+err,
                        type:"error"
                    });
                });
            },
            timestampCvt(timestamp){
                let date=new Date(timestamp);
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            }
        }


    }
</script>

<style scoped>

</style>