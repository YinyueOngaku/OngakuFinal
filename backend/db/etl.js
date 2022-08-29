require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const {fakeAuths, fakeBands, fakeChats, fakeUsers} = require('./fakeData.js')
const {JamsAuth, JamsUser, JamsBand, JamsChat} = require('./schema.js');
const username = process.env.username;
const key = process.env.key;
mongoose.connect(`mongodb+srv://kai:a7bfUTC7ggkBW4vk@blueocean.5pe6ny1.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser:true,
  useUnifiedTopology: true,
},
(err)=> {
  if (err) {
    console.log(err)
  } else {
  console.log('Mongoose Is Connected')}
})

var importFakeData = async function(fakeBands, fakeChats, fakeUsers) {

  for (var fakeUser of fakeUsers) {
    var filterUser = {username: fakeUser.username};
    await JamsUser.findOneAndUpdate(filterUser, fakeUser, {
      new: true,
      upsert: true,
    })
  }

  // for (var fakeBand of fakeBands) {
  //   var filterBand = {bandname: fakeBand.bandname};
  //   await JamsBand.findOneAndUpdate(filterBand, fakeBand, {
  //     new: true,
  //     upsert: true,
  //   })
  // }

//   for (var fakeChat of fakeChats) {
//     var filterChat = {chat_id: fakeChat.chat_id};
//     await JamsChat.findOneAndUpdate(filterChat, fakeChat, {
//       new: true,
//       upsert: true,
//     })
//   }
//   console.log('data reseted!')
}

var importAuth = function(fakeAuths) {
  // for (var fakeAuth of fakeAuths) {
  //   axios({
  //     method: "post",
  //     data: fakeAuth,
  //     withCredentials: true,
  //     url: 'http://localhost:3005/account/register'
  //   })
  //   .then((res) => {console.log('user registered')})
  //   .catch((err) => {console.log(err)})
  // }

}

// importAuth(fakeAuths)
importFakeData(fakeBands, fakeChats, fakeUsers);