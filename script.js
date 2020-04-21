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
window.fontSize = 30
window.fontColor = 'black'
window.lineDelimiter = 1

window.start = () => {
    ctx.clearRect(0, 0, canv.width, canv.height)
    // ctx.moveTo(0, 0)
    // ctx.lineTo(canv.width, 0)
    // ctx.lineTo(canv.width, canv.height)
    // ctx.lineTo(0, canv.height)
    // ctx.lineTo(0, 0)
    // ctx.stroke(); 
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
        }
        perlin() {

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
        if (lineDelimiter) {
            for (let i = 1; i < countList; i++) {
                ctx.beginPath();
                ctx.moveTo(0, ((3 * canv.width) / 2) * i)
                ctx.lineTo(canv.width, ((3 * canv.width) / 2) * i)
                ctx.stroke();
                ctx.lineWidth = 1;
                ctx.closePath()
            }
        }
        if (textH.str >= canv.height) {
            countList++
            canv.height = ((3 * canv.width) / 2) * countList
        }
        ctx.fillStyle = fontColor
        ctx.fillText(item, textH.space, textH.str + (Math.random() * wave) + 20);
    })
}
window.text = [...'']
window.countList = 1
canv.height = ((3 * canv.width) / 2) * countList
window.hiddenSwitcher = 1
var uiPanel = document.querySelector('[panel]')
addEventListener('keydown', event => {
    // console.log(event.code)
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
    // console.log(event.code)
    if (event.code == 'F9') {
        saveImage(getImage(canv))
    }
})
addEventListener('keydown', event => {
    // console.log(event.code)
    if (event.code == 'F7') {
        start()
    }
})

start()

window.input = e => {
    text = [...e.target.value]
    start()
}