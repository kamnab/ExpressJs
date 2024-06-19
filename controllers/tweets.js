const Tweet = require('../models/tweet')
const User = require('../models/user')

const getTweet = async (req, res) => {
    const id = req.params.id
    const tweet = await Tweet.findById(id)
    res.json(tweet)
}

const getTweets = async (req, res) => {
    const tweets = await Tweet.find()
    return res.json({ tweets })
}
const deleteTweetById = async (req, res) => {
    const id = req.params.id
    const tweet = await Tweet.deleteOne(id)
    return res.json(tweet)
}

const createTweet = async (req, res) => {
    const { text, byUser } = req.body
    const tweet = new Tweet({
        text: text,
        byUser: byUser
    })
    const result = await tweet.save()
    const user = await User.findById(byUser)
    user.tweets.push(result._id)
    await user.save()
    return res.json(result)
}

module.exports = { getTweet, getTweets, deleteTweetById, createTweet }