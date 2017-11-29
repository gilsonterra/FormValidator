var gulp = require('gulp');
var minifier = require('gulp-minifier');
var rename = require('gulp-rename');


gulp.task('minify', function () {
    return gulp.src([
            'form-validator.js'
        ])
        .pipe(minifier({
            minify: true,
            minifyJS: true,
            collapseWhitespace: true
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('.'));
});


gulp.task('default', ['minify'], function() {
});