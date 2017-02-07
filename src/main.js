import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from './router.config'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(VueRouter)
Vue.use(ElementUI)

const router = new VueRouter(routerConfig)

router.beforeEach((to, from, next) => {
    console.log('beforeEach')
    if (to.name === 'main') {
        next()
    } else {
        next({name: 'main'})
    }
})

const vue = new Vue({
    el: '#app',
    router: router,
})
