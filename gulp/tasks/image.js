const gulp = require('gulp');

gulp.task( 'image', function () {
    return gulp.src( 'source/image/**/*')
        .pipe( gulp.dest('public/image'));
});