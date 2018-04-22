import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    login: { type: String },
    password: { type: String },
    name: { type: String },
    surname: { type: String }
})

const user = mongoose.model('user', userSchema)