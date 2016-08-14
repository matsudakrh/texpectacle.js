const gulp = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const plumber  = require('gulp-plumber');
const notify  = require('gulp-notify');
const comb = require('gulp-csscomb');
const minify = require('gulp-cssmin');
const rename = require('gulp-rename');

gulp.task( 'sass', function () {
    return gulp.src('source/sass/**/*.sass')
        .pipe( plumber({errorHandler: notify.onError("Error: <%= error.message %>")}) )
        .pipe( sass())
        .pipe( prefix())
        .pipe( comb())
        .pipe( gulp.dest('public/css'))
        .pipe( minify())
        .pipe( rename({
            suffix: '.min'
        }))
        .pipe( gulp.dest('public/css'));
});
