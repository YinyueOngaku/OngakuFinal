import React from 'react';
import {connect, useSelector, useDispatch} from "react-redux"


const SingleDisplay = function(singleMusic) {

  return (
    <div className='search-randomMusic-single-container'>
      <div className='search-randomMusic-single-songName'>{singleMusic.singleMusic.musicName}</div>
      <div className='search-randomMusic-single-content-container'>
        <div className='search-randomUser-single-content-name'>{singleMusic.singleMusic.version_history[0].version_name}</div>
        <div className='search-randomMusic-single-content-description'>{singleMusic.singleMusic.version_history[0].description}</div>
      </div>

    </div>
  )
}

const RandomBand = function({allMusic}) {


  return (
    <div className='search-randomUser-container'>
      <div className='search-randomUser-title'>Random Musics</div>

      {allMusic.slice(0,4).map((singleMusic) => {
        return <SingleDisplay singleMusic={singleMusic}/>
      })}
    </div>

  );
}

  const mapStateToProps = function(state, props) {
    return {

    }
  }

  export default connect(mapStateToProps, null)(RandomBand);