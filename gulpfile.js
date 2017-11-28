// node modules içerisindeki gulp ve benzeri modülleri require ile çağırıp, yeni bir değişkene aktarıyoruz.
const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const prefix = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
const reload = browserSync.reload //Tarayıcıyı tekrar yükle


//Görevlerimizi tanımlıyoruz
//Browser-sync adında bir fonksiyon oluşturuyoruz
gulp.task('browser-sync', function() {
    browserSync.init({
            notify: false,
            server: {
                baseDir: './'
            }
        })
        //watch komutu ile bu dosyaları izlemesini ve parantez içindeki görevleri çalıştırmasını sağlıyoruz
    gulp.watch('./views/**/*.pug', ['html'])
    gulp.watch('./scss/**/*.scss', ['css'])
    gulp.watch('./js/**/*.js', reload)
})

gulp.task('html', () => {
    return gulp.src('./views/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./'))
        .on('end', reload)
})

gulp.task('css', () => {
    return gulp.src('./scss/main.scss')
        .pipe(plumber([{ errorHandler: false }]))
        .pipe(sass())
        .pipe(prefix())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream())
})

gulp.task('default', ['browser-sync', 'html', 'css'])