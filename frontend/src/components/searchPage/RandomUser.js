import React from 'react';
import {connect, useSelector, useDispatch} from "react-redux"


const SingleDisplay = function(singleUser) {

  return (
    <div className='search-randomUser-single-container'>
      <img className = 'search-randomUser-single-avator' src={singleUser.singleUser.avatar} alt='not found'/>
      <div className='search-randomUser-single-content-container'>
        <div className='search-randomUser-single-content-name'>{singleUser.singleUser.username}</div>
        <div>{singleUser.singleUser.bio}</div>
      </div>

    </div>
  )
}

const RandomUser = function({allUser}) {

  return (
    <div className='search-randomUser-container'>
      <div className='search-randomUser-title'>Random Musicians</div>
      {allUser.slice(0,4).map((singleUser) => {
        return <SingleDisplay singleUser={singleUser}/>
      })}
    </div>

  );
}

  const mapStateToProps = function(state, props) {
    return {

    }
  }

  export default connect(mapStateToProps, null)(RandomUser);