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

export function createBook(payload) {
    const b = new book({
        book_name: payload.name
    })

    return b.save()
}

export function removeBook(id) {
    book.findById(id).remove
}