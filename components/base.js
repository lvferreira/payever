import { Builder } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome.js';
import { Options as _Options } from 'selenium-webdriver/firefox.js';
import { Options as __Options } from 'selenium-webdriver/edge.js';

class Base {
    constructor() {

    }

    async initializeDriver(browserName) {
        let driver;
        // Check browser name for appropriate instance
        if (browserName === 'chrome') {
            driver = new Builder()
                .forBrowser('chrome')
                .setChromeOptions(new Options())
                .build();
        } else if (browserName === 'firefox') {
            driver = new Builder()
                .forBrowser('firefox')
                .setFirefoxOptions(new _Options())
                .build();
        } else if (browserName === 'edge') {
            driver = new Builder()
                .forBrowser('edge')
                .setEdgeOptions(new __Options())
                .build();
        }
        // Set the driver timeouts
        driver.manage().setTimeouts({
            implicit: Utils.IMPLICIT_WAIT_TIME * 1000, // Convert seconds to milliseconds
            pageLoad: Utils.PAGE_LOAD_TIME * 1000,
        });
        return driver;
    }
}

export default Base;
