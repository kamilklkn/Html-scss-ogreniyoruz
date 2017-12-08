var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    pug = require('gulp-pug'),
    header = require('gulp-header'),
    pkg = require('./package.json'),
    fs = require('fs'),
    reload = browserSync.reload;

var banner = ['/*',
    ' Theme Name: <%= pkg.name %>',
    ' Version: <%= pkg.version %>',
    ' Author: <%= pkg.author.name %>',
    ' Author URI: <%= pkg.author.web %>',
    ' License: <%= pkg.license %> ',
    '*/',
    ''
].join('\n');

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./scss/**/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});
gulp.task('sass', ['clean-css'], () => {
    return gulp.src('./scss/main.scss')
        .pipe(plumber([{ errorHandler: false }]))
        .pipe(sass())
        .pipe(prefix())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream())
})

gulp.task('clean-css', function() {
    fs.writeFile('./main.css', '');
});
/*
gulp.task('sass', function() {
    return gulp.src("./scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

*/
gulp.task('default', ['serve']);