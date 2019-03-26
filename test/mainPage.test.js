const { describe, it, after, before } = require('mocha');
const Page = require('../lib/mainPage');
const fakeData = require('../utils/fakeData');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function testMenu() {
    try {
        describe ('Testing main menu functionality', async function () {
            this.timeout(50000);
            let driver, page;

            beforeEach (async () => {
                page = new Page();
                driver = page.driver;
                await page.visit('localhost:8080');

                //This is the login functionality code, and will get us to the main page.
                const usernameE = await page.getUsernameE();
                const passwordE = await page.getPasswordE();

                page.waitUntilDisplayed(usernameE);
                page.waitUntilDisplayed(passwordE);

                await usernameE.sendKeys(fakeData.user);
                await passwordE.sendKeys(fakeData.userPassword);
                usernameE.submit();
            });

            afterEach (async () => {
                page.quit();
            });

            it ('Clicking on the submit button transitions to submit', async () => {
                const submitE = await page.getSubmitE();
                submitE.click();

                const submitTitleE = await page.getSubmitTitleE();
                result = await submitTitleE.getText();

                expect(result).to.include('Submit Data');
            });

            it ('Clicking on the signup button transitions to signup', async () => {
                const signupE = await page.getSignupE();
                signupE.click();

                const signupTitleE = await page.getSignupTitleE();
                const result = await signupTitleE.getText();

                expect(result).to.include('Registration Form for Parents');
            });

            it ('Clicking on the logout button transitions to logout', async () => {
                const logoutE = await page.getLogoutE();
                logoutE.click();

                const homeAboutE = await page.getHomePageAboutE();
                const result = await homeAboutE.getText();

                expect(result).to.include('About BreatheHero');
            });

            it ('Clicking on the activity button transitions to activity', async () => {
                //transition to a different page, as activity is the default.
                const submitE = await page.getSubmitE();
                submitE.click();

                const activityE = await page.getActivityE();
                activityE.click();

                const resultsPageTitleE = await page.getResultsPageTitleE();
                const result = await resultsPageTitleE.getText();

                expect(result).to.include('View your data');
            });
        })

    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();

(async function testSubmit() {
    try {
        describe('Testing the submit form', async function () {
            this.timeout(50000);
            let page, driver;

            beforeEach(async () => {
                page = new Page();
                driver = page.driver;
                await page.visit('localhost:8080');

                //This is the login functionality code, and will get us to the main page.
                const usernameE = await page.getUsernameE();
                const passwordE = await page.getPasswordE();

                page.waitUntilDisplayed(usernameE);
                page.waitUntilDisplayed(passwordE);

                await usernameE.sendKeys(fakeData.user);
                await passwordE.sendKeys(fakeData.userPassword);
                usernameE.submit();
            });

            afterEach(async () => {
                page.quit();
            });

            it('Testing the form with current date and random vals', async () => {
                const submitE = await page.getSubmitE();
                submitE.click();

                //get the form elements.
                const submitDateE = await page.getSubmitDateE();
                const submitDurationE = await page.getSubmitDurationE();
                const submitButtonE = await page.getSubmitButtonE();

                //submit the data.
                var formatted = '28' + '3' + '2019\t' + '12' + '31' + 'PM';
                
                await submitDateE.sendKeys(formatted);
                await submitDurationE.sendKeys('10\t3\t8\t2\t4\t5\t2');

                await driver.sleep(10000);
                
                await submitButtonE.click();

                expect(true);

                //TODO: automate verification. Currently, just check that there is a new value equal to the current date through postman.
            });
        });
    } catch (ex) {
        log.console(new Error(ex.message));
    } finally {

    }
})();

(async function testParental() {
    try {
        describe('Testing parental signup form', async function () {
            this.timeout(50000);
            let page, driver;

            beforeEach(async () => {
                page = new Page();
                driver = page.driver;
                await page.visit('localhost:8080');

                //This is the login functionality code, and will get us to the main page.
                const usernameE = await page.getUsernameE();
                const passwordE = await page.getPasswordE();

                page.waitUntilDisplayed(usernameE);
                page.waitUntilDisplayed(passwordE);

                await usernameE.sendKeys(fakeData.user);
                await passwordE.sendKeys(fakeData.userPassword);
                usernameE.submit();
            });

            afterEach(async () => {
                page.quit();
            });

            it('Able to submit a parental signup form', async () => {
                const parentalE = await page.getSignupE();
                await parentalE.click();

                const parentalNameE = await page.getParentalNameE();

                const firstName = 'foo' + '\t';
                const lastName = 'bar' + '\t';
                const mail = 'foo.bar@gmail.com' + '\t';
                const username = 'foo-bar' + '\t';
                const confirmation = 'foo-bar';
                const password = confirmation + '\t';
        
                const vals = firstName + lastName + mail + username + password + confirmation;

                await parentalNameE.sendKeys(vals);

                const parentalButtonE = await page.getParentalButtonE();
                parentalButtonE.click();

                const parentalSuccessE = await page.getParentalSuccessE();
                const res = await parentalSuccessE.getText();

                expect(res).to.include('Success!');
            });
        });
    } catch (ex) {
        Log.console(new Error(ex.message));
    } finally {

    }
})();