var crypto = require('crypto');

var algo = 'aes256';
var key = process.env.REACT_APP_SECRET_KEY;
const iv = Buffer.alloc(16, 0); 

export const encrypting = (text) => {
  console.log("encrypting")
  console.log(text)
  console.log(key)
  console.log(key.length)
  var cipher = crypto.createCipheriv(algo, key, iv);
  var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
  console.log(encrypted)
  return encrypted;
};

export const decrypting = (encrypted_text, username) => {
  if (encrypted_text.startsWith("Welcome") || encrypted_text.startsWith(username)) {
    return encrypted_text;
  }
  console.log("decrypting")
  console.log(encrypted_text)
  console.log(username)
  var decipher = crypto.createDecipheriv(algo, key, iv);
  var decrypted = decipher.update(encrypted_text, 'hex', 'utf8') + decipher.final('utf8'); 
  console.log(decrypted)
  return decrypted;
};