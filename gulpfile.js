const gulp = require('gulp')
const sass = require('gulp-sass')
const del = require('del')                      //删除
const concat = require('gulp-concat')           //连接文件
//const uglify = require('gulp-uglify')           //压缩
const babel = require('gulp-babel')             //ES6转ES5
const spritesmith = require('gulp.spritesmith') //转雪碧图
const connect = require('gulp-connect')
const livereload = require('gulp-livereload')

function clean() {
    return del(['dist'])
}
function index() {
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'))
}
function img() {
    return gulp.src('./src/resource/img/**/*.{jpg,gif,png,jpeg}')
    .pipe(gulp.dest('./dist/resource/imgs'))
}
function js() {
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(concat('output.js'))
    .pipe(gulp.dest('./dist/lib'))
}
function lib() {
    return gulp.src('./src/lib/**/*.*')
    .pipe(gulp.dest('./dist/lib'))
}
function compileSass() {
    return gulp.src('./src/sass/*.scss')
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe(gulp.dest('./dist/css'))
}
function style() {
    return gulp.src('./src/css/*.css')
    .pipe(gulp.dest('./dist/css'))
}
function iconfont() {
    return gulp.src('./src/css/iconfont/*.*')
    .pipe(gulp.dest('./dist/css/iconfont'))
}
function html() {
    return gulp.src('./src/html/*.html')
    .pipe(gulp.dest('./dist/html'))
}
function sprite() {
    return gulp.src('./src/resource/icons/**/*.png')
    .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    }))
    .pipe(gulp.dest('./dist/resource/sprite'))
}

function watch() {
    gulp.watch('./src/index.html', index)
    gulp.watch('./src/resource/img/**/*.{jpg,gif,png,jpeg}', img)
    gulp.watch('./src/js/*.js', js)
    gulp.watch('./src/lib/**/*.*', lib)
    gulp.watch('./src/sass/*.scss', compileSass)
    gulp.watch('./src/css/*.css', style)
    gulp.watch('./src/html/*.html', html)
    gulp.watch('./src/resource/icons/**/*.png', sprite)
    gulp.watch('./src/css/iconfont/*.*', iconfont)
}

const build = gulp.series(clean, index, img, js, lib, compileSass, style, html, sprite, iconfont)
gulp.task('build', build)
gulp.task('watch', watch)