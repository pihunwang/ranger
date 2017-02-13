/**
 * Created by UKfire on 17/2/11.
 */
export default {
    state:{
        account:undefined
    },
    mutations:{
        setAccount(state,account){
            state.account = account
        },
        deleteAccount (state) {
            state.account = undefined
        }
    },
    getters: {
        account: state => state.account
    }
}