const gulp = require('gulp');
const webpack = require('gulp-webpack');
const plumber  = require('gulp-plumber');
const notify  = require('gulp-notify');
const named = require('vinyl-named');
const uglify = require('gulp-uglify');
//const rename = require('gulp-rename');
const sourceMap = require('gulp-sourcemaps');

gulp.task( 'webpack', ['script'], function () {
    return gulp.src( ['public/js/sample.min.js'])
        .pipe( plumber({errorHandler: notify.onError("Error: <%= error.message %>")}) )
        .pipe( named())
        .pipe( webpack({
            output: {
                filename: '[name].pack.js'
            }
        }))
        .pipe( uglify({preserveComments: 'some'}))
        .pipe( gulp.dest('./public/js/'));
});