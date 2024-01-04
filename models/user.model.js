import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please input your username']

    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
        type: String,
        default: 'data:image/jpeg;base64,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'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please Confirm your password'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the the same!'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();


    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined
    next()
})
userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next()

    this.passwordChangedAt = Date.now() - 1000;
    next();
})

userSchema.methods.correctPassword = async function (candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
  };
  userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  

  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
  export default mongoose.model("User",userSchema )