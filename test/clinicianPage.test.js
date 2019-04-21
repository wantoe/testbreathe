const { describe, it, after, before } = require('mocha');
const Page = require('../lib/clinicianPage');
const fakeData = require('../utils/fakeData');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function testMenu() {
    try {
        describe('Testing the menu', async function() {
            this.timeout(50000);
            let driver, page;

            beforeEach(async function () {
                page = new Page();
                driver = page.driver;

                await page.visitDefault();
                await page.login(fakeClinician.username, fakeClinician.password);
            });

            afterEach(async function () {
                await page.quit();
            });

            it('Clicking on patient registration transitions to the form', async function () {
                let registrationE, regHeaderE;
                registrationE = await page.getRegistrationE();
                registrationE.click();

                regHeaderE = await page.getFormHeaderE();
                const result = await regHeaderE.getText();

                expect(result).to.include('Patient Registration Form');
            });

            it('Clicking on dashboard transitions to dashboard', async function () {
                let registrationE, dashboardE, tableE;
                registrationE = await page.getRegistrationE();
                registrationE.click();

                dashboardE = await page.getDashboardE();
                dashboardE.click();

                tableE = await page.getClinicianTableE();

                //if it doesn't timeout on waiting to find the table element, it's in the right page.
                expect(true);
            });

            it('Clicking logout logs you out', async function () {
                let logoutE;
                logoutE = await page.getLogoutE();
                logoutE.click();

                const result = await page.currentUrl();
                expect(result).to.equal('https://breathehero.com');
            });
        });
    } catch (ex){
        console.log(new Error(ex));
    } finally {

    }
})();

(async function testTable() {
    try {
        describe('Testing the clinician table', async function() {
            this.timeout(50000);
            let driver, page;
            
            beforeEach(async function () {
                page = new Page();
                driver = page.driver;

                await page.visitDefault();
                await page.login(fakeClinician.username, fakeClinician.password);
            });

            afterEach(async function () {
                await page.quit();
            });

            it('Clicking on the entry in the table', async function() {
                const clinicianTableE = page.getClinicianTableE();

                let vals = await page.findElementsbyTagName('tr');
                
                //find ID no. 155 (testing account ID) and click on it.
                for(i = 0; i < vals.length; i++) {
                    row = vals[i];

                    if(row[0] == 155) {
                        row.click();

                        const modalHeaderE = await page.getClinicianModalHeaderE();
                        const result = await modalHeaderE.getText();

                        expect(result).to.include("Data for tester1");
                    }
                }
            });
        })
    } catch(ex) {
        console.log(new Error(ex));
    } finally {

    }
})();

(async function testPresription() {
    try {
        describe('Testing the popup window', async function() {
            this.timeout(50000);
            let driver, page;
           
            beforeEach(async function() {
                page = new Page();
                driver = page.driver;

                await page.visitDefault();
                await page.login(fakeClinician.username, fakeClinician.password);
            });

            afterEach(async function() {
                await page.quit();
            });

            it('clicking prescriptions transitions to prescriptions', async function () {
                
            });
        });
    } catch(ex) {
        console.log(new Error(ex));
    } finally {

    }
})();

(async function testGameSettings() {
    try {

    } catch(ex) {
        console.log(new Error(ex));
    } finally {

    }
})();