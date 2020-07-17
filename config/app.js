config = {} //init variable

window.preset = 'zebra2' // pick default config
window.glossary = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя' // glossary for mistakes
window.mainFont = 'bygeoFixed.otf' // import font from "fonts" folder

// your configs lib
config['notebook'] = '{"spacing":0,"lineHeight":121,"wave":15,"perlinStep":3,"horisWave":40,"randomSize":0,"indentTop":81,"indentBottom":20,"indentRight":60,"indentLeft":30,"fontColor":"#1d1b5a","fontSize":70,"fontWeight":"normal","mistakeCount":2,"mistakeProbality":0.03,"currentBg":0,"canvHeight":2455}'
config['zebra'] = '{"spacing":0,"lineHeight":91.5,"wave":15,"perlinStep":4,"horisWave":40,"randomSize":0,"indentTop":81,"indentBottom":197,"indentRight":150,"indentLeft":203,"fontColor":"black","fontSize":57,"fontWeight":"normal","mistakeCount":2,"mistakeProbality":0.03,"currentBg":1,"canvHeight":2720}'
config['zebra2'] = '{"spacing":0,"lineHeight":84.5,"wave":15,"perlinStep":4,"horisWave":60,"randomSize":10,"indentTop":215,"indentBottom":197,"indentRight":150,"indentLeft":203,"fontColor":"black","fontSize":78,"fontWeight":"normal","mistakeCount":2,"mistakeProbality":0.03,"currentBg":2,"canvHeight":2800}'
config['linear'] = '{"spacing":0,"lineHeight":96.5,"wave":9,"perlinStep":3,"horisWave":40,"randomSize":5,"indentTop":160,"indentBottom":10,"indentRight":250,"indentLeft":30,"fontColor":"#1a1b53","fontSize":57,"fontWeight":"normal","mistakeCount":2,"mistakeProbality":0.03,"currentBg":3,"canvHeight":2375}'
// your configs lib

// your backgrounds from 'img' folder
window.backgrounds = [
    'img/notebook.jpg',
    'img/zebra.jpg',
    'img/zebra2.jpg',
    'img/linear.jpg'
]
// your backgrounds from 'img' folder

// default config
window.spacing = 16
window.lineHeight = 40
window.wave = 1
window.perlinStep = 3
window.randomSize = 0;
window.horisWave = 40
window.indentTop = 30
window.indentBottom = 20
window.indentRight = 20
window.indentLeft = 20
window.fontColor = 'black'
window.fontSize = 30
window.fontWeight = 'normal'
window.mistakeCount = 2
window.mistakeProbality = 0.01
window.currentBg = 1
window.bgAlpha = 0.5
canv.height = 2720
// default config