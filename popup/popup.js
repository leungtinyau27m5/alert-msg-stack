const popup = {
    container: null,
    stackWrapper: null,
    stack: [],
    defaultTimeout: 3000,
    init: function(defaultTimeout, position) {
        //import css
        var head = document.head
        var link = document.createElement('link')
        link.rel = 'stylesheet'
        link.type = 'text/css'
        link.href = '/popup/popup.css'
        head.appendChild(link)

        //append popup container in body
        var body = document.body
        var div = document.createElement("div")
        var stack = document.createElement("div")
        $(div).addClass('m-popup')
        $(stack).addClass('stack')
        if (position) {
            if (position.match(/bottom/g)) {
                $(div).addClass('bottom')
            }
            if (position.match(/right/g)) {
                $(div).addClass('right')
            }
            if (position.match(/center/g)) {
                $(div).addClass('center')
            }
        }
        div.appendChild(stack)
        body.appendChild(div)
        this.container = div
        this.stackWrapper = stack
        this.defaultTimeout = defaultTimeout ? defaultTimeout : 3000
    },
    appendMsgInStack: function({
        type,
        id,
        msg,
        title,
        timeout,
        from,
    }) {
        id = id ? id : Math.random().toString(36).slice(5) + Date.now()
        title = title ? title : type === 'error' ? '錯誤' : type === 'success' ? '成功' : type === 'warning' ? '警告' : '通知'
        from = from ? from : 'home'
        timeout = timeout ? timeout : this.defaultTimeout
        var idx = this.stack.findIndex(ele => ele.id === id)
        if (idx > -1) {
            this.stack[idx].repeatId()
        } else {
            var item = new PopupMsgItem({ type, id, msg, title, timeout, from, parentNode: this.stackWrapper, stack: this.stack })
            this.stack.push(item)
        }
    }
}

class PopupMsgItem {
    constructor({
        id,
        type,
        msg,
        title,
        timeout,
        from,
        parentNode,
        stack
    }) {
        this.id = id
        this.type = type
        this.msg = msg
        this.title = title
        this.timeout = timeout
        this.times = timeout / 1000
        this.from = from
        this.parentNode = parentNode
        this.stack = stack
        this.wrapperNode = null
        this.init()
        this.startCounting()
    }

    init() {
        var div = document.createElement('div')
        var title = document.createElement('div')
        var close = document.createElement('span')
        var content = document.createElement('div')
        var that = this

        div.className += ('m-msg-' + this.type)
        div.className += ' msg-item '
        div.setAttribute('id', this.id)

        title.className += ' m-msg-title '
        title.innerHTML = this.title

        content.className += ' m-msg-content '
        content.innerHTML = this.msg

        close.innerHTML = "&#10539;"
        close.className += ' m-msg-close '
        close.onclick = function() {
            that.forceRemove()
        }

        div.appendChild(title)
        div.appendChild(content)
        div.appendChild(close)

        this.parentNode.appendChild(div)
        this.wrapperNode = div
        $(div).fadeOut(this.times * 1000)
    }

    startCounting() {
        if (this.times > 0) {
            var that = this
            setTimeout(function() {
                that.times--;
                that.startCounting()
            }, 1000)
        } else {
            this.forceRemove()
        }
    }
    repeatId() {
        this.times = this.timeout / 1000
        $(this.wrapperNode).stop()
        $(this.wrapperNode).css('opacity', 1)
        $(this.wrapperNode).fadeOut(this.timeout)
    }
    forceRemove() {
        var idx = this.stack.findIndex(ele => ele.id === this.id)
        if (idx > -1) {
            $(this.parentNode).find('#' + this.id).remove()
            this.stack.splice(idx)
        }
    }
}
// popup.init()