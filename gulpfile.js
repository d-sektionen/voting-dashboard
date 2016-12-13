var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var streamify = require('gulp-streamify');

var path = {
    OUT: 'build.js',
    DEST2: './project/static/scripts',
    DEST_BUILD: 'js',
    DEST_DEV: 'js',
    ENTRY_POINT: './project/static/scripts/jsx/Dashboard.jsx'
};

gulp.task('watch', [], function () {
    var bundler = browserify({
        entries: [path.ENTRY_POINT],
        extensions: [".js", ".jsx"],
        debug: true,
        fullPaths: true,
        cache: {},
        packageCache: {}
    }).transform("babelify", {
        presets: ["es2015", "react"]
    });


    bundler.plugin(watchify, {
//      delay: 100,
//      ignoreWatch: ['**/node_modules/**'],
//      poll: false
    });

    var rebundle = function () {
        var startDate = new Date();
        console.log('Update start at ' + startDate.toLocaleString());
        return bundler.bundle(function (err, buf) {
            if (err) {
                console.log(err.toString());
            } else {
                console.log(' updated in ' + (new Date().getTime() - startDate.getTime()) + ' ms');
            }
        })
            .pipe(source(path.OUT))
            .pipe(gulp.dest(path.DEST2 + '/' + path.DEST_DEV))
            ;
    };

    bundler.on('update', rebundle);
    return rebundle();
});

gulp.task('default', ['watch']);