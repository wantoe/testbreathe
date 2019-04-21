let Page = require('./basePage');
const locator = require('../utils/locator');
const fakeData = require('../utils/fakeData');

const adminPageTitlePath = locator.adminPageTitleXPath;

let adminPageTitleE;

Page.prototype.getAdminPageTitleE = async function() {
    adminPageTitleE = await this.findByXPath(adminPageTitlePath);
    return adminPageTitleE;
}

module.exports = Page;