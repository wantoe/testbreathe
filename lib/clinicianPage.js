let Page = require('./basePage');
const locator = require('../utils/locator');
const fakeData = require('../utils/fakeData');

//grab the IDs needed from the locator
const TableXPath = locator.clinicianPageTableXPath;
const ModalHeaderXPath = locator.clinicianPageModalHeaderXPath;
const DashboardXPath = locator.clinicianPageDashboardXPath;
const RegistrationXPath = locator.clinicianPagePatientRegistrationXPath;
const LogoutXPath = locator.clinicianPageLogoutXPath;
const FormHeaderXPath = locator.clinicianPageRegistrationHeaderXPath;
const ModalPrescriptionsXPath = locator.clinicianPageModalPrescriptionsXPath;
const ModalGameSettingsXPath = locator.clinicianPageModalGameSettingsXPath;
const ModalUserDataXPath = locator.clinicianPageModalUserDataXPath;
const PrescriptionsTimeXPath = locator.clinicianPagePrescriptionsTimeXPath;
const PrescriptionsPressureXPath = locator.clinicianPagePrescriptionsPressureXPath;
const PrescriptionsSubmitXPath = locator.clinicianPagePrescriptionsSubmitXPath;
const PrescriptionsCancelXPath = locator.clinicianPagePrescriptionsCancelXPath;
const GameSettingsButtonXPath = locator.clinicianPageGameSettingsButtonXPath;
const GameSettingsStatusXPath = locator.clincianPageGameSettingsStatusXPath;

let TableE, ModalHeaderE, DashboardE, RegistrationE, LogoutE, FormHeaderE, ModalPrescriptionsE, ModalGameSettingsE,
ModalUserDataE, PrescriptionsTimeE, PrescriptionsPressureE, PrescriptionsSubmitE, PrescriptionsCancelE,
GameSettingsButtonE, GameSettingsStatusE;

Page.prototype.getClinicianTableE = async function () {
    TableE =  await this.findByXPath(TableXPath);
    return TableE;
}

Page.prototype.getClinicianModalHeaderE = async function() {
    ModalHeaderE = await this.findByXPath(ModalHeaderXPath);
    return ModalHeaderE;
}

Page.prototype.getDashboardE = async function() {
    DashboardE = await this.findByXPath(DashboardXPath);
    return DashboardE;
}

Page.prototype.getRegistrationE = async function() {
    RegistrationE = await this.findByXPath(RegistrationXPath);
    return RegistrationE;
}

Page.prototype.getLogoutE = async function() {
    LogoutE = await this.findByXPath(LogoutXPath);
    return LogoutE;
}

Page.prototype.getFormHeaderE = async function() {
    FormHeaderE = await this.findByXPath(FormHeaderXPath);
    return FormHeaderE;
}

Page.prototype.getModalPrescriptionsE = async function() {
    ModalPrescriptionsE = await this.findByXPath(ModalPrescriptionsXPath);
    return ModalPrescriptionsE;
}

Page.prototype.getModalGameSettingsE = async function() {
    ModalGameSettingsE = await this.findByXPath(ModalGameSettingsXPath);
    return ModalGameSettingsE;
}

Page.prototype.getModalUserDataE = async function() {
    ModalUserDataE = await this.findByXPath(ModalUserDataXPath);
    return ModalUserDataE;
}

Page.prototype.getPrescriptionsTimeE = async function() {
    PrescriptionsTimeE = await this.findByXPath(PrescriptionsTimeXPath);
    return PrescriptionsTimeE;
}

Page.prototype.getPrescriptionsPressureE = async function() {
    PrescriptionsPressureE = await this.findByXPath(PrescriptionsPressureXPath);
    return PrescriptionsPressureE;
}

Page.prototype.getPresciptionsSubmitE = async function() {
    PrescriptionsSubmitE = await this.findByXPath(PrescriptionsSubmitXPath);
    return PrescriptionsSubmitE;
}

Page.prototype.getPrescriptionsCancelE = async function() {
    PrescriptionsCancelE = await this.findByXPath(PrescriptionsCancelXPath);
    return PrescriptionsCancelE;
}

Page.prototype.getGameSettingsButtonE = async function() {
    GameSettingsButtonE = await this.findByXPath(GameSettingsButtonXPath);
    return GameSettingsButtonE;
}

Page.prototype.getGameSettingsStatusE = async function() {
    GameSettingsStatusE = await this.findByXPath(GameSettingsStatusXPath);
    return GameSettingsStatusE;
}

module.exports = Page;