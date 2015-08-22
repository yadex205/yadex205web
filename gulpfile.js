var gulp = require("gulp"),
	plumber = require("gulp-plumber"),
	notify = require("gulp-notify"),
	ect = require("gulp-ect"),
	minifyHTML = require("gulp-minify-html"),
	sass = require("gulp-sass"),
	server = require("gulp-webserver"),
	rimraf = require("rimraf");
	
var page_files = "src/page/**/*.html",
	watch_page_files = "src/**/*.html",
	sass_files = "src/sass/**/*.{sass,scss}",
	image_files = "src/image/**/*.{jpg,png,svg,gif}",
	script_files = "src/script/**/*.js",
	bower_components = [
		"bower_components/bootstrap/dist/css/bootstrap.min.css",
		"bower_components/bootstrap/dist/js/bootstrap.min.js",
		"bower_components/jquery/dist/jquery.min.js",
		"bower_components/jquery/dist/jquery.min.map",
		"bower_components/font-awesome/css/font-awesome.min.css"
	];
	
gulp.task("default", ["build"]);

gulp.task("build", ["html", "sass", "image", "script"]);
gulp.task("test", ["build"], function () {
	gulp.src("htdocs")
		.pipe(server({
			livereload: true,
			port: 8080,
			host: "127.0.0.1"
		}));
	gulp.watch(watch_page_files, ["html"]);
	gulp.watch(sass_files, ["sass"]);
	gulp.watch(image_files, ["image"]);
	gulp.watch(script_files, ["script"]);
});

gulp.task("init", function () {
	gulp.src(bower_components)
		.pipe(gulp.dest("htdocs/components"));
	gulp.src("bower_components/font-awesome/fonts/*")
		.pipe(gulp.dest("htdocs/fonts"));
});

gulp.task("clean", function (cb) {
	rimraf("htdocs", cb);
});

gulp.task("html", function () {
	gulp.src(page_files)
		.pipe(plumber({
			errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(ect({
			ext: ".html"
		}))
		.pipe(minifyHTML())
		.pipe(gulp.dest("htdocs"));
});
gulp.task("sass", function () {
	gulp.src(sass_files)
		.pipe(plumber({
			errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(sass({
			outputStyle: "compressed"
		}))
		.pipe(gulp.dest("htdocs/css"));
});
gulp.task("image", function () {
	gulp.src(image_files)
		.pipe(gulp.dest("htdocs/image"));
});
gulp.task("script", function () {
	gulp.src(script_files)
		.pipe(gulp.dest("htdocs/script"));
});