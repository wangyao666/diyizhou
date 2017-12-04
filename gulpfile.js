var gulp = require('gulp');
var fs = require('fs');
var webserver = require('gulp-webserver');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('loin',function(){
    gulp.src('./')
        .pipe(webserver({
            port:8080,
            host:'localhost',
            open:true,
            fallback:'index.html'
        }))
});

gulp.task('minicss',function(){
    gulp.src('./css/style.css')
        .pipe(minifyCss())
            .pipe(gulp.dest('./zlibcss'))
})

gulp.task('minijs',function(){
    gulp.src('./gulpfile.js')
        .pipe(uglify())
            .pipe(gulp.dest('./zlibjs'))
})

gulp.task('ajax', function () {
    gulp.src('./')
        .pipe(webserver({
            port: '8888',
            host: 'localhost',
            middleware: function (req, res, next) {
                res.writeHead(200, {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT,DELETE',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                });
                if (req.url === 'test') {
                    confirm.log(1)
                    res.end(fs.readFileSync('data/data.json'));
                }
            }
        }))
})


gulp.task('default',['loin','minicss','ajax']);