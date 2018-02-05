const puppeteer = require("puppeteer");
const utils = require('./utils');

describe("👀  visuals are correct", function() {
    let browser, page;

    // This is ran when the suite starts up.
    before(async function() {
        utils.initTestDirectory();
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

    // component tests!
    describe("components", function() {
        utils.componentNames.forEach((name) => {
            it(`${name}`, async function() {
                return utils.takeAndCompareScreenshots(page, name, "components");
            });
        })
    });
});
