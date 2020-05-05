const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    password: String
});

userSchema.methods.encryptPassword = (password) =>{ //obtenemos el password del modelo userSchema
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = function(password){//comparar contraseña para que el usuario se loguee
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('users', userSchema);