const crypto = require("crypto");

const privateKey = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicExponent: 65537,
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
});

console.log(privateKey.privateKey);
console.log(privateKey.publicKey);
