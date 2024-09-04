const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed' // minify
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

function comprimeImages () {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

function comprimeJS () {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'));
}


exports.default = function() {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimeImages));
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(comprimeJS));
}