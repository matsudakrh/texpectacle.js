const gulp = require('gulp');
const webserver = require('gulp-webserver');

gulp.task( 'server', function () {
    return gulp.src( 'public/')
        .pipe( webserver({
            livereload: false,
            root: 'public/',
            port: 8080,
            open: false,
            directoryListing: false,
            fallback: 'error.html' // 404エラーページの設定
        }) );
});