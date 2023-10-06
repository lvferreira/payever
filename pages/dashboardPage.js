import { By, until } from 'selenium-webdriver';
import Utils from '../resources/utils.js';

class DashboardPage extends Utils {
    constructor(driver, route) {
        super(driver);
        this.driver = driver;
        this.route = route;
        this.welcomeButton = By.xpath("//button[@class='welcome-screen-content-button']");
        this.demoGreetings = By.xpath("//div[@class='demo-greeting']");
        this.widgetElements = By.css(".icons__link");
        this.widgetTitle = By.css(".icons__title");
    }
    /**
     * Clicks the "Get Started" button on the dashboard.
     */
    async getStarted() {
        try {
            // Wait for the element to be clickable
            const welcomeButton = await this.driver.wait(
                until.elementLocated(this.welcomeButton),
                this.explicitWaitTime
            );

            // Click the "Get Started" button
            await welcomeButton.click();

            // Sleep for 5 seconds
            await this.driver.sleep(3000);
        } catch (error) {
            console.error('Error in getStarted:', error);
        }
    }

    /**
     * Gets the welcome message and asserts its correctness.
     * @param {string} name - The expected name in the welcome message.
     */
    async getWelcomeMessage(name) {
        try {
            // Get the text from the demo greetings element
            const demoGreetings = await this.getElement(this.demoGreetings);
            const actualText = await demoGreetings.getText();

            // Define a regular expression pattern to match "Welcome" followed by the name
            const regexPattern = new RegExp(`Welcome ${name}`);

            // Use the regular expression to find a match in the actual text
            const match = actualText.match(regexPattern);

            if (!match) {
                throw new Error(`Welcome message not as expected. Actual: '${actualText}'`);
            }

            // Extract the matched welcome message
            const welcomeMessage = match[0];

            return welcomeMessage;
        } catch (error) {
            console.error('Error in getWelcomeMessage:', error);
            throw error; // Re-throw the error for higher-level error handling
        }
    }

    /**
     * Checks if widgets are visible and throws an error if any are missing.
     */
    async areWidgetsVisible() {
        try {
            // Find all widget elements
            const widgetElements = await this.getElements(this.widgetElements);

            // Iterate through the widget elements
            for (const widgetElement of widgetElements) {
                // Check if the widget is present and visible
                const isPresent = await widgetElement.isDisplayed();

                // Get the text of the widget with class ".icons__title"
                const widgetTitle = await widgetElement.findElement(this.widgetTitle).getText();

                // Assert that the widget is present and visible
                if (!isPresent) {
                    throw new Error(`Widget with title '${widgetTitle}' is not present or visible.`);
                }
            }
            return true;
        } catch (error) {
            console.error('Error in areWidgetsVisible:', error);
            throw error; // Re-throw the error for higher-level error handling
            // return false;
        }
    }
}

export default DashboardPage;
