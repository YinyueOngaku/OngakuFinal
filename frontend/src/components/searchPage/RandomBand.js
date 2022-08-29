import React from 'react';
import {connect, useSelector, useDispatch} from "react-redux"


const SingleDisplay = function(singleBand) {

  return (
    <div className='search-randomUser-single-container'>
      <img className = 'search-randomUser-single-avator' src={singleBand.singleBand.avatar} alt='not found'/>
      <div className='search-randomUser-single-content-container'>
        <div className='search-randomUser-single-content-name'>{singleBand.singleBand.bandname}</div>
        <div>{singleBand.singleBand.bio}</div>
      </div>

    </div>
  )
}

const RandomBand = function({allBand}) {

  return (
    <div className='search-randomUser-container'>
      <div className='search-randomUser-title'>Random Bands</div>
      {console.log('in random user: ', allBand)}
      {allBand.slice(0,4).map((singleBand) => {
        return <SingleDisplay singleBand={singleBand}/>
      })}
    </div>

  );
}

  const mapStateToProps = function(state, props) {
    return {

    }
  }

  export default connect(mapStateToProps, null)(RandomBand);