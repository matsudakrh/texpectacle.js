
/*!

  texpectacle.js
  
  Copyright (c) 2016 Hiroki Matsuda
  
  This software is released under the MIT License  http://opensource.org/licenses/mit-license.php

*/

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Texpectacle_Class = function () {
    function Texpectacle_Class(element, duration, offsetTop) {
        _classCallCheck(this, Texpectacle_Class);

        this.element = element;
        this.idName = this.element.id;
        this.getClassName();
        this.getSize();

        this.text = element.textContent;
        element.textContent = '';
        this.insertText();
        this.length = this.text.length;

        this.baseDuration = duration;

        this.offsetTop = parseInt(offsetTop) / 100;
    }

    _createClass(Texpectacle_Class, [{
        key: 'getClassName',
        value: function getClassName() {
            this.className = this.element.getAttribute('data-text-animation') || 'fadeIn';
        }
    }, {
        key: 'setDuration',
        value: function setDuration() {
            var element = document.createElement('span');
            element.className = this.className;
            this.element.appendChild(element);

            this.getAnimationProperty(element);

            this.duration = this.baseDuration * 1000 / this.length - this.animationDuration * 1000 / this.length - this.animationDelay * 1000 / this.length;

            this.duration -= Math.round(this.duration / this.length);
            this.element.removeChild(element);
        }
    }, {
        key: 'getSize',
        value: function getSize() {
            this.size = this.element.getBoundingClientRect();
        }
    }, {
        key: 'judge',
        value: function judge() {
            if (this.size.top <= window.innerHeight * this.offsetTop && this.size.top >= 0) {
                this.animation();
                window.removeEventListener('resize', this.resizeFuncName);
                window.removeEventListener('scroll', this.scrollFuncName);
            }
        }
    }, {
        key: 'getAnimationProperty',
        value: function getAnimationProperty(element) {
            var style = window.getComputedStyle(element);

            var animationDelay = style.animationDelay || style.webkitAnimationDelay;
            var animationDuration = style.animationDuration || style.webkitAnimationDuration;

            this.animationDelay = parseFloat(animationDelay);
            this.animationDuration = parseFloat(animationDuration);
        }
    }, {
        key: 'insertText',
        value: function insertText() {
            var _this = this;

            this.element.innerHTML = '';

            var elementInner = document.createDocumentFragment();
            var span = document.createElement('span');
            [].forEach.call(this.text, function (char) {
                var wrap = span.cloneNode();
                wrap.innerHTML = _this.escapeHTML(char);
                wrap.style.visibility = 'hidden';
                wrap.style.display = 'inline-block';

                wrap.setAttribute('data-content', wrap.textContent);

                wrap.addEventListener('animationend', function () {
                    if (wrap) {
                        wrap.setAttribute('data-content', '');
                    }
                    wrap = null;
                });
                elementInner.appendChild(wrap);
            });
            this.element.appendChild(elementInner);
        }
    }, {
        key: 'animation',
        value: function animation() {
            var _this2 = this;

            if (this.endTimer) {
                clearTimeout(this.endTimer);
            }

            this.insertText();
            this.index = 0;
            this.getClassName();
            this.setDuration();
            if (this.duration <= this.animationDelay + this.animationDuration) {
                this.element.childNodes.forEach(function (target) {
                    target.style.visibility = 'visible';
                    target.className = _this2.className;
                });
                if (this.endTimer) {
                    clearTimeout(this.endTimer);
                }
                if (typeof this.endCallback === 'function') {
                    this.endTimer = setTimeout(function () {
                        _this2.endCallback();
                    }, (this.animationDelay + this.animationDuration) * 1000);
                }
                return;
            }
            var addClass = function addClass() {
                var target = _this2.element.childNodes[_this2.index];
                target.style.visibility = 'visible';
                target.className = _this2.className;
                _this2.index++;
                if (_this2.index >= _this2.length) {
                    _this2.getAnimationProperty(target);
                    if (typeof _this2.endCallback === 'function') {
                        _this2.endTimer = setTimeout(function () {
                            _this2.endCallback();
                        }, (_this2.animationDelay + _this2.animationDuration) * 1000);
                    }
                    return;
                }
                if (_this2.addClassTimer) {
                    clearTimeout(_this2.addClassTimer);
                }
                _this2.addClassTimer = setTimeout(function () {
                    addClass();
                }, _this2.duration);
            };

            if (this.animationTimer) {
                clearTimeout(this.animationTimer);
            }
            this.animationTimer = setTimeout(function () {
                addClass();
                if (typeof _this2.startCallback === 'function') {
                    _this2.startCallback();
                }
            }, this.duration);
        }
    }, {
        key: 'setScroll',
        value: function setScroll() {
            var _this3 = this;

            var resizeTimer = false;
            var scrollTimer = false;

            this.resizeFuncName = this.idName + '-resize' + Date.now();
            this.scrollFuncName = this.idName + '-scroll' + Date.now();
            window.addEventListener('resize', this.resizeFuncName = function () {
                if (resizeTimer) {
                    clearTimeout(resizeTimer);
                }
                resizeTimer = setTimeout(function () {
                    _this3.judge();
                }, 200);
            });
            window.addEventListener('scroll', this.scrollFuncName = function () {
                if (scrollTimer) {
                    clearTimeout(scrollTimer);
                }
                scrollTimer = setTimeout(function () {
                    _this3.getSize();
                    _this3.judge();
                }, 40);
            });
            this.judge();
        }
    }, {
        key: 'escapeHTML',
        value: function escapeHTML(str) {
            str = str.replace(/&/g, '&amp;');
            str = str.replace(/</g, '&lt;');
            str = str.replace(/>/g, '&gt;');
            str = str.replace(/"/g, '&quot;');
            str = str.replace(/'/g, '&#39;');
            str = str.replace(/ /g, '&nbsp;');
            str = str.replace(/　/g, '&emsp;');
            return str;
        }
    }]);

    return Texpectacle_Class;
}();

var texpectacle = function texpectacle(element) {
    var duration = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
    var offsetTop = arguments.length <= 2 || arguments[2] === undefined ? 80 : arguments[2];


    var style = window.getComputedStyle(document.body);

    if (!style.hasOwnProperty('animation') && !style.hasOwnProperty('-webkit-animation')) {
        return {
            setScroll: function setScroll() {},
            animation: function animation() {}
        };
    }

    if (offsetTop < 20) {
        offsetTop = 20;
    } else if (offsetTop > 100) {
        offsetTop = 100;
    } else if (isNaN(offsetTop)) {
        offsetTop = 80;
    }

    if (isNaN(duration)) {
        duration = 2;
    }

    return new Texpectacle_Class(element, duration, offsetTop);
};
if (typeof module !== 'undefined') {
    module.exports = texpectacle;
}