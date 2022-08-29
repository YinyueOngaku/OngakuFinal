import React from "react"
import store from "./store/store.js"
import {connect} from "react-redux"

class Example extends React.Component {
  constructor(props) {
    super(props);
  }

  nextImg(event) {
    // console.log("next image")
    if (this.props.currID + 1 > this.props.maxID) {
      var action2 = {
        type: "scrollDown",
      }
      this.props.dispatch(action2)
    }
    var action1 = {
      type: "nextImage",
      currID: this.props.currID
    }
    this.props.dispatch(action1)
  }



  render() {

    return (
      <div>


      </div>


    )
  }
}

const stateToProps = (state)=>{
  return {
    avatar: state.avatar,
    welcome: state.welcome
  }
}

export default connect(stateToProps, null)(Example);