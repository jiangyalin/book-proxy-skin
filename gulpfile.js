const gulp = require('gulp')
const minifycss = require('gulp-minify-css') // 压缩css
// const concat = require('gulp-concat')
const uglify = require('gulp-uglify') // 压缩js
const htmlmin = require('gulp-htmlmin') // 压缩html
const rename = require('gulp-rename') // 更改文件名
// const del = require('del')
const imagemin = require('gulp-imagemin') // 压缩图片
// const px2rpx = require('gulp-px2rpx')
const sass = require('gulp-sass')
// const compass = require('gulp-compass')

// sass.compiler = require('node-sass')

// 压缩css
gulp.task('minifycss', function () {
  gulp.src(['static/css/**/*.css', '!static/css/**/*.min.css'])
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('static/css/'))
  console.log('css压缩成功')
})

// 压缩js
gulp.task('minifyjs', function () {
  gulp.src(['static/js/**/*.js', '!static/js/**/*.min.js', '!static/js/plug-in/**/*.min.js'])
    // .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('static/js/'))
  console.log('js压缩成功')
})

// 压缩html
gulp.task('htmlmin', function () {
  const options = {
    removeComments: true, // 清除HTML注释
    collapseWhitespace: true, // 压缩HTML
    collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
    minifyJS: true, // 压缩页面JS
    minifyCSS: true // 压缩页面CSS
  }
  gulp.src(['views/**/*.html', '!views/**/*.min.html'])
    .pipe(rename({suffix: '.min'}))
    .pipe(htmlmin(options))
    .pipe(gulp.dest('views/**/*.html'))
  console.log('html压缩成功')
})

// 压缩图片
gulp.task('testImagemin', function () {
  gulp.src('static/images/**/*.{png,jpg,gif,ico}')
    .pipe(imagemin({
      optimizationLevel: 7, // 优化等级
      progressive: true, // 无损压缩jpg
      interlaced: true, // 各行扫描gif进行渲染
      multipass: true // 多次优化直到svg完全优化
    }))
    .pipe(gulp.dest('static/images/'))
  console.log('img压缩成功')
})

// 编译sass
// 在命令行输入 gulp sass 启动此任务
gulp.task('sass', function () {
  return gulp.src('static/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('static/css/'))
})
// gulp.task('compass', function () {
//   gulp.src('static/css/**/*.scss')
//     .pipe(compass({
//       css: 'css',
//       sass: 'sass'
//     }))
//     .pipe(gulp.dest('static/css/**/*.css'))
// })

// gulp.task('default', gulp.series('sass'))

// gulp.watch(['static/css/**/*.scss'], ['sass']).on('change', function (event) {
//   console.log('压缩启动')
// })

gulp.task('watch', function () {
  gulp.watch('static/css/**/*.scss', gulp.series('sass'))
})
