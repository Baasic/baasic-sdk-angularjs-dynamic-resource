var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var docgen = require('baasic-javascript-docgen');
var injectVersion = require('gulp-inject-version');

var paths = {
  scripts: ['src/**/*.js']
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(plugins.order(["*.moduleDefinition.js", "*.js"]))
	.pipe(plugins.concat('baasic-angular-dynamic-resource.js'))
	.pipe(plugins.header('/*\n Baasic AngularJS Dynamic Resource %%GULP_INJECT_VERSION%%\n (c) 2014-' + new Date().getFullYear() + ' Mono Ltd.  http://baasic.com\n License: MIT\n*/\n(function (angular, undefined) {\n')) 
	.pipe(plugins.footer('\n})(angular);'))
    .pipe(injectVersion())
	.pipe(plugins.beautify())
	.pipe(gulp.dest('dist'))
	.pipe(plugins.uglify({output: {comments: /^!|License: MIT/i}}))
	.pipe(plugins.rename('baasic-angular-dynamic-resource.min.js'))
	.pipe(gulp.dest('dist'));
});

gulp.task('docs', function() {
  docgen.generateBaasicDocs('src', 'wiki', 'Baasic Dynamic Resource Navigation', ['config.js'], ['home.md']);
});

gulp.task('default', ['scripts', 'docs']);
