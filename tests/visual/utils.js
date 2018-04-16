const browserSync = require('browser-sync');
const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const expect = require("chai").expect;

const goldenDir = "tests/visual/golden_ss";
const testDir = "tests/visual/test_ss";
const componentNames = [
    "type-scale",
    "spacing",
    "links",
    "lists",
    "text-inputs",
    "select-input",
    "radio-inputs",
    "checkboxes",
    "buttons",
    "tables--default",
    "alerts--default",
    "modals--default",
    "header--default",
    "footer",
    "grid",
    "pagination",
    "breadcrumb",
    "badges",
    "panel",
    "tabs--default",
    "file-input",
    "dropdown",
    "input-group"
];

// - page is a reference to the Puppeteer page.
// - route is the path you're loading, which I'm using to name the file.
// - filePrefix is either "wide" or "narrow", since I'm automatically testing both.
async function takeScreenshots(page, route, filePrefix, dest) {
    // If you didn't specify a file, use the name of the route.
    let fileName = filePrefix + "/" + (route ? route : "index");

    // Start the browser, go to that page, and take a screenshot.
    await page.goto(`http://127.0.0.1:3000/components/preview/${route}`);
    await page.screenshot({ path: `${dest}/${fileName}.png` });
}

function compareScreenshots(route, filePrefix) {
    let fileName =  filePrefix + "/" + (route ? route : "index");

    return new Promise((resolve, reject) => {
        const img1 = fs
            .createReadStream(`${testDir}/${fileName}.png`)
            .pipe(new PNG())
            .on("parsed", doneReading);
        const img2 = fs
            .createReadStream(`${goldenDir}/${fileName}.png`)
            .pipe(new PNG())
            .on("parsed", doneReading);

        let filesRead = 0;
        function doneReading() {
            // Wait until both files are read.
            if (++filesRead < 2) return;

            // The files should be the same size.
            expect(img1.width, "image widths are the same").equal(img2.width);
            expect(img1.height, "image heights are the same").equal(
                img2.height
            );

            // Do the visual diff.
            const diff = new PNG({ width: img1.width, height: img2.height });
            const numDiffPixels = pixelmatch(
                img1.data,
                img2.data,
                diff.data,
                img1.width,
                img1.height,
                { threshold: 0.1 }
            );

            // The files should look the same.
            expect(numDiffPixels, "number of different pixels").equal(0);
            resolve();
        }
    });
}

async function takeGoldenScreenshots(page, route, filePrefix) {
    return takeScreenshots(page, route, filePrefix, goldenDir);
}

async function takeAndCompareScreenshots(page, route, filePrefix) {
    await takeScreenshots(page, route, filePrefix, testDir);
    return compareScreenshots(route, filePrefix);
}

function initDirectory(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    if (!fs.existsSync(`${dir}/components`)) fs.mkdirSync(`${dir}/components`);
}

function initTestDirectory() {
    initDirectory(testDir);
}

function initGoldenDirectory() {
    initDirectory(goldenDir);
}

function startServer() {
    browserSync({
        port: 3000,
        server: "_build/",
        notify: false,
        open: false,
        ui: false,
        logLevel: "silent"
    });
}

module.exports = {
    initTestDirectory,
    initGoldenDirectory,
    startServer,
    takeScreenshots,
    takeGoldenScreenshots,
    compareScreenshots,
    takeAndCompareScreenshots,
    componentNames
};
