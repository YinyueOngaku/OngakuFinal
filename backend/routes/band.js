var express = require('express');
const router = express.Router();
const {JamsBand, JamsUser} = require('./../db/schema.js')
const axios = require('axios');
const FormData = require('form-data')


router.get('/fetch/:username', async (req, res) => {
  try {
    const involvedBand = (await JamsUser.find({username: req.params.username}))[0]
    const involvedBandJoined = involvedBand.memberof;
    const involvedBandFollowing = involvedBand.following;
    const involvedJoinedBandInfo = await JamsBand.find({bandname: {"$in":involvedBandJoined}})
    const involvedFollowingBandInfo = await JamsBand.find({bandname: {"$in":involvedBandFollowing}})
    res.status(200).send({involvedFollowingBandInfo, involvedJoinedBandInfo})
  }
  catch (error) {
    console.log('error!:', error);
  }
});

// router.get('/fetchFollowing/:username', async (req, res) => {
//   try {
//     var involvedBand = (await JamsUser.find({username: req.params.username}))[0].following;
//     console.log(involvedBand);
//     const involvedBandInfo = await JamsBand.find({bandname: {"$in":involvedBand}})
//     // console.log(involvedBandInfo)
//     res.status(200).send(involvedBandInfo)
//     // res.status(200).send([])
//   }
//   catch (error) {
//     console.log('error!:', error);
//   }
// });

router.get('/', async (req, res) => {
  try {
    if (req.body.bandname) {
      const data = await JamsBand.find(req.body);
      res.status(200).send(data);
    } else {
      const data = await JamsBand.find({});
      res.status(200).send(data);
   }
  } catch (error) {
    console.log('error!:', error);
  }
});

router.delete('/', (req, res) => {
  console.log('req:', req.body);
  JamsBand.findOneAndDelete(req.body)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {throw err;})
})

router.post('/', async (req, res) => {
  try {
    const data = await JamsBand.create(req.body);
    res.status(200).send(await JamsBand.find({}));
  } catch (error) {
    console.log('error!:', error);
  }
});

router.post('/uploads', ((req, res) => {
  var data = req.body;
  addNewSong(data)
  .then((result) => { res.status(200).send(result)})
  .catch((error) => {console.log('error:', error)})
}))

router.post('/version', ((req, res) => {
  var data = req.body;
  // console.log('data:', data);
  addNewVersion(data)
  .then((result) => { res.status(200).send(result)})
  .catch((error) => {console.log('error:', error)})
}))

router.put('/', (req, res) => {
  var updateData;
  var followOrUnfollow;
  var likeOrDislike;
  for (var key  in req.body) {
    if (key !== 'bandname' &&
        key !== 'followOrUnfollow' &&
        key !== 'likeOrDislike') {
        updateData = {[key]: req.body[key]};
        }
      if (key === 'followOrUnfollow') {
        followOrUnfollow = req.body[key];
      }
      if (key === 'likeOrDislike') {
        likeOrDislike = req.body[key];
      }
    }
  updateBand(req.body, updateData, followOrUnfollow, likeOrDislike)
  .then((result) => { res.status(200).send(result)})
  .catch((error) => {console.log('error:', error)})
  });


// CONTROLLERS

const addNewSong = (data) => {
  var filter = {"bandname": data.bandname};
  console.log('filter:', filter);
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

  console.log('song:', song);
  var update = {$push: {'uploads': song}};
  return JamsBand.findOneAndUpdate(filter, update);
}

const addNewVersion = (data) =>  {
  var newEntry = {
    version_name: data.uploads.version_history.version_name,
    description: data.uploads.version_history.description,
    url: data.uploads.version_history.url,
    likes: data.uploads.version_history.likes,
    created_At: data.uploads.version_history.createdAt,
  }
  filter = {"bandname": data.bandname, "uploads.musicName": data.uploads.musicName};
  update = {$push: { "uploads.$.version_history": newEntry}}
  return JamsBand.findOneAndUpdate(filter, update);
}

const updateBand = (data, updateData, followOrUnfollow, likeOrDislike, new_entry) => {
  var filter = {bandname: data.bandname}
  var update = null || updateData

  // add follower
  if (update.followedby && followOrUnfollow === 'follow') {
    update = { $push: update };
  // remove follower
  } else if (update.followedby && followOrUnfollow=== 'unfollow') {
    update = { $pull: update };
  }
  // like or unlike a version
  if (likeOrDislike === 'like') {
    JamsBand.find({})
      .then(() => {
        filter = {"bandname": data.bandname, "uploads.musicName": data.musicName, "uploads.version_history.$[a1].version_name": data.version_name};
        update = {$inc: {"uploads.$.version_history.$[a1].likes": 1}};
        var arr ={
          arrayFilters: [
            { "a1.name": update.version_name },
          ],
        };
        return JamsBand.findOneAndUpdate(filter, update, arr);
      })
  } else if (likeOrDislike === 'unlike') {
    JamsBand.find({})
    .then(() => {
      filter = {"bandname": data.bandname, "uploads.musicName": data.musicName, "uploads.version_history.$[a1].version_name": data.version_name};
      update = {$inc: {"uploads.$.version_history.$[a1].likes": -1}};
      var arr ={
        arrayFilters: [
          { "a1.name": update.version_name },
        ],
      };
      return JamsBand.findOneAndUpdate(filter, update, arr);
    })
  }
  return JamsBand.findOneAndUpdate(filter, update);
};

module.exports = router;


