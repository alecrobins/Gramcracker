var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    stylish = require('jshint-stylish'),
    del = require('del'),
    runSequence = require('run-sequence'),
    argv = require('minimist')(process.argv.slice(2)),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    reactify = require('reactify')
    path = require('path');


// Settings
var DEST = './build'; // The build output folder
var RELEASE = !!argv.release; // Minimize and optimize during a build?
var WATCH = !!argv.watch; // Watch build process

var watch = false || WATCH;
var src = {};

// Clean up
gulp.task('clean', del.bind(null, [DEST]));

// Assets
gulp.task('compass', function() {
  src.assets = ['src/assets/scss/**/*'];

  var out = path.join(__dirname, 'build/assets/');

  // Compile Scss
  return gulp.src(src.assets)
    .pipe($.changed(out, {
      extension: '.css'
    }))
    .pipe($.compass({
      project: path.join(__dirname, 'src/assets/scss/'),
      css: out,
      sass: path.join(__dirname, 'src/assets/scss/'),
    }))
    .pipe($.size({
      title: 'assets'
    }))
    // .pipe($.livereload());
});

// Assets
gulp.task('assets', function() {
  src.assets = ['src/assets/img/**'];
  // Out Put Location
  var out = DEST + '/assets/img';

  // Compile Scss
  return gulp.src(src.assets)
    .pipe(gulp.dest(out))
    .pipe($.size({
      title: 'assets'
    }))
    .pipe($.livereload());
});


// HTML pages
// gulp.task('pages', function() {
//   src.pages = ['src/pages/**/*.html'];
//   return gulp.src(src.pages)
//     .pipe($.changed(DEST, {
//       extension: '.html'
//     }))
//     .pipe($.if(RELEASE, $.htmlmin({
//       removeComments: true,
//       collapseWhitespace: true,
//       minifyJS: true
//     }), $.jsbeautifier()))
//     .pipe(gulp.dest(DEST))
//     .pipe($.size({
//       title: 'pages'
//     }));
// });

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
  runSequence(['assets', 'compass', 'browserify'], function() { //'pages',
    // If watch flag is set
    if (watch) {
      gulp.watch(src.assets, ['assets', 'compass']);
      gulp.watch(src.pages, ['pages']);
      gulp.watch('./src/**/*.js', ['browserify']);
      gulp.watch(DEST + '/**/*.*', function(file) {
        if (file.path.match(/[\.css]$/ig)) {
          // Skip these extensions
          return;
        }
        runSequence('browserify');
      });
      // $.livereload.listen()
    }
    cb();
  });
});

// Default Task
gulp.task('default', ['build']);