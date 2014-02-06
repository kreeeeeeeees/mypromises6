var gulp = require('gulp'),
	mocha = require('gulp-mocha'),
    traceur = require('gulp-traceur'),
    traceur_runtime = require('traceur').RUNTIME_PATH,
    rename = require('gulp-rename'),
	concat = require('gulp-concat');

gulp.task('test', ['build'], function () {
	gulp.src('./test/**/*.js')
		.pipe(mocha({ reporter: 'list' }));
});

gulp.task('compile', function () {
	return gulp.src('mypromises6.traceur.js')
		.pipe(traceur())
		.pipe(rename('mypromises6.tmp.js'))
		.pipe(gulp.dest('.'));
});

gulp.task('build', ['compile'], function () {
    return gulp.src([traceur_runtime, './mypromises6.tmp.js'])
        .pipe(concat('mypromises6.js'))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['build', 'test']);
