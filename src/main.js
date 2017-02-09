import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerConfig from './router.config'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Network from './plugin/network'
import Storage from './plugin/storage'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(Network)
Vue.use(Storage)

const router = new VueRouter(routerConfig)

router.beforeEach((to, from, next) => {
    console.log('beforeEach')
    if (to.name === 'main') {
        next()
    } else {
        //next({name: 'main'})
        next()
    }
})

const vue = new Vue({
    el: '#app',
    router: router,
})
