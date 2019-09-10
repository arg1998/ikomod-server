const nanoID = require('nanoid/generate');
const ref_alphabets = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const sms_alphabets = '0123456789';
module.exports = {
  genReferralId: () => nanoID(ref_alphabets, 10),
  genSmsCode: () => nanoID(sms_alphabets, 6)
};
