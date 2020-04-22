var canv = document.getElementById('canv')
var ctx = canv.getContext('2d')


// canv.width = document.body.clientWidth - 20
canv.width = 1920
window.spacing = 16
window.lineHeight = 40
window.wave = 1
window.randomSize = 0;
window.indentTop = 10
window.indentRight = 20
window.indentLeft = 20
window.indentBottom = 20
window.fontSize = 30
window.fontColor = 'black'
window.lineDelimiter = 1

window.currentBg = 1


window.backgrounds = {
    1: 'img/notebook.jpg',
    2: 'img/zebra.jpg'
}

window.start = () => {
    document.getElementById('bg-image').src = backgrounds[currentBg]
    ctx.clearRect(0, 0, canv.width, canv.height)
    updateCurrentPage()
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
}

window.text = [...'']
canv.height = ((3 * canv.width) / 2)
window.hiddenSwitcher = 1
window.currentPage = 1
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
    el.innerHTML = currentPage
}
window.nextPagination = () => {
    currentPage++
    start()
}
window.prevPagination = () => {
    if (currentPage > 1) {
        currentPage--
        start()
    }
}

start()

window.input = e => {
    text = [...e.target.value]
    start()
}