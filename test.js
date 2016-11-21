var BasicHash = require('./index').BasicHash;
var generateRandomBytes = require('./index').generateRandomBytes;

var options = {}

options.KEY = generateRandomBytes(32);
options.IV = generateRandomBytes(16);

var hash = new BasicHash(options);
var hashed = hash.encrypt('waiyan123');
console.log("Encrypted : "+hashed); //eslint-disable-line no-console

var password = hash.decrypt(hashed);
console.log("Decrypted : "+password); //eslint-disable-line no-console
