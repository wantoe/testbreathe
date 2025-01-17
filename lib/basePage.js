const {Builder, By, until} = require('selenium-webdriver');
const locator = require('../utils/locator');

const chrome = require('selenium-webdriver/chrome');
let o = new chrome.Options();
o.addArguments('disable-infobars');
o.setUserPreferences({ credential_enable_service: false });
var Page = function() {
    this.driver = new Builder()
    .setChromeOptions(o)
    .forBrowser('chrome')
    .build();

    this.currentUrl = async function () {
        return await this.driver.getCurrentUrl();
    }

    this.visitDefault = async function() {
        return await this.driver.get(locator.local);
    }

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

    this.findByLinkText = async function(linkText) {
        await this.driver.wait(until.elementLocated(By.partialLinkText(linkText)), 15000, 'Looking for link text');
        return await this.driver.findElement(By.partialLinkText(linkText));
    }

    // fill the input web elements
    this.write = async function(el, txt) {
        return await el.sendKeys(txt);
    };

    this.submit = async function(el) {
        return await el.submit();
    };

    this.waitUntilDisplayed = async function(el) {
        return await this.driver.isElementPresent(el);
    };

    this.waitUntilLoaded = async function(url) {
        return await this.driver.wait(until.urlContains(url));
    }

    //find elements within elements
    this.findElementsbyTagName = async function(tagName) {
        return await this.driver.findElements(By.tagName(tagName));
    }

    //login functionality for beforeEach
    this.login = async function(username, password) {
        const usernameE = await this.getUsernameE();
        const passwordE = await this.getPasswordE();

        this.waitUntilDisplayed(usernameE);
        this.waitUntilDisplayed(passwordE);

        await usernameE.sendKeys(username);
        await passwordE.sendKeys(password);
        usernameE.submit();
    }
	
	this.generateAutomatedAdmin() = async function() {
		const out = new adminFormData();
		
		out.firstname = "Foo" + Math.floor(Math.random() * 100);
		out.lastname = "Bar" + Math.floor(Math.random() * 100);
		out.email = "FooBar" + Math.floor(Math.random() * 100) + "@foobar.com";
		out.username = "AutomatedTest" + Math.floor(Math.random() * 100);
		out.password = 'AutomatedTest1';
		
		return out;
	};
};

adminFormData = {
	firstname,
	lastname,
	email,
	username,
	password
}

module.exports = Page;