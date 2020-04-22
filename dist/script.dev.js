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
window.indentBottom = 20;
window.fontSize = 30;
window.fontColor = 'black';
window.lineDelimiter = 1;
window.currentBg = 1;
window.backgrounds = {
  1: 'img/notebook.jpg',
  2: 'img/zebra.jpg'
};

window.start = function () {
  document.getElementById('bg-image').src = backgrounds[currentBg];
  ctx.clearRect(0, 0, canv.width, canv.height);
  updateCurrentPage();

  var textHelper =
  /*#__PURE__*/
  function () {
    function textHelper() {
      _classCallCheck(this, textHelper);

      this.reset();
    }

    _createClass(textHelper, [{
      key: "reset",
      value: function reset() {
        this.posX = indentLeft;
        this.posY = indentTop;
      }
    }, {
      key: "newY",
      value: function newY() {
        this.posX = indentLeft;
        this.posY += lineHeight;
      }
    }, {
      key: "parse",
      value: function parse(text) {
        var _this = this;

        var page = 1;
        var step = 0;
        this.arr = [];
        text.forEach(function (item, index) {
          if (text[index] == " ") {
            var length = _this.posX;

            for (var i = index + 1; text[i] !== " " && i <= text.length; i++) {
              length += spacing;
            }

            if (length >= canv.width - indentRight) {
              _this.newY();
            }
          }

          if (_this.posX >= canv.width - indentRight) {
            _this.newY();
          }

          if (_this.posY >= canv.height - indentBottom) {
            page++;

            _this.reset();
          }

          if (item == '\n') {
            _this.newY();
          }

          _this.arr[index + step] = {
            page: page,
            posX: _this.posX,
            posY: _this.posY + Math.random() * wave + 20,
            symbol: item
          };
          _this.posX += spacing;
        });
        return this.arr;
      }
    }]);

    return textHelper;
  }();

  window.textH = new textHelper();
  ctx.font = "".concat(fontSize + (Math.random() * randomSize - randomSize), "px main");
  ctx.fillStyle = fontColor;
  textH.parse(text).forEach(function (item) {
    if (item.page == currentPage) {
      ctx.fillText(item.symbol, item.posX, item.posY);
    }
  });
};

window.text = _toConsumableArray('');
canv.height = 3 * canv.width / 2;
window.hiddenSwitcher = 1;
window.currentPage = 1;
var uiPanel = document.querySelector('[panel]');
addEventListener('keydown', function (event) {
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
  if (event.code == 'F9') {
    saveImage(getImage(canv));
  }
});
addEventListener('keydown', function (event) {
  if (event.code == 'F7') {
    start();
  }
});

updateCurrentPage = function updateCurrentPage() {
  var el = document.querySelector('#cur-page');
  el.innerHTML = currentPage;
};

window.nextPagination = function () {
  currentPage++;
  start();
};

window.prevPagination = function () {
  if (currentPage > 1) {
    currentPage--;
    start();
  }
};

start();

window.input = function (e) {
  text = _toConsumableArray(e.target.value);
  start();
};