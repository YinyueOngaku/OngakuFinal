import React, {useEffect, useState} from 'react';
import {connect, useSelector, useDispatch} from "react-redux"
import axios from 'axios';
import BandNav from './BandNav';
import BandDetail from './BandDetail';
import NewBand from './NewBand'



const SelectedArrow = function() {

  return (
    <div className='selectedArrow-container'>

    </div>
  )
}


const BandPage = function({bandData, username}) {
  const [openNewBand, setOpenNewBand] = useState(false)

  const dispatch =useDispatch();

  useEffect(() => {
    if (Object.keys(bandData).length === 0) {

      axios.get(`http://localhost:3005/band/fetch/${username}`)
      .then((res) => {
        var bandSelecting;
        if (res.data.involvedJoinedBandInfo.length > 0) {
          bandSelecting = res.data.involvedJoinedBandInfo[0]
        } else if (res.data.involvedFollowingBandInfo.length > 0) {
          bandSelecting = res.data.involvedFollowingBandInfo[0]
        } else {
          bandSelecting = {};
        }

        var initializeBand = {
          type: "initializeBand",
          bandJoinedData: res.data.involvedJoinedBandInfo,
          bandFollowingData: res.data.involvedFollowingBandInfo,
          bandSelecting
        }
        dispatch(initializeBand)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },[])


  return (
    <div className='band-container'>
      {openNewBand && <NewBand setOpenNewBand={setOpenNewBand}/>}
      <BandNav setOpenNewBand={setOpenNewBand}/>
      <BandDetail/>
    </div>

  );
}

  const mapStateToProps = function(state, props) {
    return {
      bandData: state.bandData,
      username: state.currUser
    }
  }

  export default connect(mapStateToProps, null)(BandPage);