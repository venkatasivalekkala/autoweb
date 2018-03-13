// @flow
import childProcess from 'child_process'
import gulp from 'gulp'

gulp.task('deploy-now', ['deploy-firebase-database'], done => {
  const sha = childProcess('now', ['-e', 'NODE_ENV=production', '-e', `appVersion=${sha}`], {
      stdio: 'inherit',
    })
    .on('close', done)
})
