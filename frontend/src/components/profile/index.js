import React from 'react';
import {connect, useSelector, useDispatch} from "react-redux"


const Profile = function() {
    const user = useSelector((state) => state.currUser)
    const dispatch =useDispatch();
    var changeUser = (e) => {
        e.preventDefault();
        var action = {
          type: "changeUser",
          username: 'Kai'
        }
       dispatch(action)
      }

    return (
        <>
          <div>{user}</div>
          <button onClick={(e) => {changeUser(e)}}>change user</button>
        </>

    );

    }

    const mapStateToProps = function(state, props) {
        return {
            currUser: state.currUser
        }
    }

  export default connect(mapStateToProps, null)(Profile);