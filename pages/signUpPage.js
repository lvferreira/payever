import { By } from 'selenium-webdriver';
import Utils from '../resources/utils.js';

class SignUpPage extends Utils {
    constructor(driver, route) {
        super(driver);
        this.driver = driver;
        this.route = route;
        this.firstNameInput = By.xpath("//input[@formcontrolname='firstName']");
        this.lastNameInput = By.xpath("//input[@formcontrolname='lastName']");
        this.emailAddressInput = By.xpath("//input[@type='email']");
        this.passwordInput = By.xpath("//input[@formcontrolname='password']");
        this.confirmPasswordInput = By.xpath("//input[@formcontrolname='confirmPass']");
        this.signUpButton = By.xpath("//button[@type='submit']");
    }

    async goTo(url, route) {
        try {
            // Navigate to the specified URL with a "fashion" path
            await this.driver.get(url + route);
        } catch (error) {
            console.error('Error navigating to URL:', error);
            throw error; // Re-throw the error for higher-level error handling
        }
    }

    async fillSignUpForm(user) {
        try {
            // Fill out First Name input field
            const firstName = await this.getElement(this.firstNameInput);
            if (!firstName) {
                throw new Error("First Name input element not found.");
            }
            await this.pressAndClick(firstName);
            await firstName.sendKeys(user.get("firstName"));

            // Fill out Last Name input field
            const lastName = await this.getElement(this.lastNameInput);
            if (!lastName) {
                throw new Error("Last Name input element not found.");
            }
            await this.pressAndClick(lastName);
            await lastName.sendKeys(user.get("lastName"));

            // Fill out Email input field
            const emailAddress = await this.getElement(this.emailAddressInput);
            if (!emailAddress) {
                throw new Error("Email Address input element not found.");
            }
            await this.pressAndClick(emailAddress);
            await emailAddress.sendKeys(user.get("email"));

            // Fill out Password input field
            const password = await this.getElement(this.passwordInput);
            if (!password) {
                throw new Error("Password input element not found.");
            }
            await this.pressAndClick(password);
            await password.sendKeys(user.get("password"));

            // Fill out Confirm Password input field
            const confirmPassword = await this.getElement(this.confirmPasswordInput);
            if (!confirmPassword) {
                throw new Error("Confirm Password input element not found.");
            }
            await this.pressAndClick(confirmPassword);
            await confirmPassword.sendKeys(user.get("password"));
        } catch (error) {
            console.error('Error filling SignUp form:', error);
            throw error; // Re-throw the error for higher-level error handling
        }
    }

    async submitSignUpRegistration() {
        try {
            // Click the Sign Up button to submit the registration
            const signUpButton = await this.getElement(this.signUpButton);
            if (!signUpButton) {
                throw new Error("Sign Up button element not found.");
            }
            await this.pressAndClick(signUpButton);
        } catch (error) {
            console.error('Error submitting SignUp registration:', error);
            throw error; // Re-throw the error for higher-level error handling
        }
    }

}

export default SignUpPage;
