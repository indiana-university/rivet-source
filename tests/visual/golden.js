const puppeteer = require("puppeteer");
const expect = require("chai").expect;
const utils = require('./utils');

describe("✨  taking golden screenshots ✨", function() {
    let browser, page;

    // This is ran when the suite starts up.
    before(async function() {
        utils.initGoldenDirectory();
        utils.startServer();
    });

    // This is ran before every test. It's where you start a clean browser.
    beforeEach(async function() {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        page.setViewport({ width: 800, height: 1000 });
    });

    // This is ran after every test; clean up after your browser.
    afterEach(() => browser.close());

    // Wide screen tests!
    describe("components", function() {
        utils.componentNames.forEach((name) => {
            it(`screenshotting ${name}`, async function() {
                return utils.takeGoldenScreenshots(page, name, "components");
            });
        })
    });
});
