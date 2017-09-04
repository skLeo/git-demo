/**
 * 1.LESS编译 压缩 合并
 * 2.JS合并 压缩 混淆
 * 3.img复制
 * 4.html压缩
 */
 'use strict';
 //在gulpfile线载入gulp的包   因为这个包提供一些API
 var gulp = require('gulp');
 var less = require('gulp-less');
 var cssnoano = require('gulp-cssnano');
 var concat = require('gulp-concat');
 var uglify = require('gulp-uglify');
 var htmlmin = require('gulp-htmlmin');
 var browserSync = require('browser-sync')

 //LESS 编译  压缩  --合并没有必要，一般预处理css都可以导包
 gulp.task('style',function(){
   //这里是在执行style任务时自动执行的
   gulp.src(['src/styles/*.less','!src/styles/_*.less'])
   .pipe(less())
   .pipe(cssnoano())
   .pipe(gulp.dest('dist/styles'))
   .pipe(browserSync.reload({
     stream:true
   }));
 });

 //2.JS合并 压缩 混淆
 gulp.task('script',function(){
   gulp.src('src/scripts/*.js')
   .pipe(concat('all.js'))   //先合并
   .pipe(uglify())
   .pipe(gulp.dest('dist/scripts'))
   .pipe(browserSync.reload({
     stream:true
   }));
 });

 //img复制
 gulp.task('images',function(){
   gulp.src('src/images/*.*')
   .pipe(gulp.dest('dist/images'))
   .pipe(browserSync.reload({
     stream:true
   }));
 });


 //html
 gulp.task('html',function(){
   gulp.src('src/*.html')
   .pipe(htmlmin({
     collapseWhitespace: true,
     removeComments:true,
     removeAttributeQuotes:true
   }))
   .pipe(gulp.dest('dist'))
   .pipe(browserSync.reload({
     stream:true
   }));
 });

 gulp.task('serve',function(){
   browserSync({
     server: {baseDir: ['dist']}
   },
   function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
  });

  gulp.watch('src/styles/*.less',['style']);
  gulp.watch('src/scripts/*.js',['script']);
  gulp.watch('src/images/*.*',['images']);
  gulp.watch('src/*.html',['html']);
 });
