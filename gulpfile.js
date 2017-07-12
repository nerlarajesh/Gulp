var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var runSequence = require('run-sequence').use(gulp);
gulp.task('minify', function() {
    return gulp.src('./css/*.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist'))
})
gulp.task('watch', function() {
    gulp.watch('./css/*.css', function() {
        runSequence('minify')
    })
})

gulp.task('default', function() {
    runSequence('watch', 'minify')
})