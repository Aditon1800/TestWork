"use strict";

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    del = require('del'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.stream();

function styles() {
  return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
          overrideBrowserslist: 'last 8 versions'
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(reload);
}

function script() {
  return gulp.src('./src/js/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify({toplevel: true}))
        .pipe(gulp.dest('./dist/js'))
        .pipe(reload);
}

function clean() {
  return del('dist/*');
}

function watch() {

  // browserSync.init({
  //     server: {
  //         baseDir: "./dist/",
  //         index: 'index.html',
  //         directory: true
  //     }
  // });

  gulp.watch( './src/scss/*.scss', styles );
  gulp.watch( './src/js/*.js', script );
}

gulp.task('styles', styles);
gulp.task('script', script);
gulp.task('watch', watch);

gulp.task('build', gulp.series( clean, 
                   gulp.parallel( styles, script )));
gulp.task( 'dev', gulp.series( 'build', 'watch' ) );