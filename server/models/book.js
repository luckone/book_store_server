import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookSchema = new Schema({
    book_name: {type: String, required: true},
    author: {type: String, required: true},
    genre: [String],
    price: {type: Number, required: true},
    amount: {type: Number, default: 1},
    pages: {type: Number, default: 100},
    published: {type: String, default: 'Lionsgate'},
    preview: {type: String},
    created_at: {type: Date}
})

const book = mongoose.model('book', bookSchema)