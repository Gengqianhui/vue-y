import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import Recommend from "pages/Recommend.vue";
import Singer from "pages/Singer.vue";
import Detail from "pages/Detail.vue";

const router=new Router({
    mode:"hash",
    routes:[
        {path:"/recommend",component:Recommend},
        {path:"/singer",name:"singer",component:Singer,children:[{
            path:"detail/:id",
            component:Detail
        }]},
        {path:"/",redirect:"/recommend"}
    ]
});

export default router;