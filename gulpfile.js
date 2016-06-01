const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-spawn-mocha');

gulp.task('lint', function(){
  return gulp.src(['**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test', function(){
  return gulp.src('./test/**/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['test','lint']);
