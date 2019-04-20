const { describe, it, after, before } = require('mocha');
const Page = require('../lib/homePage');
const fakeData = require('../utils/fakeData');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function testMenu() {
    try {

    } catch {

    } finally {

    }
});

(async function testTable() {
    try {
        describe('Testing the clinician table', async function() {
            this.timeout(50000);
            let driver, page;
            
            beforeEach(async function () {
                page = new Page();
                driver = page.driver;

                await page.visit(page.url);
            });

            afterEach(async function () {
                await page.quit();
            });

            it('Clicking on the entry in the table', async function() {
                const clinicianTableE = page.getClinicianTableE();

                let vals = await page.findElementsbyTagName(clinicianTableE, 'tr');
                
                //find ID no. 155 (testing account ID) and click on it.
                for(i = 0; i < vals.length; i++) {
                    row = vals[i];

                    if(await page.findElementsbyTagName(row, 'td')[0] == 155) {
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
});

(async function testPresription() {
    try {

    } catch(ex) {
        console.log(new Error(ex));
    } finally {

    }
});

(async function testGameSettings() {
    try {

    } catch(ex) {
        console.log(new Error(ex));
    } finally {

    }
});