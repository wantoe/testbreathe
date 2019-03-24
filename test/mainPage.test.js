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
                const submitSuccessfulE = await page.getSubmitSuccessfulE();
                const submitUnsuccessfulTimeE = await page.getSubmitUnsuccessfulTimeE();
                const submitUnsuccessfulPressureE = await page.getSubmitUnsuccessfulPressureE();
                const submitAveragePressureE = await page.getSubmitAveragePressureE();
                const submitAverageExhalationE = await page.getSubmitAverageExhalationE();
                const submitSuccessfulCoughsE = await page.getSubmitSuccessfulCoughsE();
                const submitButtonE = await page.getSubmitButtonE();

                //submit the data.
                var datetime = require('node-datetime');
                var dt = datetime.now();
                var formatted = dt.format('d/m/Y H:M:S');
                
                await submitDateE.sendKeys(formatted);
                await submitDurationE.sendKeys(10);
                await submitSuccessfulE.sendKeys(3);
                await submitUnsuccessfulTimeE.sendKeys(8);
                await submitUnsuccessfulPressureE.sendKeys(2);
                await submitAveragePressureE.sendKeys(4);
                await submitAverageExhalationE.sendKeys(5);
                await submitSuccessfulCoughsE.sendKeys(2);
                
                submitButtonE.click();

                expect(true);

                //TODO: automate verification. Currently, just check that there is a new value equal to the current date through postman.
            });
        });
    } catch (ex) {
        log.console(new Error(ex.message));
    } finally {

    }
})();