
window.preset = 'notebook'
canv.width = 1920

window.backgrounds = {
    1: 'img/notebook.jpg',
    2: 'img/zebra.jpg'
}

window.onpreset = () => {
    if (preset == 'notebook') {
        window.spacing = 23
        window.lineHeight = 121
        window.wave = 15
        window.perlinStep = 3
        window.randomSize = 0
        window.indentTop = 81
        window.indentBottom = 20
        window.indentRight = 60
        window.indentLeft = 30
        window.fontColor = 'black'
        window.fontSize = 50

        window.currentBg = 1
        canv.height = 2455
    }
    else if (preset == 'zebra') {
        window.spacing = 23
        window.lineHeight = 91.5
        window.wave = 15
        window.perlinStep = 4
        window.randomSize = 0
        window.indentTop = 81
        window.indentBottom = 197
        window.indentRight = 150
        window.indentLeft = 203
        window.fontColor = 'black'
        window.fontSize = 57

        window.currentBg = 2
        canv.height = 2720
    }
    else {//standart
        window.spacing = 16
        window.lineHeight = 40
        window.wave = 1
        window.perlinStep = 3
        window.randomSize = 0;
        window.indentTop = 30
        window.indentBottom = 20
        window.indentRight = 20
        window.indentLeft = 20
        window.fontColor = 'black'
        window.fontSize = 30

        window.currentBg = 1
        canv.height = 2720
    }
}