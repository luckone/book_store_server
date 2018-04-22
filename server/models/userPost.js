import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userPostSchema = new Schema({
    title: String,
    created_at: { type: Date },
    text: String
})

const userPost = mongoose.model('userPost', userPostSchema)