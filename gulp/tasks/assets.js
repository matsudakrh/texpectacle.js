const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const header = require('gulp-header');

const lisenceJS = `
/*!

  texpectacle.js
  
  Copyright (c) 2016 Hiroki Matsuda
  
  This software is released under the MIT License\
  http://opensource.org/licenses/mit-license.php

*/
`;
const lisenceCSS = `
/*!

  texpectacle.css
  
  Copyright (c) 2016 Hiroki Matsuda
  
  This software is released under the MIT License\
  http://opensource.org/licenses/mit-license.php

*/
`;


gulp.task( 'assets', ['sass', 'script'], function () {
    gulp.src( ['public/css/texpectacle.css', 'public/css/texpectacle.min.css'])
        .pipe( header(lisenceCSS))
        .pipe( gulp.dest('assets/css'));
    gulp.src( ['public/js/texpectacle.js', 'public/js/texpectacle.min.js'])
        .pipe( header(lisenceJS))
        .pipe( gulp.dest('assets/js'));
});