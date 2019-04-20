//HTML element locators
module.exports = {
    local: 'localhost:8080',
    live: 'https:breathehero.com',

    homePageUsernameID: 'loginusername',
    homePagePasswordID: 'loginpassword',
    homePageButtonName: 'login',
    homePageAccountXPath: '//*[@id="messages"]/a',
    homePageClinicianLinkText: 'Clinicians sign up here',
    homePageAbout: '/html/body/div[2]/h3/strong',
    resultsPageTitle: '//*[@id="title"]',
    invalidCredentials: '/html/body/div[1]/div/div[2]/h3',
    wrongUsernamePassword: '/html/body/div[1]/div/div[2]/h3',
    homePageAboutInfoXPath: '//*[@id="About Information"]',

    mainPageActivityXPath: '//*[@id="menu"]/li[2]/a',
    mainPageSubmitDataXPath: '//*[@id="menu"]/li[3]/a',
    mainPageParentalSignupXPath: '//*[@id="menu"]/li[4]/a',
    mainPageLogoutXPath: '//*[@id="menu"]/li[5]/a',
    mainPageGraphXPath: '//*[@id="myChart"]',
    mainPageSubmitDateXPath: '//*[@id="input-name"]',
    mainPageSubmitDurationXPath: '//*[@id="input-email"]',
    mainPageSubmitButtonXPath: '/html/body/div/div/div[2]/div[2]/div/form/div/button',
    mainPageSubmitTitleXPath: '/html/body/div/div/div[2]/div[1]/h1',
    mainPageSignupTitleXPath: '/html/body/div/div/div[2]/h1',
    mainPageParentalNameXPath: '/html/body/div/div/div[2]/div/div/form/div/div[1]/div[1]/input',
    mainPageParentalButtonXPath: '/html/body/div/div/div[2]/div/div/form/div/button',
    mainPageParentalSuccessXPath: '/html/body/div/div/div[2]/div[2]/h3',

    clinicianPageTableXPath: '/html/body/div[1]/div/div[2]/div[1]',
    clinicianPageModalHeaderXPath: '//*[@id="title"]',

    adminPageTitleXPath: '/html/body/div/div/div[2]/h1'
}