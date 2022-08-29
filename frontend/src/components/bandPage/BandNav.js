import React, {useState} from 'react';
import {connect, useSelector, useDispatch} from "react-redux"

const SingleCategory = function({category, whetherJoined}) {


  return (
    <div className={whetherJoined? 'band-nav-singleBand-info-category-joined':'band-nav-singleBand-info-category-nojoin'}>
      {category}

    </div>
  )
}

const SingleBandNav = function({singleBand, userData}) {
  const [whetherJoined] = useState(userData.memberof.includes(singleBand.bandname))
  const dispatch = useDispatch()
  var selectBand = function(e) {
    e.preventDefault();
    var selectBand = {
      type: "selectBand",
      bandSelectingId: e.currentTarget.id
    }
    dispatch(selectBand)

  }

  return (

    <div className={whetherJoined? 'band-nav-singleBand-single-wrapper-joined': 'band-nav-singleBand-single-wrapper-nojoin'} onClick={selectBand} id={singleBand.bandname}>
      <img className = 'band-nav-avator' src={singleBand.avatar} alt='not found'/>
      <div className='band-nav-singleBand-info-wrapper'>
        <div className='band-nav-singleBand-info'>
          <div className='band-nav-singleBand-info-title'>{singleBand.bandname}</div>
          <div className={whetherJoined? 'band-nav-singleBand-info-divider-joined': 'band-nav-singleBand-info-divider-nojoin'}/>
          <div className='band-nav-singleBand-info-bio'>{singleBand.bio}</div>

        </div>
        <div className='band-nav-singleBand-info-category-container'>
          {singleBand.category.map((category) => {
            return <SingleCategory key={category} category={category} whetherJoined={whetherJoined}/>
          })}
        </div>

      </div>


    </div>
  )
}

const BandNav = function({bandJoinedData, bandFollowingData, userData, setOpenNewBand}) {

  return (

    <div className='band-nav-container'>
      <div className='band-nav-singleBand-wrapper'>
        <div onClick={() => {setOpenNewBand(true)}} className='band-nav-singleBand-createBand'>
          <div className='band-nav-singleBand-createBand-text'>➕&#10;Create New Band</div>
        </div>
        {bandJoinedData.map((singleBand) => {
          return <SingleBandNav singleBand={singleBand} userData={userData} key={singleBand.bandname}/>
        })}
        {bandFollowingData.map((singleBand) => {
          return <SingleBandNav singleBand={singleBand} userData={userData} key={singleBand.bandname}/>
        })}
      </div>
    </div>

  );
}

const mapStateToProps = function(state, props) {
  return {
    bandFollowingData: state.bandFollowingData,
    bandJoinedData: state.bandJoinedData,
    userData: state.userData
  }
}

export default connect(mapStateToProps, null)(BandNav);