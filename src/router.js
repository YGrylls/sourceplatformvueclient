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
            path:'/home',
            name:'home',
            component:()=>import('./components/home-page.vue')
        },
        {
            path:'/graph/:id',
            name:'graph',
            component:()=>import('./components/graph-page.vue')
        }
    ]
})