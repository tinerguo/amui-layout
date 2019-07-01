// generated on 2017-10-10 using generator-webapp 3.0.1
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
//const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');
const $ = gulpLoadPlugins();
const reload = browserSync.reload;
var fileinclude = require('gulp-file-include');
let dev = true;
var less = require('gulp-less');


//TODO : css样式文件
/**
 处理sass文件
 */
gulp.task('css', () => {
        return gulp.src('app/static/css/*.scss')
                .pipe($.plumber())//管道错误处理
                .pipe($.if(dev, $.sourcemaps.init()))//如果开发阶段生成map文件 初始化
                .pipe($.sass.sync({//sass 转换
                        outputStyle: 'expanded',
                        precision: 10,
                        includePaths: ['.']
                }).on('error', $.sass.logError))//sass错误处理
                .pipe($.autoprefixer({
                        browsers: ['last 2 versions'],
                        cascade: false
                }))
                .pipe($.if(dev, $.sourcemaps.write()))//map写入
                .pipe(gulp.dest('.tmp/static/css'))//css 生成路径
                .pipe(reload({stream: true}));
});

gulp.task('less', () => {
        return gulp.src('app/static/css/*.less')
                .pipe($.plumber())//管道错误处理
                .pipe($.if(dev, $.sourcemaps.init()))
                .pipe(less())
                .pipe($.autoprefixer({
                        browsers: ['last 2 versions'],
                        cascade: false
                }))
                .pipe($.if(dev, $.sourcemaps.write()))//map写入
                .pipe(gulp.dest('.tmp/static/css'))//css 生成路径
                .pipe(reload({stream: true}));
});

//TODO: js样式生成
/**
 处理es6文件
 */
gulp.task('scripts', () => {
        return gulp.src('app/static/scripts/**/*.js')
                .pipe($.plumber())
                .pipe($.if(dev, $.sourcemaps.init()))
                .pipe($.babel())//实时转换ES6
                .pipe($.if(dev, $.sourcemaps.write('.')))
                .pipe(gulp.dest('.tmp/static/scripts'))
                .pipe(reload({stream: true}));
});

//TODO: 校验js文件
function lint(files) {
        return gulp.src(files)
                .pipe($.eslint({fix: true}))
                .pipe(reload({stream: true, once: true}))
                .pipe($.eslint.format())
                .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

//校验js
gulp.task('lint', () => {
        return lint('app/static/scripts/**/*.js')
                .pipe(gulp.dest('.tmp/static/scripts'));
});

//TODO: 生成html文件
/**
 步骤：
 目标：.tmp 文件夹
 useref 是合并所有的js和css
 uglify: 压缩js
 cssnano 压缩css
 revision 生成版本号
 htmlmin 压缩
 */

gulp.task('html', () => {
        return gulp.src(['.tmp/**/*.html', '.tmp/*.html'])
                .pipe($.plumber())//'app','app/pages',,'app/pages','app'
                .pipe($.useref({searchPath: ['.tmp/**', 'app/**']}))//合并js

                .pipe($.if(/\.js$/, $.uglify({compress: {drop_console: true}})))//压缩，去掉console输出
                .pipe($.if(/\.css$/, $.cssnano({safe: true, autoprefixer: false})))//css
                .pipe($.revAll.revision({ // 生成版本号
                        dontRenameFile: ['.html'], // 不给 html 文件添加版本号
                        dontUpdateReference: ['.html'] // 不给文件里链接的html加版本号
                }))
                .pipe($.if(/\.html$/, $.htmlmin({//html压缩操作
                        collapseWhitespace: false,
                        minifyCSS: true,
                        minifyJS: {compress: {drop_console: true}},
                        processConditionalComments: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                })))
                .pipe(gulp.dest('dist'));
});

var post = 9000;

//TODO: 生成html ejs 文件
gulp.task('includehtml', () => {
        return gulp.src(['app/**/*.html', '!app/**/include/*.html'])
                .pipe($.plumber())
                .pipe($.ejs({
                  // CP:'http://localhost:9000',
                  // APIV1:'http://localhost:8000'
                }, {ext: '.html'}))
                // .pipe($.changed('.tmp'))
                .pipe(gulp.dest('.tmp'))
                .pipe(reload({stream: true}));
});

//TODO： 图片操作
gulp.task('images', () => {
        return gulp.src('app/images/**/*')
                .pipe($.cache($.imagemin()))
                .pipe(gulp.dest('dist/images'));
});

//TODO：字体操作
gulp.task('fonts', () => {
        return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {
        })
                .concat('app/fonts/**/*'))
                .pipe($.if(dev, gulp.dest('.tmp/fonts'), gulp.dest('dist/fonts')));
});

//TODO: 创建目录
gulp.task('extras', () => {
        return gulp.src([
                'app/*',
                '!app/*.html'
        ], {
                dot: true
        }).pipe(gulp.dest('dist'));
});

//TODO: 清空目录
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

//TODO: 运行开发环境
gulp.task('serve', () => {
        runSequence(['clean'], ['css','less', 'scripts', 'fonts', 'includehtml'], () => {
                browserSync.init({
                        notify: false,
                        port: post,
                        open: false,
                        ui: false,
                        startPath:'/app/',
                        server: {
                                baseDir: ['.tmp', './'],
                                routes: {
                                  '/pages': '.tmp/pages'
                                }
                        }
                });

                gulp.watch([
                        'app/static/images/**/*',
                        'app/include/*.html',
                ]).on('change', reload);

                gulp.watch('app/static/css/**/*.scss', ['css']);
                gulp.watch('app/static/css/**/*.less', ['less']);
                gulp.watch('app/static/scripts/**/*.js', ['scripts']);
                gulp.watch('app/static/fonts/**/*', ['fonts']);
                gulp.watch('app/**/*.html', ['includehtml']);
        });
});

//TODO: 运行开发环境
gulp.task('copy', () => {
        gulp.src([
                'app/**/*.*',
                '!app/**/*.html',
                '!app/static/css/**/*.scss',
                '!app/static/css/**/*.less',
                '.tmp/**/*.*'
        ]).pipe(gulp.dest('push'));

        gulp.src([
                'dist/**/*.*'
        ]).pipe(gulp.dest('push/plugins/customCom'));
});


gulp.task('push', () => {

  runSequence(['clean'], ['css','less', 'scripts', 'fonts', 'includehtml'],['copy'], () => {

    console.log("完成");

  });

});


gulp.task('pushserve', () => {
  browserSync.init({
    notify: false,
    port: post,
    open: false,
    ui: false,
    server: {
      baseDir: ['push']
    }
  });
});
