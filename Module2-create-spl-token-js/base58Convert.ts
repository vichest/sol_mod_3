const bs58 = require("bs58");

const address =
  "n3gTVpZ8MZD9462hU9RqWfvNsmpyE3UQpESQwgyrP5MMREvTtoT7UEA8QY75g3mJLLSywJStyN7EVaQxrdjLGkU";
const bytes = bs58.decode(address);
// See uint8array-tools package for helpful hex encoding/decoding/compare tools
console.log(bytes);
