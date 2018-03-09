import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  // base:'/HVS/',
  routes: [
    {
      path: '/',
      redirect:'/general',
      component: (resolve) =>{
      	require(['@/components/general/Index'])
      }
    },{
    	path:'/firewall',
    	component: (resolve) =>{
      	require(['@/components/firewall/Index'],resolve)
      }
    }, {
      path:'/intelligence',
      component: (resolve) =>{
        require(['@/components/intelligence/Index'],resolve)
      }
    },{
      path:'/general',
      component: (resolve) =>{
        require(['@/components/general/Index'],resolve)
      }
    }
  ]
})
