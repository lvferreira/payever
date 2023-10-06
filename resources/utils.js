import { until } from 'selenium-webdriver';
import { Faker, de } from '@faker-js/faker';
import { config } from './config.js';
import { writeFileSync } from 'fs';
import crypto from 'crypto';

class Utils {
    constructor(driver) {
        this.driver = driver;
        this.implicitWaitTime = config.IMPLICIT_WAIT_TIME;
        this.explicitWaitTime = config.EXPLICIT_WAIT_TIME;
        this.pageLoadTime = config.PAGE_LOAD_TIME;

        // Set the locale for Faker.js
        this.faker = new Faker({
            locale: [de]
        });
    }

    generateRandomPassword(length) {
        const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
        const DIGITS = '0123456789';
        const SPECIAL_CHARACTERS = '!@#$%^&*?';

        // Generate a cryptographically secure random buffer
        const randomBytes = crypto.randomBytes(length);

        let password = '';

        // Ensure at least one character from each category
        password += UPPERCASE.charAt(randomBytes[0] % UPPERCASE.length);
        password += LOWERCASE.charAt(randomBytes[1] % LOWERCASE.length);
        password += DIGITS.charAt(randomBytes[2] % DIGITS.length);
        password += SPECIAL_CHARACTERS.charAt(randomBytes[3] % SPECIAL_CHARACTERS.length);

        const allCharacters = UPPERCASE + LOWERCASE + DIGITS + SPECIAL_CHARACTERS;

        for (let i = 4; i < length; i++) {
            const randomIndex = randomBytes[i] % allCharacters.length;
            password += allCharacters.charAt(randomIndex);
        }

        // Shuffle the password to randomize the character order
        const passwordArray = password.split('');
        for (let i = passwordArray.length - 1; i > 0; i--) {
            const index = randomBytes[i] % (i + 1);
            const temp = passwordArray[index];
            passwordArray[index] = passwordArray[i];
            passwordArray[i] = temp;
        }

        return passwordArray.join('');
    }

    generateRandomUserMap() {
        // Generate random user credentials
        const firstName = this.faker.person.firstName();
        const lastName = this.faker.person.lastName();
        const email = this.faker.internet.email({
            firstName: firstName.toLowerCase(),
            lastName: lastName.toLowerCase()
        });
        const password = this.generateRandomPassword(12);
        // Initialize userMap object and set its appropriate values
        const userMap = new Map();
        userMap.set('firstName', firstName);
        userMap.set('lastName', lastName);
        userMap.set('email', email);
        userMap.set('password', password);
        // Return userMap
        return userMap;
    }

    generateRandomPhoneNumber() {
        return this.faker.phone.number('### #######');
    }

    formatKey(key) {
        // Custom method to format the keys
        const words = key.split(/(?=[A-Z])/); // Split by uppercase letters
        return words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }

    async takeScreenshot(driver, testSuite) {
        try {
            // Take a screenshot using the provided WebDriver instance
            const image = await driver.takeScreenshot();
            // Define the file path where the screenshot will be saved (relative to project root)
            const filePath = `./screenshots/${testSuite}.png`;
            // Write the screenshot data to the file in base64 format
            writeFileSync(filePath, image, 'base64');
            // Log a success message
            console.log(`Screenshot saved: ${filePath}`);
        } catch (error) {
            // Throw a custom error with a descriptive message
            throw new Error(`Error taking screenshot: ${error.message}`);
        }
    }

    async pressAndClick(element) {
        try {
            // Press and click an element
            const actions = this.driver.actions();
            await actions
                .move({ origin: element })
                .click()
                .perform();
        } catch (error) {
            // Throw a custom error with a descriptive message
            throw new Error(`Error in pressAndClick: ${error.message}`);
        }
    }

    async doubleClick(element) {
        try {
            // // Double-click the element
            const actions = this.driver.actions();
            await actions
                .move({ origin: element })
                .doubleClick()
                .perform();
        } catch (error) {
            // Throw a custom error with a descriptive message
            throw new Error(`Error in pressAndClick: ${error.message}`);
        }
    }

    async getElement(locator) {
        try {
            await this.driver.wait(until.elementLocated(locator), this.explicitWaitTime);
            return this.driver.findElement(locator);
        } catch (error) {
            console.error(`Error getting element: ${error.message}`);
            return null;
        }
    }

    async getElements(locator) {
        try {
            await this.driver.wait(until.elementsLocated(locator), this.explicitWaitTime);
            return this.driver.findElements(locator);
        } catch (error) {
            console.error(`Error getting elements: ${error.message}`);
            return [];
        }
    }

    async makeItVisible(element) {
        // Make an element visible
        const script = "arguments[0].style.height = 'auto'; arguments[0].style.overflow = 'visible';";
        await this.driver.executeScript(script, element);
    }

    async displayHiddenField(element) {
        // Display a hidden field
        const script = "arguments[0].style.display = 'block';";
        await this.driver.executeScript(script, element);
    }

    async removeAttribute(element, attribute) {
        // Remove an attribute from an element
        const script = `arguments[0].removeAttribute('${attribute}');`;
        await this.driver.executeScript(script, element);
    }

    // Other utility methods can be added here...
}

export default Utils;

