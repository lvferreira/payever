import { By, until } from 'selenium-webdriver';
import Utils from '../resources/utils.js';

class BusinessPage extends Utils {
    constructor(driver, route) {
        super(driver);
        this.driver = driver;
        this.route = route;
        console.log(this.route);
        this.businessStatus = By.xpath("//peb-select[@formcontrolname='businessStatus']");
        this.businessOption = By.xpath("//peb-select-option[normalize-space(.) = 'Business Option']");
        if (this.route === "fashion") {
            this.companyName = By.xpath("//input[@formcontrolname='name']");
        } else if (this.route === "santander") {
            this.companyName = By.xpath("//peb-form-field-input//span[contains(text(), 'Company name')]/following-sibling::div//input");
        }
        this.industryInput = By.xpath("//input[@role='combobox']");
        this.industryType = By.xpath("//span[contains(text(),'Software')]");
        if (this.route === "fashion") {
            this.phoneNumber = By.xpath("//input[@type='tel']");
        } else if (this.route === "santander") {
            this.phoneNumber = By.xpath("//pe-input-phone//input");
        }
        this.overlayPane = By.xpath(".cdk-overlay-pane")
        this.vatNumber = By.xpath("//peb-form-field-input//span[contains(text(), 'VAT number')]/following-sibling::div//input")
        this.getStarted = By.xpath("//button[@class='signup-button']");
    }
    /**
     * Creates a business account with predefined values.
     */
    async createBusinessAccount() {
        try {
            if (this.route === "fashion") {
                // Fill out the company name
                const companyName = await this.getElement(this.companyName);
                if (!companyName) {
                    throw new Error("Company name input element not found." + companyName);
                }
                await this.pressAndClick(companyName);
                await companyName.sendKeys('Payever Careers Co.');

                // Fill out the phone number with a random value
                const phoneNumber = await this.getElement(this.phoneNumber);
                if (!phoneNumber) {
                    throw new Error("Phone number input element not found.");
                }
                await this.pressAndClick(phoneNumber);
                await phoneNumber.sendKeys(this.generateRandomPhoneNumber());

                // Click the "Get Started" button
                const getStarted = await this.getElement(this.getStarted);
                if (!getStarted) {
                    throw new Error("Get started button element not found.");
                }
                await this.pressAndClick(getStarted);
            } else if (this.route === "santander") {
                // Fill out the company name
                const companyName = await this.getElement(this.companyName);
                if (!companyName) {
                    throw new Error("Company name input element not found." + companyName);
                }
                await this.pressAndClick(companyName);
                await companyName.sendKeys('Payever Careers Co.');

                // Fill out the industry input
                const industryInput = await this.getElement(this.industryInput);
                if (!industryInput) {
                    throw new Error("Industry input element not found.");
                }
                await this.pressAndClick(industryInput);
                await industryInput.sendKeys('Software');

                // Pick out the industry type
                const industryType = await this.getElement(this.industryType);
                if (!industryType) {
                    throw new Error("Industry type element not found.");
                }
                await this.pressAndClick(industryType);

                // Fill out the phone number with a random value
                const phoneNumber = await this.getElement(this.phoneNumber);
                if (!phoneNumber) {
                    throw new Error("Phone number input element not found.");
                }
                await this.pressAndClick(phoneNumber);
                await phoneNumber.sendKeys(this.generateRandomPhoneNumber());

                // Fill out the vat number
                const vatNumber = await this.getElement(this.vatNumber);
                if (!vatNumber) {
                    throw new Error("VAT number input element not found.");
                }
                await this.pressAndClick(vatNumber);
                await vatNumber.sendKeys('DE999999999');
                // await vatNumber.sendKeys(Key.TAB);

                // Click the "Get Started" button
                const getStarted = await this.getElement(this.getStarted);
                if (!getStarted) {
                    throw new Error("Get started button element not found.");
                }
                await this.driver.sleep(5000);
                await this.pressAndClick(getStarted);

            }
        } catch (error) {
            console.error('Error creating a business account:', error);
        }
    }
}

export default BusinessPage;
