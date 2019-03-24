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
const SubmitSuccessfulXPath = locator.mainPageSubmitSuccessfulXPath;
const SubmitUnsuccessfulTimeXPath = locator.mainPageSubmitUnsuccessfulTimeXPath;
const SubmitUnsuccessfulPressureXPath = locator.mainPageSubmitUnsuccessfulPressureXPath;
const SubmitAveragePressureXPath = locator.mainPageSubmitAveragePressureXPath;
const SubmitAverageExhalationXPath = locator.mainPageSubmitAverageExhalationXPath;
const SubmitSuccessfulCoughsXPath = locator.mainPageSubmitSuccessfulCoughsXPath;
const SubmitButtonXPath = locator.mainPageSubmitButtonXPath;
const SubmitTitleXPath = locator.mainPageSubmitTitleXPath;
const SignupTitleXPath = locator.mainPageSignupTitleXPath;
const HomePageAboutXPath = locator.homePageAbout;
const ResultsPageTItleXPath = locator.resultsPageTitle;

//announce elements
let activityE, submitE, signupE, logoutE, submitDateE, submitDurationE, submitSuccessfulE, submitUnsuccessfulTimeE, submitUnsuccessfulPressureE,
submitAveragePressureE, submitAverageExhalationE, submitSuccessfulCoughsE, submitButtonE, submitTitleE, signupTitleE, homePageAboutE, ResultsPageTItleE;

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

Page.prototype.getsubmitDateE = async function () {
    submitDateE = await this.findByXPath(SubmitDateXPath);
    return submitDateE;
}

Page.prototype.getSubmitDurationE = async function () {
    submitDurationE = await this.findByXPath(SubmitDurationXPath);
    return submitDurationE;
}

Page.prototype.getSubmitSuccessfulE = async function () {
    submitSuccessfulE = await this.findByXPath(SubmitSuccessfulXPath);
    return submitSuccessfulE;
}

Page.prototype.getSubmitUnsuccessfulTimeE = async function () {
    submitUnsuccessfulTimeE = await this.findByXPath(SubmitUnsuccessfulTimeXPath);
    return submitUnsuccessfulTimeE;
}

Page.prototype.getSubmitUnsuccessfulPressureE = async function () {
    submitUnsuccessfulPressureE = await this.findByXPath(SubmitUnsuccessfulPressureXPath);
    return submitUnsuccessfulPressureE;
}

Page.prototype.getSubmitAveragePressureE = async function () {
    submitAveragePressureE = await this.findByXPath(SubmitAveragePressureXPath);
    return submitAveragePressureE;
}

Page.prototype.getSubmitAverageExhalationE = async function () {
    submitAverageExhalationE = await this.findByXPath(SubmitAverageExhalationXPath);
    return submitAverageExhalationE;
}

Page.prototype.getSubmitSuccessfulCoughsE = async function () {
    submitSuccessfulCoughsE = await this.findByXPath(SubmitSuccessfulCoughsXPath);
    return submitSuccessfulCoughsE;
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

module.exports = Page;
