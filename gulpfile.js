var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var docgen = require('baasic-javascript-docgen');

var paths = {
  scripts: ['src/**/*.js']
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(plugins.order(["*.moduleDefinition.js", "*.js"]))
	.pipe(plugins.concat('baasic-angular-dynamic-resource.js'))
	.pipe(plugins.header('(function (angular, undefined) {\n'))
	.pipe(plugins.footer('\n})(angular);'))
	.pipe(plugins.beautify())
	.pipe(gulp.dest('dist'))
	.pipe(plugins.uglify())
	.pipe(plugins.rename('baasic-angular-dynamic-resource.min.js'))
	.pipe(gulp.dest('dist'));
});

gulp.task('docs', function() {
  docgen.generateBaasicDocs('src', 'wiki', 'Baasic Dynamic Resource Navigation', ['config.js'], ['home.md']);
});

gulp.task('default', ['scripts', 'docs']);
