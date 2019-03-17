const { describe, it, after, before} = require('mocha');
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

            it ('click the username box and enter the username', async () => {
                const result = await page.enterUsername();
                expect(result.writtenUsername).to.include('tester1');
            })

            it('click the password box and enter the password', async () => {
                const result = await page.enterPassword();
                expect(result.writtenPassword).to.include('tester1');
            })

            it('click the login button and logs in', async () => {
                const result = await page.clickLogin();
                expect(result).to.include('Christof Lutteroth');
            })
        })
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
});