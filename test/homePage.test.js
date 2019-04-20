const { describe, it, after, before } = require('mocha');
const Page = require('../lib/homePage');
const fakeData = require('../utils/fakeData');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function testLoginPass() {
    try {
        describe ('Testing login using username and password', async function () {
            this.timeout(50000);
            let driver, page;

            beforeEach (async () => {
                page = new Page();
                driver = page.driver;
                await page.visit(page.url);
            });

            afterEach (async () => {
                await page.quit();
            });

            it ('enter credentials, click the login button and logs in', async () => {
                const usernameE = await page.getUsernameE();
                const passwordE = await page.getPasswordE();

                page.waitUntilDisplayed(usernameE);
                page.waitUntilDisplayed(passwordE);

                await usernameE.sendKeys(fakeData.user);
                await passwordE.sendKeys(fakeData.userPassword);
                usernameE.submit();

                const resultsPageTitleE = await page.getResultsPageTitleE();
                const result = await resultsPageTitleE.getText();

                expect(result).to.include('View your data');
            });
        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();
(async function testLoginFail() {
    try {
        describe ('Testing login with false credentials', async function () {
            this.timeout(50000);
            let driver, page;

            beforeEach (async () => {
                page = new Page();
                driver = page.driver;
                await page.visit(page.url);
            });

            afterEach (async () => {
                await page.quit();
            });

            it ('enter invalid credentials, results in a failed credentials message', async() => {
                const usernameE = await page.getUsernameE();
                const passwordE = await page.getPasswordE();

                page.waitUntilDisplayed(usernameE);

                await usernameE.sendKeys(fakeUser.username);
                await passwordE.sendKeys('asdf');
                usernameE.submit();

                page.waitUntilLoaded('login');

                const invalidCredentialsE = await page.getInvalidCredentialsE();
                const result = await invalidCredentialsE.getText();

                expect(result).to.include('Invalid Credentials');
            });

            it ('enter unregistered username, results in a wrong username or password message', async() => {
                const usernameE = await page.getUsernameE();
                const passwordE = await page.getPasswordE();

                page.waitUntilDisplayed(usernameE);

                await usernameE.sendKeys('asdf');
                await passwordE.sendKeys('asdf');
                usernameE.submit();

                page.waitUntilLoaded('login');

                const invalidUsernamePasswordE = await page.getInvalidUsernamePasswordE();
                const result = await invalidUsernamePasswordE.getText();

                expect(result).to.include('Wrong Username or Password');
            });
        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();

(async function testLoginClinician() {
    try {
        describe('Testing login of clinician', async function () {
            this.timeout(50000);
            let driver, page;

            beforeEach(async () => {
                page = new Page();
                driver = page.driver;
                await page.visit(page.url);
            });

            afterEach(async() => {
                await page.quit();
            });

            it('enter clinician credentials and login', async function () {
                const usernameE = await page.getUsernameE();
                const passwordE = await page.getPasswordE();

                page.waitUntilDisplayed(usernameE);

                await usernameE.sendKeys(fakeClinician.username);
                await passwordE.sendKeys(fakeClinician.password);
                usernameE.submit();

                const clinicianTableE = await page.getClinicianTableE();

                page.waitUntilDisplayed(clinicianTableE);

                //if the table displays, then this page has been reached successfully.
                expect(true);
            });
        });
    } catch(ex) {
        console.log(new Error(ex.message));
    } finally {

    }
});

(async function testLoginAdmin() {
    try {
        describe('Testing login of admin', async function () {
            this.timeout(50000);
            let driver, page;

            beforeEach(async () => {
                page = new Page();
                driver = page.driver;
                await page.visit(page.url);
            });

            afterEach(async() => {
                await page.quit();
            });

            it('enter admin credentials and login', async function () {
                const usernameE = await page.getUsernameE();
                const passwordE = await page.getPasswordE();

                page.waitUntilDisplayed(usernameE);

                await usernameE.sendKeys(fakeAdmin.username);
                await passwordE.sendKeys(fakeAdmin.password);
                usernameE.submit();

                const adminTitleE = await page.getAdminPageTitleE();
                const result = await adminTitleE.getText();

                expect(result).to.include("Pending Clinicians");
            });
        })
    } catch(ex) {
        console.log(new Error(ex));
    } finally {

    }
});

(async function testCreate() {
    try {
        describe ('Testing new account form', async function () {
            this.timeout(50000);
            let driver, page;

            beforeEach (async () => {
                page = new Page();
                driver = page.driver;
                await page.visit(page.url);
            });

            afterEach (async () => {
                await page.quit();
            });

            it ('click the new account button to transition to form', async () => {
                await page.clickNewAccount();
                const result = await driver.getCurrentUrl();
                expect(result).to.include('#');
            });

            //actual account creation needs to be manually tested, as the captcha can't be clicked by selenium.
        })
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();

(async function testClinician() {
    try {
        describe ('Testing clinician form', async function () {
            this.timeout(50000);
            let driver, page;

            beforeEach (async () => {
                page = new Page();
                driver = page.driver;
                await page.visit(page.url);
            });

            afterEach (async () => {
                await page.quit();
            });

            it ('click the clinician signup to transition to new form', async () => {
                await page.clickClinicianForm();

                page.waitUntilLoaded('SignUpPhysician');

                const result = await driver.getCurrentUrl();
                expect(result).to.include('SignUpPhysician');
            });

            //again, there is a captcha, cannot automate this. Test new clinician registration manually.
        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();

(async function testAbout() {
    try {
        describe ('Testing the about button', async function () {
            this.timeout(50000);
            let driver, page;

            beforeEach (async () => {
                page = new Page();
                driver = page.driver;
                await page.visit(page.url);
            });

            afterEach (async() => {
                await page.quit();
            });

            it ('click the about button, expect text to show up', async () => {
                await page.clickAbout();

                homePageAboutInfoE = await page.getHomePageAboutInfoE();

                const result = await homePageAboutInfoE.getText();
                expect(result).to.include('Developed by University of Auckland staff');
            })
        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();