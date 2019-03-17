const {Builder, By, until} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');
let o = new chrome.Options();
o.addArguments('disable-infobars');
o.setUserPreferences({ credential_enable_service: false });

var Page = function() {
    this.driver = new Builder()
    .setChromeOptions(o)
    .forBrowser('chrome')
    .build();

    this.visit = async function(theUrl) {
        return await this.driver.get(theUrl);
    };

    this.quit = async function() {
        return await this.driver.quit();
    };

    //wait and find a specific element by ID.
    this.findById = async function(id) {
        await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for an element');
        return await this.driver.findElement(By.id(id));
    };

    this.findByName = async function(name) {
        await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for an element');
        return await this.driver.findElement(By.name(name));
    };

    this.findByXPath = async function(xPath) {
        await this.driver.wait(until.elementLocated(By.xpath(xPath)), 15000, 'Looking for an element');
        return await this.driver.findElement(By.xpath(xPath));
    };

    // fill the input web elements
    this.write = async function(el, txt) {
        return await el.sendKeys(txt);
    };

    this.submit = async function(el) {
        return await el.submit();
    }

};

module.exports = Page;