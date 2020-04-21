"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canv = document.getElementById('canv');
var ctx = canv.getContext('2d'); // canv.width = document.body.clientWidth - 20

canv.width = 1920;
window.spacing = 16;
window.lineHeight = 40;
window.wave = 1;
window.randomSize = 0;
window.indentTop = 10;
window.indentRight = 20;
window.indentLeft = 20;
window.fontSize = 30;
window.fontColor = 'black';
window.lineDelimiter = 1;

window.start = function () {
  ctx.clearRect(0, 0, canv.width, canv.height); // ctx.moveTo(0, 0)
  // ctx.lineTo(canv.width, 0)
  // ctx.lineTo(canv.width, canv.height)
  // ctx.lineTo(0, canv.height)
  // ctx.lineTo(0, 0)
  // ctx.stroke(); 

  var textHelper =
  /*#__PURE__*/
  function () {
    function textHelper() {
      _classCallCheck(this, textHelper);

      this.space = indentLeft;
      this.str = indentTop;
    }

    _createClass(textHelper, [{
      key: "includeSpace",
      value: function includeSpace() {
        this.space += spacing;
      }
    }, {
      key: "includeStr",
      value: function includeStr() {
        this.str += lineHeight;
      }
    }, {
      key: "perlin",
      value: function perlin() {}
    }, {
      key: "newStr",
      value: function newStr() {
        this.space = indentLeft;
        this.includeStr();
      }
    }]);

    return textHelper;
  }();

  var textH = new textHelper();
  text.forEach(function (item) {
    ctx.font = "".concat(fontSize + (Math.random() * randomSize - randomSize), "px main");
    textH.includeSpace();

    if (textH.space > canv.width - indentRight) {
      textH.newStr();
    }

    if (item == '\n') {
      textH.newStr();
    }

    if (lineDelimiter) {
      for (var i = 1; i < countList; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 3 * canv.width / 2 * i);
        ctx.lineTo(canv.width, 3 * canv.width / 2 * i);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.closePath();
      }
    }

    if (textH.str >= canv.height) {
      countList++;
      canv.height = 3 * canv.width / 2 * countList;
    }

    ctx.fillStyle = fontColor;
    ctx.fillText(item, textH.space, textH.str + Math.random() * wave + 20);
  });
};

window.text = _toConsumableArray('');
window.countList = 1;
canv.height = 3 * canv.width / 2 * countList;
window.hiddenSwitcher = 1;
var uiPanel = document.querySelector('[panel]');
addEventListener('keydown', function (event) {
  // console.log(event.code)
  if (event.code == 'F4') {
    hiddenSwitcher = !hiddenSwitcher;

    if (!hiddenSwitcher) {
      uiPanel.classList.remove('active');
    } else {
      uiPanel.classList.add('active');
    }
  }
});
addEventListener('keydown', function (event) {
  // console.log(event.code)
  if (event.code == 'F9') {
    saveImage(getImage(canv));
  }
});
addEventListener('keydown', function (event) {
  // console.log(event.code)
  if (event.code == 'F7') {
    start();
  }
});
start();

window.input = function (e) {
  text = _toConsumableArray(e.target.value);
  start();
};