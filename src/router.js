import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes:[
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'/interface',
            redirect: '/interface/upload'
        },
        {
            path:'/home',
            name:'home',
            component:()=>import('./components/home-page.vue')
        },
        {
            path:'/graph/:id',
            name:'graph',
            component:()=>import('./components/graph-page.vue')
        },
        {
            path:'/interface',
            name:'interface',
            component:()=>import('./components/process-uploader.vue'),
            children:[
                {
                    path:'upload',
                    component:()=>import('./components/uploader.vue')
                },
                {
                    path:'display',
                    component:()=>import('./components/display.vue')
                }
            ]
        }
    ]
})