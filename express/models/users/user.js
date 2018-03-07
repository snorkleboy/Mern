const mongoose = require('mongoose');
const User = new mongoose.Schema({
    created_at: { type: Date, default: Date.now },
    username:{type: String,require: "must include UserName"},
    password_digest:String,
    token:String
});

function validate(){};
function resetToken() { };
function unsetToken() { };

User.method("validate",validate(username, password,token));
User.method("resetSessionToken", resetToken);
User.method("unsetSessionToken", unsetToken);
module.exports = User;