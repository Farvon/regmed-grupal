const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  name: String,
  registration_number: String,
  type: String,
  enabled: Boolean,
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.password;
  },
});

userSchema.plugin(uniqueValidator);

const User = model('User', userSchema);

module.exports = User;
