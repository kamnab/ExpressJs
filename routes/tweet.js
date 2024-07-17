const express = require("express");
const {
  getTweet,
  getTweets,
  deleteTweetById,
  createTweet,
} = require("../controllers/tweets");
const { idValidator } = require("../middlewares");
const router = express.Router();

//router.get('/:id', idValidator, getTweet)
router.get("/:id", getTweet);

router.get("/", getTweets);

router.delete("/:id", deleteTweetById);

router.post("/", createTweet);

module.exports = router;
