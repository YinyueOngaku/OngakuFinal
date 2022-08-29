var express = require('express');
var router = express.Router();
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
require('../passportConfig')(passport);
const {JamsAuth, JamsUser} = require('../db/schema.js');


router.get('/', function(req, res, next) {
  res.status(200).send('respond with a resource');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err)
      throw err;
    }
    if (!user) {
      res.send('no user exists')
    } else {
      req.logIn(user, err => {
        if (err) {
          throw err;
        }
        res.send('successfully authenticated');

      })
    }
  })(req, res, next)
})

router.post('/register', async (req, res) => {
  // console.log(req.body);
  try {
    const result = await JamsAuth.findOne({username: req.body.username})
    if (result) {
      res.status(201).send('User Already Existeds')
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new JamsAuth({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
      })
      await newUser.save();
      res.status(201).send('User Created')
    }
  }
  catch(err) {
    console.log(err)
    res.status(404).send('User Not Created')
  }
})


router.get('/getUser', async (req, res) => {
  // console.log('checking other route:', req.user)
  if (req.user) {
    try {
      const userInfo = await JamsUser.findOne({username: req.user.username})
      res.status(200).send(userInfo)
    }
    catch(err) {
      console.log(err)
      res.status(404).send(err)
    }
  } else {
    res.status(200).send('please log in first')
  }
})

router.get('/getUserByFilter', async (req, res) => {
  console.log("***CHECK***",req.body)
  // if (req.user) {
    try {
      const userInfo = await JamsUser.find({$or: [
        {username: {$regex: req.body.filter}},
        {category: {$regex: req.body.filter}}
      ]})

        res.status(200).send(userInfo)
      } catch(err) {
      console.log("*****",err)
      res.status(404).send(err)
    }
  // } else {
  //   res.status(200).send('please log in first')
  // }
})

router.get('/getallUser', async (req, res) => {
  // console.log('backend', req.user)
  // if (req.user) {
    try {
      const userInfo = await JamsUser.find();
      res.status(200).send(userInfo);
    }
    catch(err) {
      console.log(err);
      res.status(404).send(err);
    }
  // }
  // else {
  //   res.status(200).send('please log in first');
  // }
})

router.put('/editUser', async (req, res) => {
  if (req.user) {
    try {
      const userInfo = await JamsUser.findOneAndUpdate({username: req.user.username}, req.body, {
        new: true,
        upsert: true,
      })
      res.status(200).send(userInfo)
    }
    catch(err) {
      console.log(err)
      res.status(404).send(err)
    }
  } else {
    res.status(200).send('please log in first')
  }
})

router.post('/uploads', (async (req, res) => {
  if (req.body.user) {
    console.log("***account upload")
    try {
      var data = req.body;
      const newSong = await addNewSong(data);
      res.status(200).send('song uploaded!');
    } catch (err) {
     console.log(err)
     res.status(404).send(err)
    }
   } else {
     res.status(200).send('please log in first')
   }
}))
const addNewSong = (data) => {
  var filter = {"username": data.username};
  console.log('filter:', filter, 'data:', data);
  var song = {
    musicName: data.musicName,
    version_history: {
    version_name: data.version_history.version_name,
    description: data.version_history.description,
    url: data.version_history.url,
    likes: data.version_history.likes,
    createdAt: data.version_history.createdAt
    }
  };
  var update = {$push: {'uploads': song }};
  console.log('update :', update);
  return JamsUser.findOneAndUpdate(filter, update);
}

router.post('/version', (req, res) => {
  if (req.body.user) {
    var data = req.body;
    addNewVersion(data)
    .then((result) => { res.status(200).send(result)})
    .catch((error) => {console.log('error:', error); res.status(400).send(error);});
  } else {
    res.status(200).send('please log in first')
  }
})

const addNewVersion = (data) =>  {
  var newEntry = {
    version_name: data.uploads.version_history.version_name,
    description: data.uploads.version_history.description,
    url: data.uploads.version_history.url,
    likes: 0,
    created_At: data.uploads.version_history.createdAt,
  }
  filter = {"username": data.username, "uploads.musicName": data.uploads.musicName};
  update = {$push: { "uploads.$.version_history": newEntry}}
  console.log('filter:', filter, 'update:', update);
  return JamsUser.findOneAndUpdate(filter, update)
}


module.exports = router;

