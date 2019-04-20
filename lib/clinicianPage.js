let Page = require('./basePage');
const locator = require('../utils/locator');
const fakeData = require('../utils/fakeData');

//grab the IDs needed from the locator
const clinicianTableXPath = locator.clinicianPageTableXPath;
const clinicianModalHeaderXPath = locator.clinicianPageModalHeaderXPath;

let clinicianTableE, clinicianModalHeaderE;

Page.prototype.getClinicianTableE = async function() {
    clinicianTableE =  await this.findByXPath(clinicianTableXPath);
    return clinicianTableE;
};

Page.prototype.getClinicianModalHeaderE = async function() {
    clinicianModalHeaderE = await this.findByXPath(clinicianModalHeaderXPath);
    return clinicianModalHeaderE;
};