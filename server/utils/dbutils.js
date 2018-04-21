import mongoose from 'mongoose'
import '../models/userPost'
import config from '../../config'

const userPost = mongoose.model('userPost')

export function setUpConnection () {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`)
}

export function listOfPosts() {
    return userPost.find()
}

export function createPost(payload) {
    const up = new userPost({
        title: data.title,
        created_at: data.created_at,
        text: data.text
    })

    return up.save()
}

export function removePost(id) {
    return userPost.findById(id).remove
}