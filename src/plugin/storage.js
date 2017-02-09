/**
 * Created by UKfire on 17/2/8.
 */

const storage = {

    load(key){
        return window.localState['vue-storage-' + key]
    },
    save(key, value){
        let valueStr = value
        if(value instanceof Object || value instanceof Array){
            valueStr = JSON.stringify(value)
        }
        window.localStorage['vue-storage-' + key] = valueStr
    },
    has(key) {
        return window.localStorage['vue-storage-' + key] !== undefined
    },

    remove(key) {
        return window.localStorage.removeItem('vue-storage-' + key)
    },

    clear() {
        return window.localStorage.clear()
    }

}

export default {
    install(Vue) {
        Vue.prototype.$storage = storage
    },
    storage
}