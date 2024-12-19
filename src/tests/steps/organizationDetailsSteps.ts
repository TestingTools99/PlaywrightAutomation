import { Given, When, Then, setDefaultTimeout, After } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixture";
import { DashBoardPage } from "../pageInfo/DashBoardPage";
import { LoginPage } from "../pageInfo/LoginPage";
import {AddBusinessDetailsPage} from "../pageInfo/AddBusinessDetailsPage"
import { getTestData } from '../../utils/dataUtils';

setDefaultTimeout(20000);

let loginPage: LoginPage;
let dashBoardPage: DashBoardPage;
let addBusinessDetailsPage:AddBusinessDetailsPage

const testData = getTestData('Organization.json');


Given("click on Organization dropdown in the dashBoard", async function () {
    loginPage = new LoginPage(pageFixture.page);
    dashBoardPage = new DashBoardPage(pageFixture.page);
    addBusinessDetailsPage = new AddBusinessDetailsPage(pageFixture.page)
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


  When('User enters business details with {string} {string} {string} {string} {string}', async function (
    businessName, industry, country, employeeStatus, selectTool) {    
        await addBusinessDetailsPage.addBusinessDetails
        (
            testData.createOrganization.businessName, 
            testData.createOrganization.industry, 
            testData.createOrganization.country, 
            testData.createOrganization.employeeStatus,
            testData.createOrganization.selectTool
        );
    });

    When('click on Start trail button', async function () {
       await addBusinessDetailsPage.clickOnStartTrail()
    });


    Then('verify the Created Organization and displayed in the Organization dropdown', async function () {
       await addBusinessDetailsPage.verifyCreatedOrganization()
    });

   

    

