import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixture";
import { DashBoardPage } from "../pageInfo/DashBoardPage";
import { LoginPage } from "../pageInfo/LoginPage";
setDefaultTimeout(20000);

let loginPage: LoginPage;
let dashBoardPage: DashBoardPage;


Given("click on Organization dropdown in the dashBoard", async function () {
    loginPage = new LoginPage(pageFixture.page);
    dashBoardPage = new DashBoardPage(pageFixture.page);
    await dashBoardPage.selectOrganizationDropdown()
});

Then("verify that Add organization link is visible and enabled",async function () {
    await dashBoardPage.verifyAddOrganizationLink()
});

When("click on Add organization link", async function () {
   await dashBoardPage.clickOnAddorganizationLink()
});

Then("verify that Add Business page", async function () {
   await dashBoardPage.verifyAddBusinessPage()
});
