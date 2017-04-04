var gulp = require('gulp'),
	minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    del = require('del');


// Clean
gulp.task('clean', function() {
    return del(['dist']);
});


//Copy root views
gulp.task('root-html', function(){
	return gulp.src('src/*.html')
	.pipe(gulp.dest('dist/'));
});


//Copy views
gulp.task('views', ['root-html'], function(){
	return gulp.src('src/views/**/*.html')
	.pipe(gulp.dest('dist/views/'));
});

//Copy images
gulp.task('images', function(){
	return gulp.src('src/img/**/*.*')
	.pipe(gulp.dest('dist/img/'));
});

//Copy fonts
gulp.task('fonts', function(){
	return gulp.src(['src/fonts/**/*.*', '../bower_components/components-font-awesome/fonts/*.*'])
	.pipe(gulp.dest('dist/fonts/'));
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('usemin', 'views', 'images', 'fonts');
});

// Watch
gulp.task('watch', ['browser-sync'], function() {
  // Watch .js files
  gulp.watch('{src/js/**/*.js,src/css/**/*.css,*.html}', ['usemin']);
  

});

gulp.task('usemin', function () {
  return gulp.src('src/index.html')
      .pipe(usemin({
        css:[minifycss(),rev()],
        jslibs: [uglify(),rev()],
        jsapps: [uglify(),rev()]
      }))
      .pipe(gulp.dest('dist/'));
});


gulp.task('browser-sync', ['default'], function () {
   var files = [
      'src/*.html',
      'src/css/**/*.css',
      'src/img/**/*.png',
      'src/js/**/*.js',
      'dist/**/*'
   ];

   browserSync.init(files, {
      server: {
         baseDir: "dist",
         index: "index.html"
      }
   });
// Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', browserSync.reload);
});
