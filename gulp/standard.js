// @flow
import gulp from 'gulp'
import standard from 'gulp-standard'

gulp.task('standard', done => {
  return gulp
    .src(
      [
        'gulp/**/*.js',
        'gulpfile.babel.js',
        'messages/*.js',
        'src/**/*.js',
        'webpack/*.js',
      ],
  	)
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})
