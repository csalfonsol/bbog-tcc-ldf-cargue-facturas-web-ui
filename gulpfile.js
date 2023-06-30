const gulp = require('gulp');
const obfuscator = require('gulp-javascript-obfuscator');

gulp.task('obfuscate', () => {
  return gulp.src('dist/**/*.js')
    .pipe(obfuscator())
    .pipe(gulp.dest('dist'));
});