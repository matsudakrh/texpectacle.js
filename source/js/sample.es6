'use strict';

const texpectacle = require('./texpectacle.js');

const sample = document.getElementById('pluginName');
const changeSelect = document.getElementById('animateType');

const firstSample = texpectacle(sample);

const run = () => {
    sample.setAttribute('data-text-animation', changeSelect.value);
    firstSample.setScroll();
};

changeSelect.addEventListener( 'change', () => {
    run();
});

const btn = document.getElementById('run');

btn.addEventListener( 'click', () => {
    run();
});

run();


const howToUse = document.getElementById('howTitle');

const HowToUseAnim = texpectacle(howToUse);

HowToUseAnim.setScroll();

const referenceTitle = document.getElementById('referenceTitle');

const referenceAnim = texpectacle(referenceTitle);

referenceAnim.setScroll();

