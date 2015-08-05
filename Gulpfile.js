var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    stylish = require('jshint-stylish'),
    del = require('del'),
    runSequence = require('run-sequence'),
    argv = require('minimist')(process.argv.slice(2)),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    reactify = require('reactify');


// Settings
var DEST = './build'; // The build output folder
var RELEASE = !!argv.release; // Minimize and optimize during a build?
var WATCH = !!argv.watch; // Watch build process

var watch = false || WATCH;
var src = {};

// Clean up
gulp.task('clean', del.bind(null, [DEST]));

// Assets
gulp.task('assets', function() {
  src.assets = ['src/assets/**'];
  // Out Put Location
  var out = DEST + '/assets';

  // Compile Scss
  return gulp.src(src.assets)
    .pipe($.changed(out, {
      extension: '.css'
    }))
    .pipe($.if('*.scss', $.sass()))
    .pipe(gulp.dest(out))
    .pipe($.size({
      title: 'assets'
    }))
    .pipe($.livereload());
});


// HTML pages
gulp.task('pages', function() {
  src.pages = ['src/pages/**/*.html'];
  return gulp.src(src.pages)
    .pipe($.changed(DEST, {
      extension: '.html'
    }))
    .pipe($.if(RELEASE, $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true
    }), $.jsbeautifier()))
    .pipe(gulp.dest(DEST))
    .pipe($.size({
      title: 'pages'
    }));
});

// Bundle
gulp.task('browserify', function(){
  var b = browserify();
  b.transform(reactify); // use the reactify transform
  b.add('./src/app.js');
  return b.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build'));
});

// Build the app from source code
gulp.task('build', ['clean'], function(cb) {
  runSequence(['assets', 'pages', 'browserify'], function() {
    // If watch flag is set
    if (watch) {
      gulp.watch(src.assets, ['assets']);
      gulp.watch(src.pages, ['pages']);
      gulp.watch('./src/**/*.js', ['browserify']);
      gulp.watch(DEST + '/**/*.*', function(file) {
        if (file.path.match(/[\.css]$/ig)) {
          // Skip these extensions
          return;
        }
        runSequence('browserify');
      });
      $.livereload.listen()
    }
    cb();
  });
});

// Default Task
gulp.task('default', ['build']);