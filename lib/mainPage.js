//All methods for the main page.

let Page = require('./basePage');
const locator = require('../utils/locator');
const fakeData = require('../utils/fakeData');

//grab the IDs from the ID file.
const ActivityXPath = locator.mainPageActivityXPath;
const SubmitDataXPath = locator.mainPageSubmitDataXPath;
const ParentalSignupXPath = locator.mainPageParentalSignupXPath;
const LogoutXPath = locator.mainPageLogoutXPath;
const SubmitDateXPath = locator.mainPageSubmitDateXPath;
const SubmitDurationXPath = locator.mainPageSubmitDurationXPath;
const SubmitButtonXPath = locator.mainPageSubmitButtonXPath;
const SubmitTitleXPath = locator.mainPageSubmitTitleXPath;
const SignupTitleXPath = locator.mainPageSignupTitleXPath;
const HomePageAboutXPath = locator.homePageAbout;
const ResultsPageTItleXPath = locator.resultsPageTitle;
const ParentalNameXPath = locator.mainPageParentalNameXPath;
const ParentalButtonXPath = locator.mainPageParentalButtonXPath;
const ParentalSuccessXPath = locator.mainPageParentalSuccessXPath;

//announce elements
let activityE, submitE, signupE, logoutE, submitDateE, submitDurationE, submitButtonE, submitTitleE, signupTitleE, homePageAboutE,
 ResultsPageTItleE, parentalNameE, parentalButtonE, parentalSuccessE;

Page.prototype.getActivityE = async function () {
    activityE = await this.findByXPath(ActivityXPath);
    return activityE;
}

Page.prototype.getSubmitE = async function () {
    submitE = await this.findByXPath(SubmitDataXPath);
    return submitE;
}

Page.prototype.getSignupE = async function () {
    signupE = await this.findByXPath(ParentalSignupXPath);
    return signupE;
}

Page.prototype.getLogoutE = async function () {
    logoutE = await this.findByXPath(LogoutXPath);
    return logoutE;
}

Page.prototype.getSubmitDateE = async function () {
    submitDateE = await this.findByXPath(SubmitDateXPath);
    return submitDateE;
}

Page.prototype.getSubmitDurationE = async function () {
    submitDurationE = await this.findByXPath(SubmitDurationXPath);
    return submitDurationE;
}

Page.prototype.getSubmitButtonE = async function () {
    submitButtonE = await this.findByXPath(SubmitButtonXPath);
    return submitButtonE;
}

Page.prototype.getSubmitTitleE = async function () {
    submitTitleE = await this.findByXPath(SubmitTitleXPath);
    return submitTitleE;
}

Page.prototype.getSignupTitleE = async function () {
    signupTitleE = await this.findByXPath(SignupTitleXPath);
    return signupTitleE;
}

Page.prototype.getHomePageAboutE = async function () {
    homePageAboutE = await this.findByXPath(HomePageAboutXPath);
    return homePageAboutE;
}

Page.prototype.getResultsPageTitleE = async function () {
    resultsPageTitleE = await this.findByXPath(ResultsPageTItleXPath);
    return resultsPageTitleE;
}

Page.prototype.getParentalNameE = async function () {
    parentalNameE = await this.findByXPath(ParentalNameXPath);
    return parentalNameE;
}

Page.prototype.getParentalButtonE = async function () {
    parentalButtonE = await this.findByXPath(ParentalButtonXPath);
    return parentalButtonE;
}

Page.prototype.getParentalSuccessE = async function () {
    parentalSuccessE = await this.findByXPath(ParentalSuccessXPath);
    return parentalSuccessE;
}

module.exports = Page;
