import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import routerConfig from './router.config'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Network from './plugin/network'
import Storage from './plugin/storage'
import vuexConfig from './vuex.config'
import AccountDo from './model/AccountDo'
import Doui from './plugin/doui'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(Network)
Vue.use(Storage)
Vue.use(Doui)

const router = new VueRouter(routerConfig)

const store = new Vuex.Store(vuexConfig)

router.beforeEach((to, from, next) => {
    console.log('beforeEach')
    if (to.name === 'editor') {
        next()
    } else if (to.name === 'tutorial') {
        next()
    } else if (to.name === 'login') {
        if (Storage.storage.has('account')) {
            next({name: 'editor'})
        } else {
            next()
        }
    } else {
        next({name: 'editor'})
    }
})

const vue = new Vue({
    el: '#app',
    router: router,
    store,
    component: {},
    created(){
        const acc = this.$storage.load('account')
        if (acc) {
            const account = new AccountDo(JSON.parse(acc))
            this.$store.commit('setAccount', account)
        }
    }
})
