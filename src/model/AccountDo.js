/**
 * Created by UKfire on 17/2/11.
 */

export default class AccountDo {
    constructor(obj) {
        if (!obj) {
            obj = {}
        }
        this.user_name = obj.user_name
        this.uid = obj.uid
        this.token = obj.token
    }
}