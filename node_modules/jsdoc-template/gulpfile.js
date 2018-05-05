'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const cssBase64 = require('gulp-css-base64')
const runSequence = require('run-sequence')

gulp
  .task('sass', done =>
    runSequence(['sass:normal', 'sass:min'], done))

gulp
  .task('sass:normal', () =>
    gulp
      .src('./src/style.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(cssBase64())
      .pipe(concat('style.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist')))

gulp
  .task('sass:min', () =>
    gulp
      .src('./src/style.scss')
      .pipe(sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(cssBase64())
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest('./dist')))

gulp
  .task('watch', () =>
    gulp
      .watch('./src/**/*', ['sass']))

gulp
  .task('default', ['sass', 'watch'])
