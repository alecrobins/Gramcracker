var gulp = require('gulp'),
	 argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    browserify = require('gulp-browserify'),
    nodemon = require('gulp-nodemon');
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify')
    jshint = require('gulp-jshint'),
    react = require('gulp-react');
    minifyCSS = require('gulp-minify-css'),
    debug = require('gulp-debug'),
    gutil = require('gulp-util'),
    stylish = require('jshint-stylish');

// Lint React Task
gulp.task('lint', function() {
    return gulp.src('./react/**/*.js')
           	.pipe(react())
           	.pipe(jshint())
           	.pipe(jshint.reporter("default", {verbose: true}))
           	.pipe(jshint.reporter(stylish))
           	.pipe(debug());
});

// Reactify 
gulp.task('scripts', function () {

	 // Render the React components server side
    gulp.src(['react/app.js'])
    	.pipe(browserify({
    	    debug: true,
    	    transform: [ 'reactify' ]
    	}))
    	.pipe(gulp.dest('src/js/'))
    	.pipe(debug());
       // .pipe(gulpif(argv.production, uglify()))
    	 // .pipe(gulpif(argv.production, rename({suffix: '.min'})))
});

// Compile Sass
gulp.task('sass', function() {
    return gulp.src('./src/scss/**/*.scss')
	        	.pipe(sass())
	        	.pipe(gulp.dest('./src/css/'))
	        	.pipe(debug());
});

//Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('react/**/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['scripts', 'lint', 'watch']);