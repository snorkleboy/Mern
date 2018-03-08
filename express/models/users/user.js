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



User_schema.statics.authenticate = function authenticate(username, password) {
    const thisUser = this;
    return new Promise((resolve, reject)=>{
        thisUser.findOne({ 'username': username }, (err, user) => {
            console.log("AUTNETICATE FIND", username, user,err);
            if (user){
                bcrypt.compare(password, user.password_digest)
                    .then(res => res ? resolve(user) : reject({ "error": `wrong password` }));
            }else{
                reject({ "error": `could not find user ${username}` })
            }
        });
    })
};
    
User_schema.methods.createPasswordDigest = function createPassWordDigest(password){
    const thisUser = this;
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err){ 
                reject(err);
            }else{ 
                thisUser.password_digest = hash;
                resolve(thisUser);
            }        
        });
    })
}
User_schema.methods.login = function(){

};
User_schema.methods.logout = function logout(){};
User_schema.statics.checkToken = function checkToken(username, token){};
User_schema.plugin(uniqueValidator);

const Users = mongoose.model('Users', User_schema);
module.exports = Users
