import { Builder } from 'selenium-webdriver';
import { expect } from 'chai';
import { config } from '../resources/config.js';
import Utils from '../resources/utils.js';
import SignUpPage from '../pages/signUpPage.js';
import BusinessPage from '../pages/businessPage.js';
import DashboardPage from '../pages/dashboardPage.js';

const routes = [
    config.routes.fashion,
    config.routes.santander
];

function createTestSuite(route) {
    describe(`SignUp for ${route}`, function () {
        let driver;
        let signUpPage;
        let businessPage;
        let dashboardPage;
        let utils;
        let user;
        let url;

        beforeEach(async function () {
            // Create a new WebDriver instance
            driver = new Builder().forBrowser(config.browser).build();
            driver.manage().setTimeouts({
                implicit: config.IMPLICIT_WAIT_TIME * 1000, // Convert seconds to milliseconds
                pageLoad: config.PAGE_LOAD_TIME * 1000,
            });
            // Initialize page objects
            signUpPage = new SignUpPage(driver);
            businessPage = new BusinessPage(driver, route);
            dashboardPage = new DashboardPage(driver);
            utils = new Utils(driver);
            // Assign the base URL from the configuration and user data 
            url = config.baseURL;
            user = utils.generateRandomUserMap();
        });

        afterEach(async function () {
            if (driver) {
                // Check if the window is still open
                const windowHandles = await driver.getAllWindowHandles();
                if (windowHandles.length > 0) {
                    // Always take a screenshot
                    await utils.takeScreenshot(driver, this.currentTest.title);
                    // Quit the WebDriver instance
                    await driver.quit();
                }
            }
        });

        it('should verify successful registration on SignUp', async function () {
            // Navigate to the SignUp page
            await signUpPage.goTo(url, route);

            // Fill out the SignUp form with random user data
            await signUpPage.fillSignUpForm(user);

            // Submit the SignUp form
            await signUpPage.submitSignUpRegistration();

            // Create a business account
            await businessPage.createBusinessAccount();

            // Get started on the dashboard
            await dashboardPage.getStarted();

            // Verify the welcome message on the dashboard
            const welcomeMessage = await dashboardPage.getWelcomeMessage(user.get('firstName'));
            expect(welcomeMessage).to.equal(`Welcome ${user.get('firstName')}`);

            // Check if widgets are visible
            const areWidgetsVisible = await dashboardPage.areWidgetsVisible();
            expect(areWidgetsVisible).to.be.true;
        });
    });
}

routes.forEach(function (route) {
    createTestSuite(route);
});
