const rimraf = require('rimraf');
const gulp = require('gulp');

gulp.task('clean', function (cb) {
    return rimraf('./public/**/*', cb);
});