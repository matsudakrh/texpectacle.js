const gulp = require('gulp');
const plumber  = require('gulp-plumber');
const notify  = require('gulp-notify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');




gulp.task( 'script', function () {
    return gulp.src(['source/js/**/*.es6'])
        .pipe( plumber( { errorHandler: notify.onError("Error: <%= error.message %>") } ) )
        .pipe( babel({
            comments: false
        }))
        .pipe( gulp.dest('./public/js'))
        .pipe( rename({
            suffix: '.min'
        }))
        .pipe( uglify())
        .pipe( gulp.dest('./public/js'));
});