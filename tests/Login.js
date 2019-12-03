 var webdriver = require('selenium-webdriver'),
    By =  webdriver.By,
    until = webdriver.until;
    require('chromedriver'),
    chai = require('chai'),
    expect = chai.expect,
    assert = chai.assert;
    LoginData = require('../testdata/LoginData.json');

    describe('Validate Login Functionality: ', function(){
        this.timeout(50000);

        beforeEach('Browser initializaton', async function(){
            driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
            driver.manage().window().maximize();
            await driver.get("https://commerceos.staging.devpayever.com/entry/login");
        });

        LoginData.forEach(function(data, username, password){

        //Test Login Page
            it('Login with: '+data.username+"/"+data.password,  async function(){
                await driver.wait(until.elementLocated(By.xpath("//img[@class='logo-header']")), 10000);
                await driver.findElement(By.xpath("//input[@placeholder='Username']"))
                .sendKeys(data.username);
                await driver.findElement(By.xpath("//input[@placeholder='Password']"))
                .sendKeys(data.password);
                await driver.findElement(By.xpath("//button[@type='submit']"))
                .click();
                await driver.wait(until.elementLocated(By.xpath("//span[@class='business-title menu-item-white']")), 80000);
            
         //Click on Apps option and click on Shop button
                await driver.findElement(By.xpath("//button[2]/span/span[@class='mat-toolbar-link-text ng-star-inserted']"))
                .click();
                await driver.wait(until.elementLocated(By.xpath("//div[@class='apps-box-wrapper']")), 50000);
                await driver.findElement(By.xpath("//mat-card[@class='app-card mat-card']/div[1]/business-applications/div[7]"))
                .click();
                await driver.wait(until.elementLocated(By.xpath("//span[@class='business-title menu-item-white']")), 90000);

        //Click on Themes option and Add New Theme
                await driver.findElement(By.xpath("//div[contains(@class,'mat-toolbar-area')]/button[3]"))
                .click();
                
                await driver.wait(until.elementLocated(By.xpath("//mat-card-content[@data-pe-themes='add']")), 90000);
                await driver.findElement(By.xpath("//mat-card-content[@data-pe-themes='add']"))
                .click();
                await driver.wait(until.elementLocated(By.xpath("//pe-builder-navbar-top-button[@bottomlabel='Product']/button/span")), 90000);
        //ShadowRoot
                async function findShadowDomElement(shadowDomElement) {
                  let shadowRoot;
                  let element;
                  await (shadowRoot = getExtShadowRoot());
                  await shadowRoot.then(async (result) => {
                    result.findElement(By.css("//span[contains(text(),' tablet-body area ')]"))
                    .click();

                await driver.findElement(By.xpath("//pe-builder-navbar-top-button[@bottomlabel='Text']/button/span"))
                .click();

                result.findElement(By.css("div > pe-editor-element-anchors > svg"))
                .sendKeys("Test is Completed"); 

                await driver.findElement(By.xpath("//mat-toolbar[contains(@class,'mat-toolbar-app')]/div[3]/button/span"))
                .click();

                await driver.wait(until.elementLocated(By.xpath("//button[2]/span/span[@class='mat-toolbar-link-text ng-star-inserted']")), 90000);
                }); 
            };
    });


        afterEach(async function(){
           await driver.quit();
        });
    });
    });