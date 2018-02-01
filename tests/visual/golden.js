const puppeteer = require("puppeteer");
const expect = require("chai").expect;
const browserSync = require('browser-sync');
const fs = require('fs');
const PNG = require('pngjs').PNG;

const goldenDir = "tests/visual/golden_ss";

// - page is a reference to the Puppeteer page.
// - route is the path you're loading, which I'm using to name the file.
// - filePrefix is either "wide" or "narrow", since I'm automatically testing both.
async function takeScreenshots(page, route, filePrefix) {
    // If you didn't specify a file, use the name of the route.
    let fileName = filePrefix + '/' + (route ? route : 'index');
  
    // Start the browser, go to that page, and take a screenshot.
    await page.goto(`http://127.0.0.1:3000/components/preview/${route}.html`);
    await page.screenshot({path: `${goldenDir}/${fileName}.png`});
  }

describe("✨  take golden screenshots ✨", function() {
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
        if (!fs.existsSync(goldenDir)) fs.mkdirSync(goldenDir);

        // And its wide screen/small screen subdirectories.
        if (!fs.existsSync(`${goldenDir}/components`)) fs.mkdirSync(`${goldenDir}/components`);
    });

    // This is ran before every test. It's where you start a clean browser.
    beforeEach(async function() {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    // This is ran after every test; clean up after your browser.
    afterEach(() => browser.close());

    // Wide screen tests!
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
                return takeScreenshots(page, name, "components");
            });
        })
    });
});
