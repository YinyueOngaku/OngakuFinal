
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
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mockloginName: '',
      mockloginPassword:''
    }
    this.mockLogin = this.mockLogin.bind(this)
  }

  //****************View Controller********************
  viewChange = (view) => {
    switch (view) {
      case "WelcomePage":
        return <WelcomePage/>
      case "ProfilePage":
        return <ProfilePage/>
      case "SearchPage":
        return <SearchPage/>
      case "LiveChatPage":
        return <LiveChatPage user={this.state.mockloginName}/>
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
    // this.setState({view: arguments[0]})
    var action = {
      type: "switchView",
      view: arguments[0]
    }
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
        // <div>
        //   <div className="navListItem-selected-effect">
        //     <div className={"navListItem-helper-circle"}/>
        //     <div className={"navListItem-helper-square"}/>
        //   </div>
          <div className={"navListItem navListItemSelected"} >
            <div className={"navListItem-text navListItem-text-selected"}>&nbsp; &nbsp; &#9752; &nbsp; {navItems[key]}</div>
          </div>
        //<div className="navListItem-selected-effect">
        //    <div className={"navListItem-helper-circle"}/>
        //    <div className={"navListItem-helper-square"}/>
        //  </div>
        //</div>
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
    return <button className={"logoutButton"} onClick={this.logoutUser}>Logout</button>
  }
  logoutUser = () => {
    console.log("User is logged out")
    var logout = {
      type: "initializeUser",

    }
    this.props.dispatch(logout)

  }

  //****************Choose between Welcome / profile page********************
  generateViewOnDisplay = () => {
    console.log("****SignedIn",this.props.loggedIn)
    if (this.props.loggedIn) {

      const currView = this.viewChange(this.props.view)
      const navList = this.generateNavList()
      const logoutButton = this.generateLogoutButton()
      return (
        <>
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
          <div className="currPage">
            {currView}
          </div>
        </>
      )
    } else {
      return <WelcomePage/>
    }
  }



  mockLogin = function() {
    console.log('logging in step 1... ',this.state.mockloginName)
    axios({
      method: "post",
      data: {
        username: this.state.mockloginName,
        password: this.state.mockloginPassword,
      },
      withCredentials: true,
      url: 'http://localhost:3005/account/login'
    })
    .then((res) => {
      console.log('logging in step 2...',res)

      axios({
        method: "get",
        withCredentials: true,
        url: 'http://localhost:3005/account/getUser'
      })
      .then((res) => {
        console.log(res.data)
        var action = {
          type: "initializeUser",
          view: "ProfilePage",
          loggedIn:true,
          userData: res.data,
          currUser: res.data.username
        }
        this.props.dispatch(action)

      })
      .catch((err) => {
        console.log(err);
      })

    })
  }

  render() {
    const viewOnDisplay = this.generateViewOnDisplay()
    console.log('rendering...',this.props.view)
    return (
      <div>
        {!this.props.loggedIn && (
          <div className='mockLogin'>
            <h1>Login</h1>
            <input placeholder='username' onChange={e => {this.setState({mockloginName:e.target.value})}}/>
            <input placeholder='password' onChange={e => {this.setState({mockloginPassword:e.target.value})}}/>
            <button onClick={this.mockLogin}>Submit</button>
          </div>
        )}
        <div className="App">
          <div className='App-wrapper'>
            {viewOnDisplay}
          </div>
        </div>
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
    userData: state.userData
  }
}

export default connect(stateToProps, null)(App);