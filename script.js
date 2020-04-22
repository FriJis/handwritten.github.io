var canv = document.getElementById('canv')
var ctx = canv.getContext('2d')

window.start = () => {
    document.getElementById('bg-image').src = backgrounds[currentBg]
    ctx.clearRect(0, 0, canv.width, canv.height)
    class textHelper {
        constructor() {
            this.reset()
        }
        reset() {
            this.posX = indentLeft
            this.posY = indentTop
        }
        newY() {
            this.posX = indentLeft
            this.posY += lineHeight
        }
        parse(text) {
            var page = 1
            var step = 0
            this.arr = []

            text.forEach((item, index) => {
                if (text[index] == " ") {
                    var length = this.posX
                    for (var i = index + 1; text[i] !== " " && i <= text.length; i++) {
                        length += spacing
                    }
                    if (length >= canv.width - indentRight) {
                        this.newY()
                    }
                }
                if (this.posX >= canv.width - indentRight) {

                    this.newY()
                }
                if (this.posY >= canv.height - indentBottom) {
                    page++
                    this.reset()
                }
                if (item == '\n') {
                    this.newY()
                }
                allPage = page
                this.arr[index + step] = {
                    page: page,
                    posX: this.posX,
                    posY: this.posY + (Math.random() * wave) + 20,
                    symbol: item
                }
                this.posX += spacing
            })
            return this.arr
        }
    }
    window.textH = new textHelper()
    ctx.font = `${fontSize + (Math.random() * randomSize - randomSize)}px main`;
    ctx.fillStyle = fontColor
    textH.parse(text).forEach(item => {
        if (item.page == currentPage) {
            ctx.fillText(item.symbol, item.posX, item.posY);
        }
    })
    updateCurrentPage()
}

window.text = [...'']
window.hiddenSwitcher = 1
window.currentPage = 1
window.allPage = 1
var uiPanel = document.querySelector('[panel]')
addEventListener('keydown', event => {
    if (event.code == 'F4') {
        hiddenSwitcher = !hiddenSwitcher
        if (!hiddenSwitcher) {
            uiPanel.classList.remove('active')
        } else {
            uiPanel.classList.add('active')
        }
    }
})
addEventListener('keydown', event => {
    if (event.code == 'F9') {
        saveImage(getImage(canv))
    }
})
addEventListener('keydown', event => {
    if (event.code == 'F7') {
        start()
    }
})
updateCurrentPage = () => {
    let el = document.querySelector('#cur-page')
    el.innerHTML = currentPage + '/' + allPage
}
window.nextPagination = () => {
    if (currentPage < allPage) {
        currentPage++
        start()
    }
}
window.prevPagination = () => {
    if (currentPage > 1) {
        currentPage--
        start()
    }
}
onpreset()
start()

window.input = e => {
    text = [...e.target.value]
    start()
}