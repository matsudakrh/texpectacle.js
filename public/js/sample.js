'use strict';

var texpectacle = require('./texpectacle.js');

var sample = document.getElementById('pluginName');
var changeSelect = document.getElementById('animateType');

var firstSample = texpectacle(sample);

var run = function run() {
    sample.setAttribute('data-text-animation', changeSelect.value);
    firstSample.setScroll();
};

changeSelect.addEventListener('change', function () {
    run();
});

var btn = document.getElementById('run');

btn.addEventListener('click', function () {
    run();
});

run();

var howToUse = document.getElementById('howTitle');

var HowToUseAnim = texpectacle(howToUse);

HowToUseAnim.setScroll();

var referenceTitle = document.getElementById('referenceTitle');

var referenceAnim = texpectacle(referenceTitle);

referenceAnim.setScroll();