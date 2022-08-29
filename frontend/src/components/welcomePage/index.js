import React from 'react';
import {connect, useSelector, useDispatch} from "react-redux"
import LoginPage from "./loginPage.js"
import SignupPage from "./signupPage.js"

const WelcomePage = function() {

  return (
    <div>
      <LoginPage/>
      <SignupPage/>
    </div>

  );
}

  const mapStateToProps = function(state, props) {
    return {
    }
  }

  export default connect(mapStateToProps, null)(WelcomePage);