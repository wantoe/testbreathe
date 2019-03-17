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

//locate elements
Page.prototype.findElements = async function() {
    usernameE = await this.findById(usernameId);
    passwordE = await this.findById(passwordId);
    loginE = await this.findByName(loginId);
    //accountE = await this.findByXPath(accountXPath);
    //clinicianE = await this.findByXPath(clinicianXPath);
};

Page.prototype.enterUsername = async function() {
    const result = await this.driver.wait(async function () {
        await this.write(usernameE, fakeData.user);

        const username = await usernameE.getText();

    return {
        writtenUsername: username
        } 
    }, 5000);
    

    return result;
}

Page.prototype.enterPassword = async function() {
    await this.findElements();

    const result = await this.driver.wait(async function () {
        await this.write(passwordE, fakeData.userPassword);

        const password = await passwordE.getText();
    
    return {
        writtenPassword: password
        }
    }, 5000);

    return result;
}

Page.prototype.clickLogin = async function() {
    await this.findElements();
    await loginE.click();

   //resultStat = await this.findByXPath(resultsPageTitleXPath);

    return await this.driver.wait(async function () {
        return await resultStat.getText();
    });
}

module.exports = Page;