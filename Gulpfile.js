var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    react = require('gulp-react');
    debug = require('gulp-debug'),
    compass = require('gulp-compass'),
    plumber = require('gulp-plumber'),
    stylish = require('jshint-stylish'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream');

var path = {
    OUT: 'main.js',
    ENTRY_POINT: './react/main.js',
    DEST_SRC: './src/js/',
    CSS_OUT: './src/css/'
};

// //error notification settings for plumber
// var plumberErrorHandler = { errorHandler: notify.onError({
//         title: notifyInfo.title,
//         icon: notifyInfo.icon,
//         message: "Error: <%= error.message %>"
//     })
// };

gulp.task('styles', function() {
  return gulp.src('src/scss/**/*.scss')
    // .pipe(plumber(plumberErrorHandler))
        .pipe(compass({
            css: 'src/css',
            sass: 'src/scss',
            image: 'src/img'
        }))
    .pipe(gulp.dest(path.CSS_OUT))
});

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
    // .pipe(plumber(plumberErrorHandler))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//Watch Files For Changes
gulp.task('watch', function() {
    
    gulp.watch('./src/scss/**/*.scss', ['styles']);

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
gulp.task('default', ['styles', 'watch']);