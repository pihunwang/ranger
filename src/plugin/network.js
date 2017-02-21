import storage from './storage'
import globalConfig from './../global.config'

/**
 * Created by UKfire on 17/2/8.
 */

let token
let scopedVue

/**
 * 发起网络请求
 * @param url 网址
 * @param params 参数
 */
function doHttpBase(url, params) {
    return new Promise((resolve, reject) => {
        const option = {
            emulateJSON: true,
            headers: {},
        }
        scopedVue.http.post(url, params, option)
            .then((response) => {
                const resp = response.data
                console.log(response.data)
                if (resp.code === 0) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }, (response) => {
                const resp = {
                    tip: '网络出错',
                }
                reject(resp)
            })
    })
}

function getToken() {
    if (!token) {
        const acc = storage.storage.load('account')
        if (acc) {
            return JSON.parse(acc).token
        }
    }
    return undefined
}

const nowBaseUrl = globalConfig.getHost();

class Request {
    constructor(appendUrl, params = undefined, baseurl = nowBaseUrl) {
        this.url = baseurl + appendUrl
        this.paramsAll = {}
        this.paramsAll.token = getToken()
        for (const key of Object.keys(params)) {
            if (params[key] !== undefined && params[key] !== null && !(params[key] instanceof Object)) {
                this.paramsAll[key] = params[key]
            }
        }
    }

    execute() {
        return doHttpBase(this.url, this.paramsAll)
    }
}

const requestFactory = {
    //user api
    UserLogin(user_name, password){
        return new Request('user/UserLogin', {
            user_name,
            password
        })
    },
    UserAdd(user_name, password){
        return new Request('user/UserAdd', {
            user_name,
            password
        })
    },
    //code api
    SourceCompiler(source, uid){
        return new Request('code/sourceCompiler', {
            source,
            uid
        })
    }
}

const install = (Vue) => {
    scopedVue = Vue

    Vue.prototype.$doHttpBase = doHttpBase

    Vue.prototype.$request = requestFactory
}

export default {
    install: install
}