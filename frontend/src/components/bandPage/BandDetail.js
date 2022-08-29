import React, {useState} from 'react';
import {connect, useSelector, useDispatch} from "react-redux"
import BandTimeline from './BandTimeline';
import SingleMusic from './SingleMusic';

const BandDetail = function({bandSelecting, userData}) {
  const [whetherJoined] = useState(userData.memberof.includes(bandSelecting.bandname))
  const [whetherFollowing] = useState(userData.following.includes(bandSelecting.bandname))


  return (

    <div className='band-detail-container'>
      <div className='band-detail-otherContent-container'>
          <div className='band-detail-navbar'>
            <img className = 'band-detail-navbar-avatar' src={bandSelecting.avatar} alt='not found'/>
            <div className='band-detail-text'>&#9787; Followed by {bandSelecting.followedby.length} fans</div>
            {(!whetherJoined  && !whetherFollowing) && (
              <button>Follow</button>
            )}
            {userData.memberof.includes(bandSelecting.bandname) && <div className='band-detail-text'>&#9787; Joined</div>}
            {userData.following.includes(bandSelecting.bandname) && <div className='band-detail-text'>&#9787; Following</div>}
            <div className='band-detail-navbar-member-container'>&#9787; Members:
              {bandSelecting.memberof.map((member) => {
                return <div>&nbsp; &nbsp; {member}</div>
              })}
            </div>

            <button className='band-detail-navbar-setting'>setting</button>
          </div>
          <div className='band-detail-music-wrapper'>
            {bandSelecting.uploads.map((singleMusic) => {
              return <SingleMusic singleMusic={singleMusic} avatar={bandSelecting.avatar}/>
            })}
              <div className='band-detail-music-single-wrapper'>
                <div className='band-detail-music-single-wrapper-addSong'>➕   New Song</div>
              </div>
          </div>

        {/* </div> */}

      </div>


      {/* </div> */}

      <div className='band-detail-timeline-wrapper'>
        <BandTimeline timelineData={bandSelecting.timeline}/>
      </div>

    </div>




  );
}


const mapStateToProps = function(state, props) {
  return {
    bandFollowingData: state.bandFollowingData,
    bandJoinedData: state.bandJoinedData,
    bandSelecting: state.bandSelecting,
    userData: state.userData
  }
}


export default connect(mapStateToProps, null)(BandDetail);