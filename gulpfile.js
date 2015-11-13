var gulp = require( 'gulp' );
var minifyCss = require( 'gulp-minify-css' );
var less = require( 'gulp-less' );

gulp.task( 'less', function () {
  return gulp.src( './assets/less/*.less' )
    .pipe( less() )
    .pipe( minifyCss() )
  	.pipe( gulp.dest( './assets/css' ) );
});

gulp.task( 'minify', function() {
  return gulp.src( './assets/css/*.css' )
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe( gulp.dest( './assets/css/' ));
});