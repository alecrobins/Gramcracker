var gulp = require('gulp'),
	argv = require('yargs').argv,
    gulpif = require('gulp-if'),
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
    stylish = require('jshint-stylish'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream');

var path = {
    OUT: 'app.js',
    ENTRY_POINT: './react/app.js',
    DEST_SRC: './src/js/'
};

// Lint React Task
gulp.task('lint', function() {
    return gulp.src('./react/**/*.js')
           	.pipe(react())
           	.pipe(jshint())
           	.pipe(jshint.reporter("default", {verbose: true}))
           	.pipe(jshint.reporter(stylish))
           	.pipe(debug());
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
    
    gulp.watch('react/**/*.js', ['lint']);
    gulp.watch('scss/*.scss', ['sass']);
    
    // Reactify 
    var watcher  = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    }));

    return watcher.on('update', function () {
        watcher.bundle()
            .pipe(source(path.OUT))
            .pipe(gulp.dest(path.DEST_SRC))
            console.log('Updated');
        })
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_SRC));

});

// Default Task
gulp.task('default', ['lint', 'watch']);