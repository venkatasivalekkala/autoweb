// @flow
import { exec } from 'child_process'
import gulp from 'gulp'

// Copy fixed packager.sh that starts the packager from the project root directory
gulp.task(
  'packager',
  ['native'],
  (cb) => gulp.src('./src/native/packager.sh')
    .pipe(gulp.dest('./node_modules/react-native/packager'))
)
