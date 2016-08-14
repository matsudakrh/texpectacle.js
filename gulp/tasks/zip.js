const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('zip', () => {
    gulp.src('assets/*', {base: 'assets'})
        .pipe(zip('texpectacle.zip'))
        .pipe(gulp.dest('public/'));
});