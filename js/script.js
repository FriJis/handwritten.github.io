var canv = document.getElementById('canv')
var ctx = canv.getContext('2d')

window.start = () => {
    document.getElementById('bg-image').src = backgrounds[currentBg]
    document.getElementById('bg-image').style.opacity = bgAlpha
    ctx.clearRect(0, 0, canv.width, canv.height)
    class textHelper {
        constructor() {
            this.reset()
            this.perlinStep = 1
            this.perlinK = 0
        }
        reset() {
            this.posX = indentLeft
            this.posY = indentTop
            this.perlinHeight = 0
        }
        newY() {
            this.posX = indentLeft + (Math.random() * horisWave - horisWave)
            this.posY += lineHeight
            this.perlinHeight = 0
        }
        perlin() {
            if (this.perlinStep >= window.perlinStep) {
                this.perlinStep = 1
                var perlinKPrev = this.perlinK
                this.perlinK = (Math.random() * wave - wave) / window.perlinStep
                if (perlinKPrev >= 0 && this.perlinK >= 0 || perlinKPrev < 0 && this.perlinK < 0) {
                    this.perlinK = -this.perlinK
                }

            }
            // console.log(this.perlinK)
            this.perlinHeight += this.perlinK
            this.perlinStep++
            return this.perlinHeight
        }
        parse(text) {
            var page = 1
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
                var perlin = this.perlin()
                //mastake
                if (Math.random() <= mistakeProbality && !(item == " " || item == '\n')) {
                    var mistake = 1
                }
                allPage = page
                this.arr[index] = {
                    page: page,
                    posX: this.posX,
                    posY: this.posY + perlin,
                    symbol: item,
                    mistake: mistake || 0
                }
                this.posX += spacing
            })
            return this.arr
        }
    }
    window.textH = new textHelper()
    ctx.font = `${fontWeight} ${fontSize + (Math.random() * randomSize - randomSize)}px main`;
    ctx.fillStyle = fontColor
    textH.parse(text).forEach(item => {
        if (item.page == currentPage) {
            if (item.mistake) {
                for(var i = 0; i < mistakeCount; i++) {
                    ctx.fillText(randArrayObject(glossary), item.posX, item.posY);

                }
            }
            ctx.fillText(item.symbol, item.posX, item.posY);
        }
    })
    updateCurrentPage()
}

window.text = [...'']
window.hiddenSwitcher = 1
window.currentPage = 1
window.allPage = 1
window.glossary = [...'абвгдеёжзийклмнопрстуфхцчшщъыьэюя']
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