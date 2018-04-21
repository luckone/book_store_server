import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userPostSchema = new Schema({
    title: { type: String },
    created_at: { type: Date, default: Date.now },
    text: { type: String, required: true}
})

const userPost = mongoose.model('userPost', userPostSchema)