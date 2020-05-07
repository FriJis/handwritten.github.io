window.randArrayObject = (arr) => {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}
window.toJsonConfig = () => {
    let json = JSON.stringify({
        spacing,
        lineHeight,
        wave,
        perlinStep,
        horisWave,
        randomSize,
        indentTop,
        indentBottom,
        indentRight,
        indentLeft,
        fontColor,
        fontSize,
        fontWeight,
        mistakeCount,
        mistakeProbality,
        currentBg,
        canvHeight: canv.height
    })
    let exports = document.querySelector('[config]')
    exports.innerHTML = json
}
window.pickConfigGeneration = () => {    
    for(var index in config) {
        let btn = document.createElement('div')
        console.log('btn');
        btn.setAttribute('class', 'btn')
        btn.setAttribute('onclick', 'preset = "'+ index +'", importConfig(), start()')
        btn.innerHTML = index
        
        document.querySelector('[pick-config]').append(btn)
    }
}
window.sidebarGeneration = () => {
    backgrounds.forEach((item, index) => {
        let img = document.createElement('img')
        img.setAttribute('src', item)
        img.setAttribute('onclick', 'currentBg = ' + index + ', start()')
        document.querySelector('.sidebar').append(img)
    })
}
window.importConfig = () => {
    try {
        let json = JSON.parse(config[preset])
        console.log(json)
        Object.assign(window, json)
        canv.height = json.canvHeight || 1000
    } catch{ }
}
window.onimg = () => {
    document.getElementById('bg-image').style.opacity = bgAlpha
}
window.input = e => {
    text = e.target.value
    start()
}
window.onsection = e => {
    document.querySelectorAll('.section').forEach(item => (item.style.display = 'none'))
    var section = document.getElementById('id' + e).style.display = 'block'
}
window.nextPagination = () => {
    if (currentPage < allPage) {
        currentPage++
        rewrite()
    }
}
window.prevPagination = () => {
    if (currentPage > 1) {
        currentPage--
        rewrite()
    }
}
addEventListener('keydown', event => {
    var uiPanel = document.querySelector('.cont')
    if (event.code == 'F4') {
        hiddenSwitcher = !hiddenSwitcher
        uiPanel.classList.toggle('active')
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