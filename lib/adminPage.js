let Page = require('./basePage');
const locator = require('../utils/locator');
const fakeData = require('../utils/fakeData');

const DashboardTitleXPath = locator.adminPageTitleXPath;
const MenuDashboardXPath = locator.adminPageDashboardXPath;
const MenuSignupXPath = locator.adminPageSignupXPath;
const MenuLogoutXPath = locator.adminPageLogoutXPath;
const ClinicianTableXPath = locator.adminPageClinicianTableXPath;
const CreateAccountsButtonXPath = locator.adminPageCreateAccountsXPath;
const DeleteAccountsButtonXPath = locator.adminPageDeleteAccountsXPath;
const UserTableXPath = locator.adminPageDeleteAccountsXPath;
const ViewAccountXPath = locator.adminPageViewAccountXPath;
const SignupTitleXPath = locator.adminPageSignupTitleXPath;
const FirstNameXPath = locator.adminPageFirstNameXPath;
const LastNameXPath = locator.adminPageLastNameXPath;
const EmailXPath = locator.adminPageEmailXPath;
const UsernameXPath = locator.adminPageUsernameXPath;
const PasswordXPath = locator.adminPagePasswordXPath;
const RepeatPasswordXPath = locator.adminPageRepeatPassXPath;
const SubmitButtonXPath = locator.adminPageSubmitXPath;

let DashboardTitleE, MenuDashboardE, MenuSignupE, MenuLogoutE, ClinicianTableE, CreateAccountsButtonE, DeleteAccountsButtonE,
UserTableE, ViewAccountE, SignupTItleE, FirstNameE, LastNameE, EmailE, UsernameE, PasswordE, RepeatPasswordE, SubmitButtonE;

Page.prototype.getSubmitButtonE = async function() {
    SubmitButtonE = await this.findByXPath(SubmitButtonXPath);
    return SubmitButtonE;
}

Page.prototype.getRepeatPasswordE = async function() {
    RepeatPasswordE = await this.findByXPath(RepeatPasswordXPath);
    return RepeatPasswordE;
}

Page.prototype.getPasswordE = async function() {
    PasswordE = await this.findByXPath(PasswordXPath);
    return PasswordE;
}

Page.prototype.getUsernameE = async function() {
    UsernameE = await this.findByXPath(UsernameXPath);
    return UsernameE;
}

Page.prototype.getEmailE = async function() {
    EmailE = await this.findByXPath(EmailXPath);
    return EmailE;
}

Page.prototype.getLastNameE = async function() {
    LastNameE = await this.findByXPath(LastNameXPath);
    return LastNameE;
}

Page.prototype.getFirstNameE = async function() {
    FirstNameE = await this.findByXPath(FirstNameXPath);
    return FirstNameE;
}

Page.prototype.getSignupTitleE = async function () {
    SignupTItleE = await this.findByXPath(SignupTitleXPath);
    return SignupTItleE;
}

Page.prototype.getViewAccountE = async function () {
    ViewAccountE = await this.findByXPath(ViewAccountXPath);
    return ViewAccountE;
}

Page.prototype.getUserTableE = async function() {
    UserTableE = await this.findByXPath(UserTableXPath);
    return UserTableE;
}

Page.prototype.getDeleteAccountsButtonE = async function() {
    DeleteAccountsButtonE = await this.findByXPath(DeleteAccountsButtonXPath);
    return DeleteAccountsButtonE;
}

Page.prototype.getCreateAccountsButtonE = async function() {
    CreateAccountsButtonE = await this.findByXPath(CreateAccountsButtonXPath);
    return CreateAccountsButtonE;
}

Page.prototype.getClinicianTableE = async function () {
    ClinicianTableE = await this.findByXPath(ClinicianTableXPath);
    return ClinicianTableE;
}

Page.prototype.getMenuLogoutE = async function () {
    MenuLogoutE = await this.findByXPath(MenuLogoutXPath);
    return MenuLogoutE;
}

Page.prototype.getMenuSignupE = async function () {
    MenuSignupE = await this.findByXPath(MenuSignupXPath);
    return MenuSignupE;
}

Page.prototype.getMenuDashboardE = async function () {
    MenuDashboardE = await this.findByXPath(MenuDashboardXPath);
    return MenuDashboardE;
}

Page.prototype.getAdminPageTitleE = async function() {
    DashboardTitleE = await this.findByXPath(DashboardTitleXPath);
    return DashboardTitleE;
}

module.exports = Page;