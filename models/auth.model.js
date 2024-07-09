const { Schema, model } = require('mongoose')
const bcrypt = require("bcrypt");

const authSchema = new Schema({
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user', 'student', 'operator', 'accountant'],
        default: 'user'
    }
})

authSchema.pre("save", async function (next) {
  try {
    if (this.isNew || this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (err) {
    next(err);
  }
});

authSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate();
    if (update.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(update.password, salt);
      this.update({}, { $set: { password: hashedPassword } });
    }
    next();
  } catch (err) {
    next(err);
  }
});


module.exports = model("Auth", authSchema);