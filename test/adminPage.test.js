const { describe, it, after, before } = require('mocha');
const Page = require('../lib/adminPage');
const fakeData = require('../utils/fakeData');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function testMenu() {
    try{
        describe('Testing the side menu', async function() {
            this.timeout(50000);
            let page, driver;
            
            beforeEach(async function () {
                page = new Page();
                driver = page.driver;

                await page.visitDefault();
                await page.login(fakeAdmin.username, fakeAdmin.password);
            });

            afterEach(async function () {
                await page.quit();
            });

            it('Clicking on signup transitions to signup', async function () {

            });

            it('Clicking on dashboard transitions to dashboard', async function () {

            });

            it('Clicking on logout logs out', async function () {

            });
        });
    } catch(ex) {
        console.log(new Error(ex));
    } finally {

    }
})();

(async function testClinicianTable() {
    try {

    } catch(ex) {
        console.log(new Error(ex));
    } finally {

    }
})();

(async function testUserTable() {
    try {
        
    } catch(ex) {
        console.log(new Error(ex));
    } finally {

    }
})();

(async function testSignup() {
    try {

    } catch(ex) {
        console.log(new Error(ex));
    } finally {

    }
})();