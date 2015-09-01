'use strict';

var gulp  = require('gulp');
var sass  = require('gulp-sass');
var babel = require('gulp-babel');
var sym = require('gulp-sym');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

gulp.task('compile-babel', function() {
  return gulp.src('src/**/*.js')
           .pipe(plumber())
           .pipe(babel({plugins: ['object-assign']}))
           .pipe(gulp.dest('app'));
});

gulp.task('compile-sass', function() {
  gulp.src('src/stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/stylesheets'));
});

gulp.task('compile-html', function() {
  gulp.src('src/index.html').pipe(gulp.dest('app'));
});

gulp.task('compile-jquery-ui', function() {
  gulp.src('node_modules/jquery-ui/themes/base/images').pipe(sym('app/stylesheets/images', {force: true}));
});

gulp.task('compile-font-awesome', function() {
  gulp.src('node_modules/font-awesome/fonts').pipe(sym('app/fonts', {force: true}));
});

gulp.task('compile', [
  'compile-babel',
  'compile-sass',
  'compile-html',
  'compile-jquery-ui',
  'compile-font-awesome'
]);

gulp.task('watch', function() {
  gulp.watch('src/**/*', ['compile']);
});
