var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var image = require('gulp-image');

gulp.task('default',['optimise'],() => {
  return gulp.src(['src/app.js','src/stateConfig.js','src/*.js','src/controllers/*.js'])
    .pipe(concat('app.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
  
});

gulp.task('optimise',()=>{
  gulp.src(['pics/*.png','pics/*.jpg'])
    .pipe(image())
    .pipe(gulp.dest('dist/pics'));
})