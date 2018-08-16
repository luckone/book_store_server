import mongoose from 'mongoose'
import config from '../../config'
import '../models/book'

const book = mongoose.model('book')

export function setUpConnection () {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`)
}

export function listOfBooks() {
    return book.find()
}

export function getBook(id) {
    return book.findById(id)
}

export function createBook(payload) {
    const b = new book({
        preview: `http://199.247.23.102:3000/uploads/${payload.preview}`,
        book_name: payload.name,
        author: payload.author,
        price: payload.price,
        amount: payload.amount,
        pages: payload.pages,
        published: payload.published,
        created_at: payload.created_at
    })

    return b.save()
}

export function removeBook(id) {
    return book.findById(id).remove()
}