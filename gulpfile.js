const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();


const scripts = require('./scripts');
const styles = require('./styles');
const images = require('./images');

var devMode = false;

gulp.task('css', function(){

	gulp.src(styles)
	.pipe(concat('main.css'))
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({
			stream:true

	}));
});

gulp.task('images', function(){
		gulp.src(images)
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.reload({
			stream:true

	}));

});

gulp.task('js', function(){
		gulp.src(scripts)
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload({
			stream:true

	}));

});


gulp.task('html', function(){

		gulp.src('./src/templates/**/*.html')
			.pipe(gulp.dest('./dist/'))
			.pipe(browserSync.reload({
				stream:true

			}));

		});
	



gulp.task('build', function(){

	gulp.start(['css', 'js', 'html','images'])
});

gulp.task('browser-sync', function(){

	browserSync.init(null,{
		open:false,
		server:{
			baseDir:'dist'
		}
	});
});



gulp.task('start', function(){
	devMode:true;
	gulp.start(['build','browser-sync']);
	gulp.watch(['./src/css/**/*.css'],['css']);
	gulp.watch(['./src/js/**/*.js'],['js']);
	gulp.watch(['./src/images/**/*.*'],['images']);
	gulp.watch(['./src/templates/**/*.html'],['html']);
});