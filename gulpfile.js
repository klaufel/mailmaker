'use strict';

// Includes packages
var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    cleanCss        = require('gulp-clean-css'),
    inlineCss       = require('gulp-inline-css'),
    pug             = require('gulp-pug2'),
    zip             = require('gulp-zip'),
    notify          = require('gulp-notify');


// Paths variables
var paths = {
    dist       : 'dist',
    views      : ['dist/*.html'],
    css        : 'dist/assets/css',
    pug        : ['src/pug/*.pug'],
    pugWatch   : ['src/pug/**/*.pug'],
    mainsass   : ['src/style.scss'],
    sass       : ['src/scss/**/*.scss'],
};


//------------------------------------------------------


//## Developing tasks

// Compile SASS
gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['IE 8', 'IE 9', 'last 5 versions']}))
        .pipe(cleanCss())
        .pipe(gulp.dest(paths.css))
        .pipe(notify({ title: 'SASS', message: 'Compiled successfully.', onLast: true}));
});


// Migrating template structure for Pug (Jade)
gulp.task('views', ['sass'], function() {
  return gulp.src(paths.pug)
    .pipe(pug({ yourTemplate: '' }))
    .pipe(gulp.dest(paths.dist))
    .pipe(notify({ title: 'PUG', message: 'HTML generated successfully.', onLast: true}));
});


// Inline CSS properties into the style attribute in an html file
gulp.task('inline-css', ['views'], function() {
  return gulp.src(paths.views)
    .pipe(inlineCss({
      applyStyleTags: false,
      applyLinkTags: true,
      removeStyleTags: false,
      removeLinkTags: true
    }))
    .pipe(gulp.dest(paths.dist))
    .pipe(notify({ title: 'Inline CSS', message: 'Style attribute in an html files successfully added.', onLast: true}));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.pugWatch, ['views']);
});

// Rerun the task when a file changes
gulp.task('zip', ['inline-css'], function() {
  gulp.src('dist/**/*')
    .pipe(zip('mailmaker.zip'))
    .pipe(gulp.dest('dist'))
    .pipe(notify({ title: 'Package', message: 'ZIP successfully generated.', onLast: true}));
});


// Run default task
gulp.task('default', ['sass', 'views', 'watch']);


//------------------------------------------------------


//## Distribution tasks

// Run default task
gulp.task('dist', ['sass', 'views', 'inline-css', 'zip']);
