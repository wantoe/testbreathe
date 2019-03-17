const { describe, it, after, before } = require('mocha');
const Page = require('../lib/homePage');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function testLogin() {
    try {
        describe ('Testing login using username and password', async function () {
            this.timeout(50000);
            let driver, page;

            beforeEach (async () => {
                page = new Page();
                driver = page.driver;
                await page.visit('localhost:8080');
            });

            afterEach (async () => {
                await page.quit();
            });

            it('enter credentials, click the login button and logs in', async () => {
                const result = await page.clickLogin();
                expect(result).to.include('View your data');
            });
        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();