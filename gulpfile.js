const sourcemap = require('gulp-sourcemaps')
const ts = require('gulp-typescript')
const gulp = require('gulp')
const path = require('path')

const project = ts.createProject('tsconfig.json')

gulp.task('default', ['build'])

gulp.task('build', () => {
  const tsCompile = gulp.src('src/**/*.ts')
    .pipe(sourcemap.init({ base: 'src' }))
    .pipe(project())

  tsCompile.pipe(gulp.dest('lib/'))

  return tsCompile.js
    .pipe(sourcemap.mapSources(sourcePath => path.join(__dirname, 'src', sourcePath)))
    .pipe(sourcemap.write('.', { includeContent: false, sourceRoot: 'src' }))
    .pipe(gulp.dest('lib/'))
})
