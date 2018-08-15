import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookSchema = new Schema({
    book_name: {type: String}
})

const book = mongoose.model('book', bookSchema)