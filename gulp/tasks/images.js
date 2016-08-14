const gulp = require('gulp');

gulp.task( 'images', function () {
    return gulp.src( 'source/images/**/*')
        .pipe( gulp.dest('public/images'));
});