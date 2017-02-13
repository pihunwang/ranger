function showToastBase(vue, message,
    { type = 'info', duration = '3000', showClose = false, onClose = undefined } = {}) {
    vue.$message({
        message,
        type,
        duration,
        showClose,
        onClose,
    })
}


/**
 * 自动辨别是string和Object类型的消息
 * 如果是Object类型的,从中取出text
 * @param message
 * @returns {*}
 */
function solveSingMessage(message) {
    if (message instanceof Object) {
        return message.text
    }
    return message
}

const install = (Vue) => {
    Vue.prototype.$doui = {
        showToast(vue, messages, { type = 'info', duration = '1500', showClose = false, onClose = false } = {}) {
            let showMessage
            if (messages instanceof Array && messages.length > 0) {
                showMessage = solveSingMessage(messages[0])
            } else {
                showMessage = solveSingMessage(messages)
            }
            showToastBase(vue, showMessage, { type, duration, showClose, onClose })
        },
        showErrorToast(vue, messages) {
            this.showToast(vue, messages, { type: 'error' })
        },
        showErrorStayToast(vue, messages) {
            this.showToast(vue, messages, { type: 'error', showClose: true, duration: 0 })
        },
        showSuccToast(vue, messages) {
            this.showToast(vue, messages, { type: 'success' })
        },
        showPictures(param) {

        }
    }
}

export default{
    install: install
}
