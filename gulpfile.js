var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var ssi         = require('browsersync-ssi');
//var uncss       = require('gulp-uncss');
var sass        = require('gulp-sass');
var useref      = require('gulp-useref');
var uglify      = require('gulp-uglify');
var gulpIf      = require('gulp-if');
var cssnano     = require('gulp-cssnano');
var replace     = require('gulp-replace');
var reload      = browserSync.reload;
var Promise     = require('promise-polyfill');

var src = {
    scss: 'app/styles/**/*.scss',
    scss_top: 'app/styles/*.scss',
    scss_dir: ['app/styles/**/*.scss'],
    css:  '{app/css/*.css,app/**/css/*.css}',
    html: ['app/*.html',
      'app/basket/*.html'],
    js: ['app/js/*.js',
      'app/core/assets/js/*.js']
};

// Compile sass into CSS
gulp.task('sass-compile', function () {
  return gulp.src(src.scss_top)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream:true}));
});

// Static Server + watching scss/html files
gulp.task('dist-serve', function() {
  browserSync.init({
      server: {
          baseDir: './dist',
          middleware: ssi({
            baseDir:  __dirname + '/dist',
            ext: '.html',
          })
      }
  });
});

gulp.task('serve', function(cb) {
  browserSync.init({
    server: {
      baseDir: './app',
      middleware: ssi({
        baseDir:  __dirname + '/app',
        ext: '.html',
      }),
      routes : {
        '/node_modules' : './node_modules'
      }
    },
    port: 3000,
    notify: true,
    open: false
  });

  gulp.watch(src.scss_dir).on('change', gulp.series('sass-compile', function(done) {
    done();
  }));
  gulp.watch(src.html).on('change', reload);
  gulp.watch(src.js).on('change', reload);
  gulp.watch(src.css).on('change', reload);
  gulp.watch(src.slides).on('change', reload);
});

gulp.task('useref', function() {
  return gulp.src([
    'app/index.html',
    'app/{mockup}/**/*.html'
  ])
  .pipe(useref())
    // Minifies only if it's a JavaScript file
    //.pipe(gulpIf('*.js', uglify()))
    //.pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('copy-files', function () {
  return gulp.src([
    'app/_files/**/*',
    'app/_files/components/**/*',
    'app/_files/images/**/*',
    'app/_files/*.html'
  ], { base: 'app/_files' }).pipe(gulp.dest('dist/_files'))
});

gulp.task('copy-mockup', function () {
  return gulp.src([
    'app/mockup/**/*'
  ], { base: 'app/mockup' }).pipe(gulp.dest('dist/mockup'))
});

gulp.task('copy-root', function () {
  return gulp.src([
    'app/index.html'
  ], { base: 'app' }).pipe(gulp.dest('dist'))
});


gulp.task('default', gulp.series('serve', function(done) {
  done();
}));

gulp.task('copy', gulp.series('copy-root', 'copy-files', 'copy-mockup', function(done) {
  done();
}));

gulp.task('build', gulp.series('copy', 'sass-compile', 'useref', function(done) {
  done();
}));


/*** YAGI ***/
/*
gulp.task('cas', gulp.series('css-grep', function(done) {
  done();
}));


gulp.task('css-grep', function() {
  return gulp.src(['dist/_files/css/global.min.css'])
    .pipe(replace(/url\(\"\/_files\/((?=.*\")[^\"]+)/g, 'url("[system-asset]site:////UTSA-WWWROOT/_files/$1[/system-asset]'))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/_files/css/cas'));
});
*/
