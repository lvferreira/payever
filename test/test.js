import Utils from '../resources/utils.js';
import config from '../resources/config.js';

// describe("describe test suite title", function () {
//     let suiteTitle;
//     suiteTitle = this.title;
//     console.log("suite: " + suiteTitle)

//     beforeEach(function () {
//         let beforeHook;
//         beforeHook = this.currentTest.title;
//         console.log("beforehook: " + beforeHook)
//     })

//     it("should print its test method title", function () {
//         let testTitle;
//         testTitle = this.test.title;
//         console.log("test: " + testTitle)
//     })

//     afterEach(function () {
//         let afterHook;
//         afterHook = this.currentTest.title;
//         console.log("afterhook: " + afterHook)
//     })
// })

(async function () {
    try {
        const utils = new Utils();

        const userMap = utils.generateRandomUserMap();
        userMap.forEach((value, key) => {
            console.log(key + ': ' + value);
        });
    } catch (error) {
        console.error('Error:', error);
    }
})();

(async function () {
    try {
        const utils = new Utils();

        const phoneNumber = utils.generateRandomPhoneNumber();
        console.log(phoneNumber);
    } catch (error) {
        console.error('Error:', error);
    }
})();

// const routes = [
//     config.routes.fashion,
//     config.routes.santander
// ];

// for (let i = 0; i < routes.length; i++) {
//     console.log(routes[i]);
// }



