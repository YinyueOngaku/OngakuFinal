import Redux, {createStore, applyMiddleware} from "redux";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import ReduxThunk from 'redux-thunk'

const persistConfig = {
  key: 'persist-key',
  storage
}


const defaultState = {
  currUser: "Guest",
  avatar: "https://www.croptecshow.com/wp-content/uploads/2017/04/guest-avatar-250x250px.png",
  welcome: "Welcome!",
  loggedIn: false,
  view: "ProfilePage",
  userData: {},
  bandJoinedData: [],
  bandFollowingData: [],
  bandSelecting: {},
  allUser: [],
  allBand: [],
  allMusic: [],
  playlist: [
    {
      musicName: "stay cool, stay cold",
      url: "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
      artist: "Candace"
    },
    {
      musicName: "this is real life",
      url: "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3",
      artist: "Kai"
    },
    {
      musicName: "Mario's advanture",
      url: "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
      artist: "Ice Ages"
    },
    {
      musicName: "Forever",
      url: "http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/win.ogg",
      artist: "Kai"
    },
    {
      musicName: "Winner",
      url: "http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/lose.ogg",
      artist: "Ice Ages"
    },
    {
      musicName: "Rice Racer",
      url: "http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/menu.ogg",
      artist: "Anonymous"
    },
  ],
  currSongIndex: -1,
  currSong: {},
  currTime: 0
}


const reducerFunc = function(state = defaultState, action) {
  switch (action.type) {
    case 'original':
      return defaultState;
    case 'collectAllUser':
      var newState = {...state};
      newState.allUser = action.allUser
      return newState
    case 'addMusic':
      var allMusicNames = state.allMusic.map((singleMusic) => {
        return singleMusic.musicName
      })
      // console.log('enter!')
      var tobeAdd = [];
      for (var newSingleMusics of action.allMusic) {
        // console.log('???', newSingleMusics, state)
        for (var newSingleMusic of newSingleMusics) {
          if (!(allMusicNames.includes(newSingleMusic.musicName)) && (!Array.isArray(newSingleMusic))) {
            // console.log('enter push: ', newSingleMusic)
            allMusicNames.push(newSingleMusic.musicName)
            // console.log('checking existing names: ', allMusicNames)
            tobeAdd.push(newSingleMusic)
          }
        }
      }

      var newState = {...state};
      var newMusic = newState.allMusic.concat(tobeAdd)
      newMusic = newMusic.filter(single => {
        return !Array.isArray(single)
      })

      var existingName = [];
      var finalMusic = []
      for (var singleMusic of newMusic) {
        if (!(existingName.includes(singleMusic.musicName))) {
          finalMusic.push(singleMusic)
          existingName.push(singleMusic.musicName)
        }
      }
      newState.allMusic = finalMusic
      return newState
    case 'collectAllBand':
      var newState = {...state};
      newState.allBand = action.allBand
      return newState
    case 'initializeUser':
      var newState = {...state};
//      newState.view = action.view;      
      newState.loggedIn = true
      newState.userData = action.userdata
      newState.currUser = action.userdata.username
      newState.avatar = action.userdata.avatar
      newState.bio = action.userdata.bio
      newState.category = action.userdata.category
      newState.following = action.userdata.following
      newState.follwedby = action.userdata.followedby
      newState.memberof = action.userdata.memberof
      newState.chatroom = action.userdata.chatroom
      newState.uploads = action.userdata.uploads
      newState.currSongIndex += 1
      newState.currSong = newState.playlist[newState.currSongIndex]
      newState.timeline = action.userdata.timeline
      return newState;
    case 'initializeBand':
      var newState = {...state};
      newState.bandJoinedData=action.bandJoinedData;
      newState.bandFollowingData=action.bandFollowingData;
      newState.bandSelecting = action.bandSelecting;
      return newState;
    case 'switchView':
      var newState = {...state}
      newState.view = action.view
      return newState;
    case 'changeUser':
      var newState = {...state}
      newState.currUser = action.username
      return newState;
    case 'selectBand':
      var newState = {...state}
      var selectBand = {};
      for (var band of state.bandFollowingData) {
        if (band.bandname === action.bandSelectingId) {
          selectBand = band;
          break
        }
      }
      for (var band of state.bandJoinedData) {
        if (band.bandname === action.bandSelectingId) {
          selectBand = band;
          break
        }
      }


      newState.bandSelecting = selectBand;
      return newState
    case 'deleteRepo':
      var newState = {...state}
      var repo = []
      for (var i = 0; i < newState.uploads.length; i++) {
        if (newState.uploads[i].musicName !== action.repoName) {
          repo.push(newState.uploads[i])
        }
      }
      newState.uploads = repo;
      return newState
    case 'addToPlaylist':
      var newState = {...state}
      for (var i = 0; i < newState.uploads.length; i++) {
        if (newState.uploads[i].musicName === action.repoName) {
          newState.playlist.push({
            musicName: newState.uploads[i].musicName,
            url: newState.uploads[i].version_history[newState.uploads[i].version_history.length-1].url,
            artist: action.user
          })
        }
      }
      return newState
    case 'updateRepo':
      var newState = {...state}
      console.log("...action new", action.new)
      newState.uploads = [...newState.uploads, action.new]
      return newState
    case 'updateAvatar':
      var newState = {...state}
      newState.avatar = action.avatar
      return newState
    case 'updateBasicInfo':
      var newState = {...state}
      newState.category = action.genre
      newState.bio = action.bio
      return newState
    case 'logoutUser':
      return defaultState
    case 'initializeUserMock':
      var newState = {...state};
      newState.view = action.view;
      newState.loggedIn = action.loggedIn;
      newState.userData = action.userData;
      newState.currUser = action.currUser;
      console.log('store checking!', newState, action.currUser)
      return newState;
    case 'switchView':
      var newState = {...state}
      newState.view = action.view
      return newState;
    case 'changeUser':
      var newState = {...state}
      newState.currUser = action.username
      return newState;
    case 'nextSong':
      console.log("***next song***")
      var newState = {...state}

      newState.currTime = 0
      newState.currSongIndex += 1
      if (newState.currSongIndex === newState.playlist.length) {
        newState.currSongIndex = 0
      }
      newState.currSong = newState.playlist[newState.currSongIndex]
      // console.log("from Store: ", newState.currSong, newState.currSongIndex)
      return newState;

    case "prevSong":
      console.log("***prev song***")
      var newState = {...state}
      newState.currSongIndex -= 1
      if (newState.currSongIndex === -1) {
        newState.currSongIndex = 0
      }
      newState.currTime = 0
      newState.currSong = newState.playlist[newState.currSongIndex]
      // console.log("from Store: ", newState.currSong, newState.currSongIndex)
      return newState;
    case "songPlayTime":
      var newState = {...state}
      newState.currTime = newState.currTime + 1
      // console.log(newState.currTime)
      return newState
    case "playThisSong":
      var newState = {...state}
      for ( var i = 0; i < newState.playlist.length; i++) {
        if (newState.playlist[i].musicName === action.songName) {
          newState.currSongIndex = i
          newState.currSong = newState.playlist[i]
          break
        }
      }
      return newState
    case "deleteThisSong":
      var newState = {...state}
      for ( var i = 0; i < newState.playlist.length; i++) {
        console.log("*************",newState.playlist[i].musicName, action.songName)
        if (newState.playlist[i].musicName === action.songName) {
          if (i > newState.currSongIndex) {
            newState.playlist.splice(i,1)

          } else {
            newState.playlist.splice(i,1)
            newState.currSongIndex = Math.max(0, newState.currSongIndex-1)
            newState.currSong = newState.playlist[newState.currSongIndex]



          }
          break
        }
      }
      console.log("*****", newState.playlist)
      return newState
    default:
      return state;

  }
}

const persistedReducer = persistReducer(persistConfig, reducerFunc)
const store = createStore(persistedReducer, applyMiddleware(ReduxThunk))
const persistor = persistStore(store)

export default store;
export {persistor}
