const mongoose = require("mongoose");

const jamsAuth = new mongoose.Schema(
  {
    username: String,
    email: {type: String, required: true},
    password: {type: String, required: true},
  }
);

const jamsUser = new mongoose.Schema(
   {
    username: String,
    bio: String,
    avatar: String,
    category: Array,
    following: Array,
    followedby: Array,
    memberof: Array,
    chatroom: Array,
    uploads: [
      {
        title: String,
        version_history:[
          {
            version_name: String,
            description: String,
            url: String,
            likes: Number,
            createdAt: String
          }
        ]
      }
    ],
    timeline: {
      date: String,
      action: String,
      involvedName: String
    }
  },
);

const jamsBand = new mongoose.Schema(
  {
    bandname: String,
    bio: String,
    category: Array,
    avatar: String,
    followedby: Array,
    memberof: Array,
    uploads: [
      {
        musicName: String,
        version_history:[
          {
            version_name: String,
            description: String,
            url: String,
            likes: Number,
            createdAt: String
          }
        ]
      }
    ],
    timeline: {
      date: String,
      action: String,
      involvedName: String
    }
  }
)

const jamsChat = new mongoose.Schema(
  {
    chat_id: String,
    members: Array,
    chats: [
      {
        time: String,
        user: String,
        comment: String
      }
    ]
  });

const JamsAuth = new mongoose.model('JamsAuth', jamsAuth);
const JamsUser = new mongoose.model('JamsUser', jamsUser);
const JamsBand = new mongoose.model('JamsBand', jamsBand);
const JamsChat = new mongoose.model('JamsChat', jamsChat);

 module.exports = {JamsAuth, JamsUser, JamsBand, JamsChat};