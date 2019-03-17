//All methods for the home page.

let Page = require('./basePage');
const locator = require('../utils/locator');
const fakeData = require('../utils/fakeData');

//grab IDs from the ID file.
const usernameId = locator.homePageUsernameID;
const passwordId = locator.homePagePasswordID;
const loginId = locator.homePageButtonName;
const accountXPath = locator.homePageAccountXPath;
const clinicianXPath = locator.homePageClinicianXPath;
const aboutXPath = locator.homePageAbout;
const resultsPageTitleXPath = locator.resultsPageTitle;

//announce elements
let usernameE, passwordE, loginE, accountE, clinicianE, aboutE;

Page.prototype.enterUsername = async function() {
    usernameE = await this.findById(usernameId);
    await this.sendKeys(fakeData.user);
}

Page.prototype.enterPassword = async function() {
    passwordE = await this.findById(passwordId);
    await this.sendKeys(fakeData.userPassword);
}

Page.prototype.clickLogin = async function() {
    await this.enterUsername;
    await this.enterPassword;
    this.submit();

    resultStat = await this.findByXPath(resultsPageTitleXPath);

    return await resultStat.getText();

    return;
}

module.exports = Page;