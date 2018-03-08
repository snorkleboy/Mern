const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const User_schema = new mongoose.Schema({
    created_at: { type: Date, default: Date.now },
    username: { type: String, unique:true, index: true, require: "must include UserName"},
    password_digest:String,
    token:String
});

function authenticate(username, password,token){return true};
function resetToken() { };
function unsetToken() { };


User_schema.methods.authenticate= authenticate;
User_schema.methods.resetSessionToken = resetToken;
User_schema.methods.unsetSessionToken = unsetToken;
User_schema.plugin(uniqueValidator);
const User = mongoose.model('Users', User_schema);
module.exports = User