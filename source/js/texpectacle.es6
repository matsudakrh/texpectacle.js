/*!

 texpectacle.es6

 Copyright (c) 2016 Hiroki Matsuda

 This software is released under the MIT License
 http://opensource.org/licenses/mit-license.php

 */
'use strict';
class Texpectacle_Class {
    constructor ( element, duration, offsetTop ) {
        this.element = element;
        this.idName = this.element.id;
        this.getClassName();
        this.getSize();
        // textを複製,削除
        this.text = element.textContent;
        element.textContent = '';
        this.insertText();
        this.length = this.text.length;
        // アニメーションさせる時間からcssで設定されているdelay,durationをマイナスする
        this.baseDuration = duration;
        // ブラウザの縦幅に対し対象の要素がどの程度の高さに来た時実行するかを設定
        this.offsetTop = parseInt(offsetTop) / 100;
    }
    getClassName () {
        this.className = this.element.getAttribute('data-text-animation') || 'fadeIn';
    }
    setDuration ( ) {
        // animationプロパティの値を取得するために空spanを追加
        const element = document.createElement('span');
        element.className = this.className;
        this.element.appendChild(element);
        // 外部ファイルを含めたstyleの取得
        this.getAnimationProperty(element);
        // テキストを追加する総時間からanimation実行時間をマイナスする
        this.duration =  ( ( this.baseDuration  * 1000 ) / this.length ) -
            ( this.animationDuration * 1000 / this.length ) -
            ( this.animationDelay * 1000 / this.length );
        // animation実行時のsetTimeout分を引く
        this.duration -= Math.round(this.duration / this.length);
        this.element.removeChild(element);
    }
    getSize () {
        this.size = this.element.getBoundingClientRect();
    }
    judge () {
        // アニメーション開始の判定(setScroll時など)
        if ( this.size.top <= window.innerHeight * this.offsetTop &&
            this.size.top >= 0 ) {
            this.animation();
            window.removeEventListener( 'resize', this.resizeFuncName);
            window.removeEventListener( 'scroll', this.scrollFuncName);
        }
    }
    getAnimationProperty( element ) {
        const style = window.getComputedStyle(element);

        const animationDelay = style.animationDelay || style.webkitAnimationDelay;
        const animationDuration = style.animationDuration || style.webkitAnimationDuration;

        this.animationDelay = parseFloat(animationDelay);
        this.animationDuration = parseFloat(animationDuration);
    }
    insertText () {
        this.element.innerHTML = '';
        // テキストをforEachで回してあらかじめ全て追加しておく(text-align対策)
        const elementInner = document.createDocumentFragment();
        const span = document.createElement('span');
        [].forEach.call( this.text, (char) => {
            let wrap = span.cloneNode();
            wrap.innerHTML = this.escapeHTML(char);
            wrap.style.visibility = 'hidden';
            wrap.style.display = 'inline-block';
            // 擬似要素を絡めたアニメーションをするためにカスタム属性を設定
            wrap.setAttribute('data-content', wrap.textContent);
            wrap.addEventListener( 'animationend', () => {
                wrap = null;
            });
            elementInner.appendChild(wrap);
        });
        this.element.appendChild(elementInner);
    }
    animation () {
        // アニメーションが2度以上呼ばれた時や途中で再度呼ばれた時の表示崩れを対策する
        if ( this.endTimer ) {
            clearTimeout(this.endTimer);
        }
        this.insertText();
        this.index = 0;
        this.getClassName();
        this.setDuration();
        if (  this.duration <= this.animationDelay + this.animationDuration ) {
            this.element.childNodes.forEach( (target) => {
                target.style.visibility = 'visible';
                target.className = this.className;
            });
            if ( this.endTimer ) {
                clearTimeout(this.endTimer);
            }
            if ( typeof this.endCallback === 'function' ) {
                this.endTimer = setTimeout( () => {
                    this.endCallback();
                }, ( this.animationDelay + this.animationDuration ) * 1000 );
            }
            return;
        }
        const addClass = () => {
            const target = this.element.childNodes[this.index];
            target.style.visibility = 'visible';
            target.className =  this.className;
            this.index++;
            if ( this.index >= this.length ) {
                this.getAnimationProperty(target);
                if ( typeof this.endCallback === 'function' ) {
                    this.endTimer = setTimeout( () => {
                        this.endCallback();
                    }, ( this.animationDelay + this.animationDuration ) * 1000 );
                }
                return;
            }
            if ( this.addClassTimer ) {
                clearTimeout(this.addClassTimer);
            }
            this.addClassTimer = setTimeout( () => {
                addClass();
            }, this.duration);
        };
        // 任意のタイミングでanimationを呼ぶ時短期間に連続して呼ばれるとバグっていたのを対策
        if ( this.animationTimer ) {
            clearTimeout(this.animationTimer);
        }
        this.animationTimer = setTimeout( () => {
            addClass();
            if ( typeof this.startCallback === 'function' ) {
                this.startCallback();
            }
        }, this.duration);
    }
    setScroll () {
        this.insertText();
        // 処理の過剰な重複を防ぐ為の仮変数
        let resizeTimer = false;
        let scrollTimer = false;
        // アニメーション終了時removeEventListenerを行う為の関数名を設定
        this.resizeFuncName = this.idName + '-resize' + Date.now();
        this.scrollFuncName = this.idName + '-scroll' + Date.now();
        window.addEventListener( 'resize', this.resizeFuncName = () => {
            if ( resizeTimer ) {
                clearTimeout(resizeTimer);
            }
            resizeTimer = setTimeout( () => {
                this.judge();
            }, 200);
        });
        window.addEventListener( 'scroll', this.scrollFuncName = () => {
            if ( scrollTimer ) {
                clearTimeout(scrollTimer);
            }
            scrollTimer = setTimeout( () => {
                this.getSize();
                this.judge();
            }, 40);
        });
        this.judge();
    }
    escapeHTML (str) {
        str = str.replace(/&/g, '&amp;');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/>/g, '&gt;');
        str = str.replace(/"/g, '&quot;');
        str = str.replace(/'/g, '&#39;');
        str = str.replace(/ /g, '&nbsp;');
        str = str.replace(/　/g, '&emsp;');
        return str;
    }
}
const texpectacle = function (element, duration = 2, offsetTop = 80) {

    if ( offsetTop < 20 ) {
        offsetTop = 20;
    } else if ( offsetTop > 100 ) {
        offsetTop = 100;
    } else if ( isNaN(offsetTop) ) {
        offsetTop = 80
    }

    if ( isNaN(duration) ) {
        duration = 2;
    }

    return new Texpectacle_Class(element, duration, offsetTop);
};
if ( typeof module !== 'undefined' ) {
    module.exports = texpectacle;
}