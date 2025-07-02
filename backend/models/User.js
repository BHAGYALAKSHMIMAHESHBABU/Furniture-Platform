// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');


// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },               // full name or username
//   email: { type: String, required: true, unique: true }, // login email
//   password: { type: String, required: true },            // hashed
//   phone: { type: String, default: '' },                  // optional - editable
//   address: { type: String, default: '' },                // optional - editable
//   pincode: { type: String, default: '' }                 // optional - editable
// }, {
//   timestamps: true
// });

// userSchema.methods.toJSON = function () {
//   const user = this.toObject();
//   delete user.password;
//   return user;
// };


// // Hash password before save
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // ✅ Prevent OverwriteModelError:
// const User = mongoose.models.User || mongoose.model('User', userSchema);

// module.exports = User;

// // const User = mongoose.models.User || mongoose.model('User', userSchema);

// // module.exports = User;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  pincode: { type: String, default: '' }
}, {
  timestamps: true
});

// Compare password method (use function keyword to preserve `this`)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
