const puppeteer = require("puppeteer");
const expect = require("chai").expect;
const browserSync = require('browser-sync');
const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

const testDir = "tests/visual/test_ss";
const goldenDir = "tests/visual/golden_ss";

function compareScreenshots(fileName) {
    return new Promise((resolve, reject) => {
      const img1 = fs.createReadStream(`${testDir}/${fileName}.png`).pipe(new PNG()).on('parsed', doneReading);
      const img2 = fs.createReadStream(`${goldenDir}/${fileName}.png`).pipe(new PNG()).on('parsed', doneReading);
  
      let filesRead = 0;
      function doneReading() {
        // Wait until both files are read.
        if (++filesRead < 2) return;
  
        // The files should be the same size.
        expect(img1.width, 'image widths are the same').equal(img2.width);
        expect(img1.height, 'image heights are the same').equal(img2.height);
  
        // Do the visual diff.
        const diff = new PNG({width: img1.width, height: img2.height});
        const numDiffPixels = pixelmatch(
            img1.data, img2.data, diff.data, img1.width, img1.height,
            {threshold: 0.1});
  
        // The files should look the same.
        expect(numDiffPixels, 'number of different pixels').equal(0);
        resolve();
      }
    });
  }


// - page is a reference to the Puppeteer page.
// - route is the path you're loading, which I'm using to name the file.
// - filePrefix is either "wide" or "narrow", since I'm automatically testing both.
async function takeAndCompareScreenshot(page, route, filePrefix) {
    // If you didn't specify a file, use the name of the route.
    let fileName = filePrefix + '/' + (route ? route : 'index');
  
    // Start the browser, go to that page, and take a screenshot.
    await page.goto(`http://127.0.0.1:3000/components/preview/${route}.html`);
    await page.screenshot({path: `${testDir}/${fileName}.png`});
  
    // Test to see if it's right.
    return compareScreenshots(fileName);
  }

describe("👀  visuals are correct", function() {
    let browser, page;

    // This is ran when the suite starts up.
    before(async function() {
        browserSync({
            port: 3000,
            server: "_build/",
            notify: false,
            open: false,
            ui: false,
            logLevel: "silent"
        });

        // Create the test directory if needed. This and the goldenDir
        // variables are global somewhere.
        if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);

        // And its wide screen/small screen subdirectories.
        if (!fs.existsSync(`${testDir}/components`)) fs.mkdirSync(`${testDir}/components`);
    });

    // This is ran before every test. It's where you start a clean browser.
    beforeEach(async function() {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    // This is ran after every test; clean up after your browser.
    afterEach(() => browser.close());

    // component tests!
    describe("components", function() {
        beforeEach(async function() {
            return page.setViewport({ width: 800, height: 1000 });
        });
        const components = [
            'type-scale',
            'spacing',
            'links',
            'lists',
            'text-inputs-and-textarea',
            'select-input',
            'radio-inputs',
            'checkboxes',
            'buttons',
            'tables--default',
            'alerts--default',
            'modals--default',
            'header--default',
            'footer',
            'grid',
            'pagination',
            'breadcrumb',
            'badges',
            'panel',
            'tabs--default',
            'file-input',
        ]
        components.forEach((name) => {
            it(`/${name}`, async function() {
                return takeAndCompareScreenshot(page, name, "components");
            });
        })
    });
});
