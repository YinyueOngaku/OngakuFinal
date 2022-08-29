import React from 'react';
import {connect, useSelector, useDispatch} from "react-redux"

// const SingleMusicWidget = function({singleBand}) {

//   return (
//     <div>

//     </div>
//   )
// }


const SingleMusic = function({singleMusic, avatar}) {

  return (
    <div className='band-detail-music-single-wrapper'>
      <img className = 'band-detail-music-single-avatar' src={avatar} alt='not found'/>
      <div>{singleMusic.musicName}</div>
    </div>

  )

}

export default SingleMusic;