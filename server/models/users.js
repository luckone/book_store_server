import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    login: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    avatar: { type: String },
    access_token: { type: String }
})

const user = mongoose.model('user', userSchema)