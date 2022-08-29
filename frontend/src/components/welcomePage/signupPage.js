import React from 'react';
import {connect} from "react-redux"
import axios from "axios"

const signupPage = function(props) {
  const regUser = (event) => {
    event.preventDefault()
    console.log("***clicked")

    var category = (event.target.genre.value).split(',')
    console.log("Auth info, ", event.target.username.value, event.target.password.value,event.target.bio.value,event.target.email.value,category)
    axios({
      method: "post",
      data: {
        username: event.target.username.value,
        password: event.target.password.value,
        email: event.target.email.value,
        bio: event.target.bio.value,
        category: category
      },
      withCredentials: true,
      url: 'http://localhost:3005/account/register'
    })
    .then((res) => {
      console.log("***Successfully register")
      props.switchView('Signup')
    }).catch((err)=> {
      console.log("***Error register: ", err)
    })


  }

  return (
    <>
    <div className="Welcome-login-img-container">
      <img className="Welcome-login-img" src={require("./welcome-signup.png")}  alt="welcomeimage"/>
    </div>

    <div className="Welcome-signup-inputfield">
      <div className="newuser"><div className="newuser-text">New User</div></div>
      <form className="signupInputfield" onSubmit={regUser}>
        <label className="signuplabel1" htmlFor="username">Username</label>
        <input className="inputbox" name='username'></input>
        <label className="signuplabel1" htmlFor="email">e-mail</label>
        <input className="inputbox" name='email' type='email'></input>
        <label className="signuplabel1" htmlFor="Password">Password</label>
        <input className="inputbox" name='password' type='password'></input>
        <label className="signuplabel1" htmlFor="bio" >Bio</label>
        <input className="inputbox" name='bio' placeholder="Tell us about yourself"></input>
        <label className="signuplabel1" htmlFor="genre">Genre</label>
        <input className="inputbox" name='genre' placeholder="E.g. Pop, Jazz, R&B"></input>

        <div className="signupbtnGroup">
          <button className="login-login" onClick={(event)=>{props.switchView("Signup")}}>Login</button>
          <button className="login-login login-signup">Signup</button>
        </div>
      </form>


    </div>
  </>
  );
}

  const mapStateToProps = function(state, props) {
    return {
    }
  }

  export default connect(mapStateToProps, null)(signupPage);