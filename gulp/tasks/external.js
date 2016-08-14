const gulp = require('gulp');

gulp.task( 'external', function () {
    gulp.src( 'external/css/**/*')
        .pipe( gulp.dest('public/css'));
    gulp.src( 'external/js/**/*')
        .pipe( gulp.dest('public/js'));
});