const userModel = require('../../../models/User.model');
const ObjectId = require('mongoose/lib/types/objectid');
const apiStatus = require('../utils/statusCodes');
const { genReferralId, genSmsCode } = require('../utils/randomStringGenerator');
const JWT = require('jsonwebtoken');
const dateFns = require('date-fns');
const bcrypt = require('bcrypt');
const configs = require('../../../configs/configs');

module.exports = {
  getUser: async (req, res) => {
    try {
      const { object_id } = req.params;
      const uoid = new ObjectId(object_id);
      const user = await userModel.findById(uoid);
      if (user) {
        res.status(200).send({ user });
      } else {
        res.status(404).send({ error: 'user not found' });
      }
    } catch (error) {
      res.status(400).send({ error });
    }
  },

  signUp: async (req, res) => {
    try {
      // GET THE VALIDATED USER INPUT
      const { user: validatedUser } = req; // get this from previous joi validation middleware
      const user = await userModel.findOne({ phone: validatedUser.phone });
      // CHECK IF USER DOESN'T ALREADY EXIST IN DATABASE
      if (user) {
        res.send({ error: { code: apiStatus.USER_EXIST } });
      } else {
        //HASH THE INPUT PASSWORD WITH SALT
        const hashedPass = await bcrypt.hash(validatedUser.password, 10);

        //CHECK IF USER HAS A REFERRER
        let referred_user = null;
        if (validatedUser.referral_code) {
          //TODO: read the admin config and give the two users their reward
          referred_user = validatedUser.referral_code;
        }

        //CREATE A USER OBJECT AND SAVE IT TO DATABASE
        const newUser = await new userModel({
          name: validatedUser.name,
          phone: validatedUser.phone,
          password: hashedPass,
          profile_image: null,
          level: 1,
          coins: 0, //TODO: read from admin configs
          last_visit: Date.now(),
          competition_status: {
            coins: 0,
            rank: -1
          },
          badges: [],
          status: {
            banned: false,
            verified: false,
            official: false
          },
          discounts: [],
          // GENERATE A REFERRAL CODE
          referral_id: genReferralId(),
          registry_info: {
            // GENERATE A SMS CODE
            sms_code: genSmsCode(),
            referred_user
          }
        }).save();

        //CREATE A TOKEN WITH THE USER'S ID WHICH EXPIRES IN 30 DAYS
        const token = JWT.sign(
          { user_id: newUser.id },
          configs.JWT_USER_SECRET
        );

        console.log(token, configs.JWT_USER_SECRET);

        // SEND THE TOKEN AND NEWLY CREATED USER
        res.send({
          user: newUser,
          token
        });
      }
    } catch (error) {
      res.send({ error: { code: 0, message: error } });
    }
  }
};
