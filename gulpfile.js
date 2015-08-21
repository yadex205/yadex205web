var gulp = require("gulp"),
	plumber = require("gulp-plumber"),
	notify = require("gulp-notify"),
	ect = require("gulp-ect"),
	sass = require("gulp-sass"),
	server = require("gulp-webserver");
	
var page_files = "src/page/**/*.html",
	sass_files = "src/sass/**/*.{sass,scss}",
	image_files = "src/image/**/*.{jpg,png,svg,gif}",
	script_files = "src/script/**/*.js";
	
gulp.task("default", ["build"]);

gulp.task("build", ["ect", "sass", "image", "script"]);

gulp.task("test", ["build", "watch"]);

gulp.task("watch", function () {
	gulp.watch(page_files, ["ejs"]);
	gulp.watch(sass_files, ["sass"]);
	gulp.watch(image_files, ["image"]);
	gulp.watch(script_files, ["script"]);
	gulp.src("htdocs")
		.pipe(server({
			livereload: true,
			port: 8080,
			host: "127.0.0.1"
		}));
});

gulp.task("ect", function (callback) {
	gulp.src(page_files)
		.pipe(ect({
			ext: ".html"
		}))
		.pipe(gulp.dest("htdocs"));
});
gulp.task("sass", function (callback) {
	gulp.src(sass_files)
		.pipe(sass())
		.pipe(gulp.dest("htdocs/css"));
});
gulp.task("image", function (callback) {
	gulp.src(image_files)
		.pipe(gulp.dest("htdocs/image"));
});
gulp.task("script", function (callback) {
	gulp.src(script_files)
		.pipe(gulp.dest("htdocs/script"));
});