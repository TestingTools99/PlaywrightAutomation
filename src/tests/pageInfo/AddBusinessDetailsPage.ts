import { Locator, Page, expect } from "@playwright/test";
import BasePage from "./BasePage";
import { WaitUtils } from "../../utils/WaitUtils";
import { StringGenerator } from "../../utils/StringGenerator";

export class AddBusinessDetailsPage extends BasePage {
    readonly page: Page;
    private readonly businessNameTextBox: Locator;
    private readonly industryDropDown: Locator;
    private readonly countryDropDown: Locator;
    private readonly employeeYesRadioButton: Locator;
    private readonly employeeYesStatusLabel: Locator;
    private readonly selectTool: Locator;
    private readonly industryOption: Locator;
    private readonly startTrailButton:Locator
    private readonly createdOrganization:Locator
    private readonly accountingTask:Locator
    private businessName:string=''
    
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.businessNameTextBox = page.locator("div[data-automationid='organisation-name']>input");
        this.industryDropDown = page.locator("//input[contains(@class,'IndustryField')]");
        this.countryDropDown = page.locator("#Country");
        this.employeeYesRadioButton = page.locator("//input[contains(@id,'AN_VAL_YES')]");
        this.employeeYesStatusLabel = page.locator("//span[text()='Yes']");
        this.selectTool = page.locator("//button//span[text()='Select a tool']");
        this.industryOption = page.locator("//button/span/span/strong");
        this.startTrailButton = page.locator("button[data-automationid='NewOrgProv-StartTrial']");
        this.createdOrganization = page.locator('div.xui-pageheading--leftcontent > div > div > h1 > div')
        this.accountingTask = page.locator('div.p-like.userflowjs-container--none > div > button:nth-child(2) > div')

    }

    async addBusinessDetails(businessName: string, industry: string, country: string, employeeStatus: string, selectTool:string) {
     this.businessName = StringGenerator.generateRandomString(businessName, 5)
      await this.businessNameTextBox.fill(this.businessName);
        await this.industryDropDown.fill(industry);
        await this.page.waitForSelector("//button/span/span/strong");
        await this.industryOption.click();
        await this.countryDropDown.fill(country)
        await WaitUtils.asyncWait(this.page,3000)
        let empStatus = await this.employeeYesStatusLabel.textContent()
        if(empStatus==employeeStatus){
          await this.employeeYesRadioButton.click()
        }
        await this.selectTool.click();
        await this.page.waitForSelector("//span[text()='"+selectTool+"']")
        await this.page.locator("//span[text()='"+selectTool+"']").click()
    }

    async clickOnStartTrail()
    {
      await this.startTrailButton.click()
      await WaitUtils.asyncWait(this.page, 5000)
    }

    async verifyCreatedOrganization()
    {
        expect(await this.createdOrganization.textContent()).toContain(this.businessName)
        await WaitUtils.asyncWait(this.page, 3000)
        await this.page.frameLocator('iframe.userflowjs-bubble__frame').locator('div.p-like.userflowjs-container--none > div > button:nth-child(2) > div').click()
        await this.page.frameLocator('iframe.userflowjs-bubble__frame').locator('//*[@id="userflowjs-bubble-content"]/div[2]/div[2]/button[5]/div[1]/div').click()
        await this.page.frameLocator('iframe.userflowjs-bubble__frame').locator('')
        await this.page.frameLocator('iframe.userflowjs-bubble__frame').locator("//div[text()='Next']").click()
        await WaitUtils.asyncWait(this.page, 3000)
    }




}
