'use strict';

const texpectacle = require('./texpectacle.js');

const sample = document.getElementById('pluginName');
const changeSelect = document.getElementById('animateType');

const firstSample = texpectacle(sample);

const run = () => {
    sample.setAttribute('data-text-animation', changeSelect.value);
    firstSample.animation();
};

changeSelect.addEventListener( 'change', () => {
    run();
});

const btn = document.getElementById('run');

btn.addEventListener( 'click', () => {
    run();
});

const howToUse = document.getElementById('howTitle');

const HowToUseAnim = texpectacle(howToUse);

const referenceTitle = document.getElementById('referenceTitle');

const referenceAnim = texpectacle(referenceTitle);

window.addEventListener( 'load', function () {
    firstSample.setScroll();
    referenceAnim.setScroll();
    HowToUseAnim.setScroll();
});