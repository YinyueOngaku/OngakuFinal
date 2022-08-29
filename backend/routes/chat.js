var express = require('express');
var router = express.Router();
const {JamsChat} = require('../db/schema.js');


router.get('/:chatId', async (req, res) => {
  try {
    var history = await JamsChat.find({chat_id: req.params.chatId})
    if (!history) {
      var doc = new JamsChat({chat_id: req.params.chatId, members: req.body.members, chats: []})
      await doc.save()
      var history = await JamsChat.find({chat_id: req.params.chatId})
    }
    res.status(200).send(history)

  } catch (err) {
    console.log("***Error in get chat history, ", err)
  }

});



router.post('/:chatId', async (req, res) => {
  console.log('enter!')
  try {
    const sendTime = new Date().toString().slice(0,24);
    var chats = (await JamsChat.find({chat_id: req.params.chatId}))[0].chats
    var addChat = {time: sendTime, user: req.body.user, comment: req.body.comment}
    var newChat = [...chats, addChat];
    console.log('new',newChat)
    await JamsChat.findOneAndUpdate({chat_id: req.params.chatId},{chats: newChat},
      {new: true,
      upsert: true,
    })
    res.sendStatus(200)
  } catch (err) {
    console.log("***Error in sending a new chat history, ", err)
  }

});


module.exports = router;

