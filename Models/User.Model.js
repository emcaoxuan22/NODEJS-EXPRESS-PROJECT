const mongoose = require('mongoose')

const schema = mongoose.Schema
const {testConnection} = require("../helpers/connections_mutils_mongdb")
const bcrypt = require('bcrypt')

const UserSchema = new schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        require: true
    },
    password: {
        type:String,
        require:true
    }
})

UserSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPasword = await bcrypt.hash(this.password, salt)
        this.password = hashPasword
        next()
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.isCheckPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        
    }
}

module.exports =  testConnection.model('user', UserSchema)