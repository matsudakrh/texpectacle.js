const gulp = require('gulp');



gulp.task( 'watch', function () {
    gulp.watch('source/js/*.es6', ['webpack']);
    gulp.watch('source/sass/**/*.sass', ['sass']);
    gulp.watch('source/jade/**/*.jade', ['jade']);
    gulp.watch('source/image/**/*', ['image']);
});
