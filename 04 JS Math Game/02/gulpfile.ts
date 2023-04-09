// gulp -v
// CLI version: 2.3.0
// Local version: 4.0.2

import { src, dest, watch, parallel } from "gulp";

const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const ts = require("gulp-typescript");

const tsProject = ts.createProject("tsconfig.json");

// File paths
const files = {
  sassPath: "src/**/*.scss",
  // jsPath: "src/**/*.js",
  tsPath: "src/**/*.ts",
  htmlPath: "dist/index.html",
};

// Sass to CSS
function sassTask() {
  return src(files.sassPath)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" })) // Compile SCSS to CSS; empty object causes error
    .pipe(
      postcss([
        autoprefixer({
          cascade: false,
        }),
        cssnano(),
      ])
    ) // PostCSS plugins
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

// // JS function
// function jsTask() {
//   return src([files.jsPath])
//     .pipe(uglify())
//     .pipe(
//       rename({
//         suffix: ".min",
//       })
//     )
//     .pipe(dest("dist"))
//     .pipe(browserSync.stream());
// }

function tsTask() {
  return src(files.tsPath)
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

// Browser Sync
function browser_Sync() {
  browserSync.init({
    notify: false,
    open: false,
    server: {
      baseDir: "./dist",
    },
    port: 3000,
  });
}

// Watch files
function watchFiles() {
  watch(files.sassPath, sassTask);
  // watch(files.jsPath, jsTask);
  watch(files.tsPath, tsTask);
  watch(files.htmlPath).on("change", browserSync.reload);
}

// Export
exports.default = parallel(watchFiles, browser_Sync);
