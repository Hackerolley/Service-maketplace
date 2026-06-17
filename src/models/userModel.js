import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone :{
    type: Number,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  avatar: {
    type: String,

  },

  roles: {
    type: String,
    enum: ['admin', 'provider', 'customer'],
    default: 'customer'
  },



});

//password hashing before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model('User', userSchema);