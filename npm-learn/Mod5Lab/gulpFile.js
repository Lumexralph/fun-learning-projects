var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');

// Create a default task by calling the task function on the gulp object with the first parameter and an empty array as the second parameter.
// This tells Gulp to run the lint task after the uglify task when you type the command gulp.
gulp.task('default', ['uglify', 'lint']);

// Create an uglify task by calling the task function on the gulp object. 
gulp.task('uglify', function() {
  return watch('lintTest.js', { ignoreInitial: false })
             .pipe(gulp.src('lintTest.js')
             .pipe(uglify())
             .pipe(gulp.dest('dist-gulp'))
          );
});

gulp.task('lint', function() {
  return watch('lintTest.js', { ignoreInitial: false })
      .pipe(gulp.src('lintTest.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
    );
})