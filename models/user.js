const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const plugin = passportLocalMongoose.default || passportLocalMongoose;

const userSchema = new Schema({
  email : {
    type: String,
    required: true
  }
});

userSchema.plugin(plugin);

module.exports = mongoose.model("User", userSchema);
