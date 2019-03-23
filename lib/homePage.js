//All methods for the home page.

let Page = require('./basePage');
const locator = require('../utils/locator');
const fakeData = require('../utils/fakeData');

//grab IDs from the ID file.
const usernameId = locator.homePageUsernameID;
const passwordId = locator.homePagePasswordID;
const loginId = locator.homePageButtonName;
const accountXPath = locator.homePageAccountXPath;
const clinicianLinkText = locator.homePageClinicianLinkText;
const aboutXPath = locator.homePageAbout;
const resultsPageTitleXPath = locator.resultsPageTitle;
const homePageAboutInfoXPath = locator.homePageAboutInfoXPath;
const invalidCredentialsXPath = locator.invalidCredentials;
const invalidUsernamePasswordXPath = locator.wrongUsernamePassword;

//announce elements
let usernameE, passwordE, loginE, accountE, clinicianE, aboutE;

Page.prototype.getUsernameE = async function() {
    usernameE = await this.findById(usernameId);
    return usernameE;
}

Page.prototype.getPasswordE = async function() {
    passwordE = await this.findById(passwordId);
    return passwordE;
}

Page.prototype.getResultsPageTitleE = async function() {
    resultsPageTitleE = await this.findByXPath(resultsPageTitleXPath);
    return resultsPageTitleE;
}

Page.prototype.getInvalidCredentialsE = async function () {
    invalidCredentialsE = await this.findByXPath(invalidCredentialsXPath);
    return invalidCredentialsE;
}

Page.prototype.getInvalidUsernamePasswordE = async function () {
    InvalidUsernamePasswordE = await this.findByXPath(invalidUsernamePasswordXPath);
    return InvalidUsernamePasswordE;
}

Page.prototype.getHomePageAboutInfoE = async function () {
    homePageAboutInfoE = await this.findByXPath(homePageAboutInfoXPath);
    return homePageAboutInfoE;

}

Page.prototype.clickNewAccount = async function() {
    accountE = await this.findByXPath(accountXPath);
    await accountE.click();

    return;
}

Page.prototype.clickClinicianForm = async function() {
    clinicianE = await this.findByLinkText(clinicianLinkText);
    await clinicianE.click();

    return;
}

Page.prototype.clickAbout = async function() {
    aboutE = await this.findByXPath(aboutXPath);
    await aboutE.click();

    return;
}

module.exports = Page;