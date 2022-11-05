//GIT: Создать репозиторий на гите; F1 > clone > вставить скопированную ссылку из созданого репа > выбрать текущую папку
//1. npm init
//2. npm install
//3. npm i -D webp-converter@2.2.3
//4. gulp

//npm run build - для продакшн
//npm run deploy - выгрузка на фтп

/**
 * path-autocomplete F1 > open user settings json (C:\Users\Nata\AppData\Roaming\Code\User\settings.json)
 *     "path-autocomplete.pathMappings": {
        "@img": "${folder}/__src/img", //alias for images
        "@scss": "${folder}/__src/scss", //alias for scss
        "@js": "${folder}/__src/js", //alias for js
        "@html": "${folder}/__src/html" //alias for js
    },
 */

// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаем значения в глобавльную переменную
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";

//import { svgSprive } from "./gulp/tasks/svgSprive.js";
//import { zip } from "./gulp/tasks/zip.js";

//import { ftp } from "./gulp/tasks/ftp.js";

// Наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

//export { svgSprive }

// Последовательность обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// Построение сценариев выполнения задачи
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
//const deployZIP = gulp.series(reset, mainTasks, zip);
//const deployFTP = gulp.series(reset, mainTasks, ftp);

// Экспорт сценраиев
export { dev }
export { build }
//export { deployZIP }
//export { deployFTP }

// Выполнение сценария по умолчанию
gulp.task('default', dev);

