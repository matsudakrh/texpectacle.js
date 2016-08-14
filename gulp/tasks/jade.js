const gulp = require('gulp');
const jade = require('gulp-jade');
const plumber  = require('gulp-plumber');
const notify  = require('gulp-notify');


gulp.task( 'jade', function () {
    return gulp.src( ['source/jade/**/*.jade', '!source/jade/**/_*.jade'], { base: 'source/jade/'})
        .pipe( plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(jade())
        .pipe( gulp.dest('public/'));
});