import { Given, When, Then, setDefaultTimeout} from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixture";
import { LoginPage } from "../pageInfo/LoginPage";
import { DashBoardPage } from "../pageInfo/DashBoardPage";
import { config } from '../../config'
import { WaitUtils } from "../../utils/WaitUtils";
setDefaultTimeout(20000);

let loginPage:LoginPage
let dashBoardPage : DashBoardPage

Given("navigating to Xero login page", async function () {
    loginPage = new LoginPage(pageFixture.page)
    dashBoardPage = new DashBoardPage(pageFixture.page)
    loginPage.navigateTo(config.baseURL)
});

When('user clicks on signIn with username is {string} and password is {string}', async function (userName, password) {
     await loginPage.doPerformLogin(userName,password)
  });

  Then("verify login should be successful", async function () {
    await loginPage.clickOnNotNow();
    await pageFixture.page.waitForSelector('div.xnav-header--main > nav > ol > li:nth-child(1) > a', {state: 'visible',timeout: 15000});
    await dashBoardPage.checkDashBoardLinkTab();
  });
  
