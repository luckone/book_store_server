import mongoose from 'mongoose'
import '../models/userPost'
import '../models/users'
import config from '../../config'
import crypto from 'crypto'

const userPost = mongoose.model('userPost')
const user = mongoose.model('user')

export function setUpConnection () {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`)
}

export function listOfPosts() {
    return userPost.find()
}

export function createPost(payload) {
    console.log(payload)
    const up = new userPost({
        title: payload.title,
        created_at: payload.created_at,
        text: payload.text
    })

    return up.save()
}

export function removePost(id) {
    return userPost.findById(id).remove
}

export function createUser(avatar, payload) {
    const u = new user({
        avatar: avatar,
        login: payload.login,
        password: payload.password,
        name: payload.name,
        surname: payload.surname,
        access_token: crypto.randomBytes(20).toString('hex')
    })

    return u.save()
}

export function checkUser(payload) {
    return user.findOne({
        'login': payload.login,
        'password': payload.password
    })
}

export function getMe(payload) {
    return user.findOne({
        'access_token': payload.toString()
    })
}