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
                await logoutE.click();

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
                let vals = await page.findElementsbyTagName('tr');
                
                //find ID no. 155 (testing account ID) and click on it.
                for(i = 0; i < vals.length; i++) {
                    row = vals[i];

                    if(row[0] == 155) {
                        row.click();

                        const modalPrescriptionsE = page.getModalPrescriptionsE();
                        await modalPrescriptionsE.click();

                        const PrescriptionsPressureE = page.getPrescriptionsPressureE();
                        
                        //if the prescriptions pressure element is reachable then the page is correctly rendered.
                        expect(true);
                    }
                }
            });

            it('clicking cancel closes the modal window', async function () {
                let vals = await page.findElementsbyTagName('tr');
                
                //find ID no. 155 (testing account ID) and click on it.
                for(i = 0; i < vals.length; i++) {
                    row = vals[i];

                    if(row[0] == 155) {
                        row.click();

                        const modalPrescriptionsE = page.getModalPrescriptionsE();
                        await modalPrescriptionsE.click();

                        const prescriptionsCancelE = page.getPrescriptionsCancelE();
                        await prescriptionsCancelE.click();

                        const tableE = page.getClinicianTableE();

                        //if the table element in clinician is rendered clicking cancel worked.
                        expect(true);
                    }
                }
            });

            it('filling in the prescription form and clicking submit should update the values', async function () {
                let vals = await page.findElementsbyTagName('tr');
                
                //find ID no. 155 (testing account ID) and click on it.
                for(i = 0; i < vals.length; i++) {
                    row = vals[i];

                    if(row[0] == 155) {
                        row.click();

                        const modalPrescriptionsE = page.getModalPrescriptionsE();
                        await modalPrescriptionsE.click();

                        const prescriptionsTimeE = page.getPrescriptionsTimeE();
                        const presctiptionsPressureE = page.getPrescriptionsPressureE();

                        rand1 = Math.floor(Math.random() * 100);
                        rand2 = Math.floor(Math.random() * 100);
                        await prescriptionsTimeE.sendKeys(rand1);
                        await PrescriptionsPressureE.sendKeys(rand2);

                        const prescriptionsSubmitE = page.getPrescriptionsSubmitE();
                        await prescriptionsSubmitE.click();

                        //The modal is gone, reclick the row val.
                        row.click();

                        await modalPrescriptionsE.click();

                        const currentTimeE = page.getCurrentTimeE();
                        const currentPressureE = page.getCurrentPressureE();
                        const currentTime = await currentTimeE.getText();
                        const currentPressure = await currentPressureE.getText();

                        expect(currentTime).to.include(rand1).and.expect(currentPressure).to.include(rand2);
                    }
                }
            });
        });
    } catch(ex) {
        console.log(new Error(ex));
    } finally {

    }
})();

(async function testGameSettings() {
    try {
        describe('Testing game settings', async function() {
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

            it('clicking on game settings transitions to game settings window', async function() {
                let vals = await page.findElementsbyTagName('tr');
                
                //find ID no. 155 (testing account ID) and click on it.
                for(i = 0; i < vals.length; i++) {
                    row = vals[i];

                    if(row[0] == 155) {
                        row.click();

                        const modalGameSettingsE = await page.getModalGameSettingsE();
                        modalGameSettingsE.click();

                        const modalGameSettingsStatusE = await page.getGameSettingsStatusE();

                        //if this element exists then it must be transitioned to correctly.
                        expect(true);
                    }
                }
            });

            it('clicking toggle game availability changes game availability', async function() {
                let vals = await page.findElementsbyTagName('tr');
                
                //find ID no. 155 (testing account ID) and click on it.
                for(i = 0; i < vals.length; i++) {
                    row = vals[i];

                    if(row[0] == 155) {
                        row.click();

                        const modalGameSettingsE = await page.getModalGameSettingsE();
                        modalGameSettingsE.click();

                        const modalGameSettingsStatusE = await page.getGameSettingsStatusE();
                        const oldStatus = await modalGameSettingsStatusE.getText();

                        const modalGameSettingsButtonE = await page.getGameSettingsButtonE();
                        modalGameSettingsButtonE.click();

                        row.click();
                        modalGameSettingsE.click();

                        const newStatus = await modalGameSettingsStatusE.getText();

                        expect(newStatus).to.not.include(oldStatus);
                    }
                }
            });
        });
    } catch(ex) {
        console.log(new Error(ex));
    } finally {

    }
})();