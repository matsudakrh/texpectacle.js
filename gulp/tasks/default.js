const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task( 'default', [ 'jade', 'sass', 'webpack', 'external', 'image', 'watch', 'server']);