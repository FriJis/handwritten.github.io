window.canv = document.getElementById('canv')
var ctx = canv.getContext('2d')

window.start = () => {
    ctx.font = `${fontWeight} ${fontSize + (Math.random() * randomSize - randomSize)}px main`;
    ctx.fillStyle = fontColor
    document.getElementById('bg-image').src = backgrounds[currentBg]
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
            for(var i in reductions) {
                let regular = new RegExp(i, 'gim')
                text = text.replace(regular, reductions[i])
            }
            
            var page = 1
            this.arr = []
            var textArr = [...text]
            textArr.forEach((item, index) => {
                if (text[index] == " ") {
                    var length = this.posX
                    for (var i = index + 1; text[i] !== " " && i <= text.length; i++) {
                        length += ctx.measureText(item).width + spacing
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
                this.posX += ctx.measureText(item).width + spacing
            })
            return this.arr
        }
    }
    window.textH = new textHelper()
    window.objectMainText = textH.parse(text)
    
   rewrite()
}
window.rewrite = () => {
    
    ctx.clearRect(0, 0, canv.width, canv.height)
    objectMainText.forEach(item => {
        if (item.page == currentPage) {
            if (item.mistake) {
                for (var i = 0; i < mistakeCount; i++) {
                    ctx.fillText(randArrayObject(glossary), item.posX, item.posY);

                }
            }
            ctx.fillText(item.symbol, item.posX, item.posY);
        }
    })
    updateCurrentPage()

}
window.text = ''
window.hiddenSwitcher = 1
window.currentPage = 1
window.allPage = 1
canv.width = 1920

sidebarGeneration()
pickConfigGeneration()
importConfig()
start()

onsection(1)
