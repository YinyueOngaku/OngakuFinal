import React from 'react';
import {connect} from "react-redux"
import axios from "axios"

class loginPage extends React.Component {
  constructor(props) {
    super(props)
  }

  authUser = (event) => {
    event.preventDefault()
    console.log("***clicked")
    console.log("Auth info, ", event.target.username.value, event.target.password.value)

    axios({
      method: "post",
      data: {username:event.target.username.value, password: event.target.password.value},
      withCredentials: true,
      url: 'http://localhost:3005/account/login'
    })
    .then((res) => {
      if (res.data === 'successfully authenticated') {
        console.log("user authentificated")
        axios({
          method: "get",
          withCredentials: true,
          url: 'http://localhost:3005/account/getUser'
        })
        .then((res) => {
          // console.log("returned",res)
          var action = {
            type: "initializeUser",
            userdata: res.data
          }
          this.props.dispatch(action)
        })
      } else {
        alert("Wrong username or password. Try again.")
      }
    })
  }


  render() {
    return (
      <>
        <div className="Welcome-login-img-container">
          <img className="Welcome-login-img" src={require("./welcome-login.png")}  alt="welcomeimage"/>
        </div>

        <div className="Welcome-login-inputfield">
          <div className="Ongaku"><text className="Ongaku-text">Ongaku</text></div>
          <form className="inputfield" onSubmit={this.authUser}>
            <label className="loginlabel" htmlfor="username">Username</label>
            <input className="inputbox" name='username'></input>
            <label className="loginlabel" for="Password">Password</label>
            <input className="inputbox" name='password' type='password'></input>

            <div className="loginbtnGroup">
              <button className="login-login">Login</button>
              <text className="login-login" onClick={()=>{alert("Distinguished guest, try these login info\n username: guest\n password: guest")}}>Guest</text>
              <button className="login-login login-signup" onClick={()=>{this.props.switchView("Login")}}>Signup</button>

            </div>
          </form>


        </div>
      </>
    );
  }
}



  const mapStateToProps = function(state, props) {
    return {
      loggedIn: state.loggedIn
    }
  }

  export default connect(mapStateToProps, null)(loginPage);
