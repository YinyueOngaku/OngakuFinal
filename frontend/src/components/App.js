
import React from "react";
import {Provider} from "react-redux"
import {connect} from "react-redux"
import store from "../store/store.js"
import Profile from "./profile"
import BandPage from './bandPage';
import LiveChatPage from './liveChatPage';
import SearchPage from './searchPage';
import ProfilePage from './profilePage';
import MusicPage from './musicPage';
import WelcomePage from './welcomePage';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nextSong: 0}
  }

  //****************View Controller********************
  viewChange = (view) => {
    switch (view) {
      case "WelcomePage":
        return <WelcomePage/>
      case "ProfilePage":
        return <ProfilePage switchView={this.selectThisView}/>
      case "SearchPage":
        return <SearchPage/>
      case "LiveChatPage":
        return <LiveChatPage  user={this.state.mockloginName}/>
      case "BandPage":
        return <BandPage/>
      case "MusicPage":
        return <MusicPage/>
      default:
        return <WelcomePage/>
    }

  }


  //****************Navigation List********************
  selectThisView(event, item) {
    console.log(arguments[0])
    var action = {
      type: "switchView",
      view: arguments[0]
    }
    console.log( action)
    this.props.dispatch(action)
  }
  generateNavList = () => {
    var navItems = {
      "ProfilePage":"Profile",
      "SearchPage":"Explore",
      "LiveChatPage":"Messages",
      "BandPage":"Band",
      "MusicPage":"Music"}
    var navList = []
    for (var key in navItems) {
      if (key === this.props.view) {
        navList.push((
          <div className={"navListItem navListItemSelected"} >
            <div className={"navListItem-text navListItem-text-selected"}>&nbsp; &nbsp; &#9752; &nbsp; {navItems[key]}</div>
          </div>
        ))
      } else {
        navList.push((
        <div className={"navListItem"} onClick={this.selectThisView.bind(this, key)}>
          <div className={"navListItem-text"}>&nbsp; &nbsp; &#9752; &nbsp; {navItems[key]}</div>
        </div>))
      }
    }
    return (navList)
  }

  //****************Logout Button********************
  generateLogoutButton = () => {
    return <button className="logoutButton" onClick={this.logoutUser}>Logout</button>
  }
  logoutUser = () => {
    console.log("User is logged out")
    var action = {
      type: "logoutUser"
    }
    this.props.dispatch(action);
  }

  //****************Choose between Welcome / profile page********************
  nextSong = (event) => {
    console.log("song Finished")
    // event.preventDefault()
    const action = {
      type: "nextSong"
    }
    this.props.dispatch(action)
    // window.location.reload(false);

  }


  updateTime = () => {
    this.props.dispatch({type:"songPlayTime"})
    // console.log("timer per sec", this.props.songtime)
  }

  generateViewOnDisplay = () => {
    if (this.props.loggedIn) {

      const currView = this.viewChange(this.props.view)
      const navList = this.generateNavList()
      const logoutButton = this.generateLogoutButton()
      // console.log("***Check music name",this.props.song.musicName)

      return (
        <div className='App-wrapper'>
          <div className="navBar">
            <div className="userAvatar">
              <div className="Avatar-container">
                <img className="Avatar-img" src={this.props.avatar} alt="not found"/>
              </div>
              <div className="Avatar-username">{this.props.user}</div>
            </div>
            <div className="navList-container">
              {navList}
            </div>
            <div className="navImage"><img className='navImage-img' src={require("./pic1.png")} alt="not found"/></div>
            <div className="logoutButton-container">
              {logoutButton}
            </div>
          </div>
          <div className="currPage"> {currView} </div>
          {/* <MusicPlayer/> */}
          {/* <div style={{"display":"none"}}>
            <ReactAudioPlayer autoplay listenInterval={1000} src={this.props.song.url} id="hiddenplayer" controls onEnded={this.nextSong} onListen={this.updateTime} />
          </div> */}
        </div>
      )
    } else {
      return <WelcomePage/>
    }
  }

  render() {
    const viewOnDisplay = this.generateViewOnDisplay()

    return (
        <div className="App">
            {viewOnDisplay}
        </div>
    );
}
}

const stateToProps = (state)=>{
  return {
    avatar: state.avatar,
    welcome: state.welcome,
    user: state.currUser,
    loggedIn: state.loggedIn,
    view: state.view,
    song: state.currSong,
    songtime: state.currTime
  }
}

export default connect(stateToProps, null)(App);
