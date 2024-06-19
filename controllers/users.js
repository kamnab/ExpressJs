const User = require('../models/user')

const getUser = async (req, res) => {
    // If string in userId
    const userId = req.params.id
    const user = await User.findById(userId)
    res.json(user)
}

const getUsers = async (req, res) => {
    const users = await User.find().populate('tweets')
    return res.json(users)
}

const deleteUserById = async (req, res) => {
    const id = req.params.id
    const user = await User.deleteOne(id)
    return res.json(user)
}

const createUser = async (req, res) => {
    const { name, age, email } = req.body
    const user = new User({
        name: name,
        age: age,
        email: email
    })
    const result = await user.save()
    return res.json(result)
}

module.exports = { getUser, getUsers, deleteUserById, createUser }