const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
var secureRandom = require('secure-random')


const saltRounds = 10;
const User_schema = new mongoose.Schema({
    created_at: { type: Date, default: Date.now },
    username: { type: String, unique: true, index: true, required: [true, "must include UserName"]},
    password_digest: { type: String, required: [true, "must include password"]},
    token:{ type:String, index: true}
});


function resetToken() {  };
function unsetToken() { };


User_schema.methods.authenticate = function authenticate(username, password, token) {
    const that = this;
    return new Promise((resolve, reject)=>{
        that.findOne({ 'username': username }, (err, user) => {
            console.log("AUTNETICATE FIND", err, user, );
            bcrypt.compare(password, user.password_digest, (err, res)=> err ? reject(err) : resolve(res));
        });
    })
};
    
User_schema.methods.createPasswordDigest = function createPassWordDigest(password){
    const that = this;
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err){ 
                reject(err);
            }else{ 
                that.password_digest = hash;
                resolve(that);
            }        
        });
    })
}
User_schema.methods.resetSessionToken = resetToken;
User_schema.methods.unsetSessionToken = unsetToken;
User_schema.plugin(uniqueValidator);

const User = mongoose.model('Users', User_schema);
module.exports = User
