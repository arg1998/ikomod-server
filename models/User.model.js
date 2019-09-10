const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  phone: { type: String, unique: true },
  password: String,
  profile_image: String,
  level: Number,
  referral_id: { type: String, unique: true },
  coins: Number,
  last_visit: Date,
  registry_info: {
    sms_code: String,
    referred_user: String
  },
  competition_status: {
    coins: Number,
    rank: Number
  },
  badges: [String], //TODO: design this section
  status: {
    banned: Boolean,
    verified: Boolean,
    official: Boolean
  },
  discounts: [String] //TODO: design this section
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
