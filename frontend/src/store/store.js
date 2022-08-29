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
  view: "WelcomePage",
  userData: {},
  bandJoinedData: [],
  bandFollowingData: [],
  bandSelecting: {},
  allUser: [],
  allBand: [],
  allMusic: [],
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
      newState.view = action.view;
      newState.loggedIn = action.loggedIn;
      newState.userData = action.userData;
      newState.currUser = action.currUser;
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
    default:
      return state;

  }
}

const persistedReducer = persistReducer(persistConfig, reducerFunc)
const store = createStore(persistedReducer, applyMiddleware(ReduxThunk))
const persistor = persistStore(store)

export default store;
export {persistor}