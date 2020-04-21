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
window.bgStyle = 'notebook' //notebook, zebra

window.start = () => {
    ctx.clearRect(0, 0, canv.width, canv.height * currentPage)
    var current = {
        page: 1,
        textOnPage: indentTop
    }
    updateCurrentPage()
    class textHelper {
        constructor() {
            this.space = indentLeft
            this.str = indentTop
        }
        includeSpace() {
            this.space += spacing
        }
        includeStr() {
            this.str += lineHeight
            current.textOnPage += lineHeight
        }
        newStr() {
            this.space = indentLeft
            this.includeStr()
        }
    }

    var textH = new textHelper()

    text.forEach(item => {
        ctx.font = `${fontSize + (Math.random() * randomSize - randomSize)}px main`;

        textH.includeSpace()
        if (textH.space > canv.width - indentRight) {
            textH.newStr()
        }
        if (item == '\n') {
            textH.newStr()
        }
        if (current.textOnPage > canv.height) {
            current.page += 1
            current.textOnPage = indentTop
        }
        ctx.fillStyle = fontColor
        ctx.fillText(item, textH.space, (current.textOnPage + ( canv.height * (current.page - 1) )) + (Math.random() * wave) + 20);


    })
}


window.text = [...'']
canv.height = ((3 * canv.width) / 2)
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
    el.innerHTML = currentPage
}
window.nextPagination = () => {
    currentPage++
    ctx.translate(0, -canv.height)
    start()
}
window.prevPagination = () => {
    if (currentPage > 1) {
        currentPage--
        ctx.translate(0, canv.height)
        start()
    }
}

start()

window.input = e => {
    text = [...e.target.value]
    start()
}