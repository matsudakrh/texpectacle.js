'use strict';

var texpectacle = require('./texpectacle.js');

var sample = document.getElementById('pluginName');
var changeSelect = document.getElementById('animateType');

var firstSample = texpectacle(sample);

var run = function run() {
    sample.setAttribute('data-text-animation', changeSelect.value);
    firstSample.animation();
};

changeSelect.addEventListener('change', function () {
    run();
});

var btn = document.getElementById('run');

btn.addEventListener('click', function () {
    run();
});

var howToUse = document.getElementById('howTitle');

var HowToUseAnim = texpectacle(howToUse);

var referenceTitle = document.getElementById('referenceTitle');

var referenceAnim = texpectacle(referenceTitle);