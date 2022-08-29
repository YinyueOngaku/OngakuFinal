import React from 'react';
import {connect} from "react-redux"
import LoginPage from "./loginPage.js"
import SignupPage from "./signupPage.js"

class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view: "Login"}
  }

  changeView = (view) => {
    if (view ==="Login") {
      this.setState({view:"Signup"})
    } else {
      this.setState({view:"Login"})
    }

  }

  generateWelcomeView = (view) => {
    switch (view) {
      case "Login":
        return <LoginPage switchView={this.changeView}/>
      case "Signup":
        return <SignupPage switchView={this.changeView}/>
      default:
        return <LoginPage switchView={this.changeView}/>
    }
  }

  render() {
    const welcomeView = this.generateWelcomeView(this.state.view)
    return (
      <div className="Welcome-wrapper">
        {welcomeView}
      </div>
    );
  }


}

  const mapStateToProps = function(state, props) {
    return {
    }
  }

  export default connect(mapStateToProps, null)(WelcomePage);