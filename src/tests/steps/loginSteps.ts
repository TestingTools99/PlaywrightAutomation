
 import { Given, When, Then} from '@cucumber/cucumber'
 import { chromium, Browser, BrowserContext,Page, expect } from '@playwright/test'; 

  let browser : Browser
  let page : Page
  let context : BrowserContext

  

  Given('I am on Xero login Page', async function () {
     browser = await chromium.launch({headless:false})
     const context: BrowserContext = await browser.newContext();
     page =  await context.newPage()
     await page.goto('http://google.com')
    })

  When('I login with valid credentials', async function () {
      await page.fill('.gLFyf','Selenium')
  })
     

  When('click on signIn button', async function () {
    await page.click("[name='btnK']")
  });


  Then('verify  login shpould be successful', async function () {
    wait(10000)
    await page.close()
  });

  function wait(ms: number) {
    const start = Date.now();
    while (Date.now() - start < ms) {
      // Busy wait loop
    }
  }