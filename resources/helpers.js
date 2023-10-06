import Utils from './utils.js';

// Invoke the static function
const userMap = Utils.generateRandomUserMap();
// const password = Utils.generateRandomPassword(12);

// Access the values in the userMap
console.log(userMap.get('firstName'));
console.log(userMap.get('lastName'));
console.log(userMap.get('email'));
console.log(userMap.get('password'));
// console.log(password);
