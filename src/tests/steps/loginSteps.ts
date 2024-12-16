
import { Given, When, Then } from '@cucumber/cucumber'
import { chromium, Browser, BrowserContext, Page, expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';

Given('I am on Xero login Page', async function () {
    await pageFixture.page.goto('http://google.com'); 
})

When('I login with valid credentials', async function () {
    await pageFixture.page.fill('.gLFyf', 'Selenium')
})


When('click on signIn button', async function () {
    await pageFixture.page.click("[name='btnK']")
});


Then('verify  login shpould be successful', async function () {
    
});