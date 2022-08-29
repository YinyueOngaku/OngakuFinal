import React, {useEffect, useState} from 'react';
import {connect, useSelector, useDispatch} from "react-redux"
import axios from 'axios';
import RandomBand from './RandomBand';
import RandomUser from './RandomUser';
import RandomMusic from './RandomMusic';
import SearchBar from './SearchBar';
const SearchPage = function({allUser, allBand, allMusic}) {
  const [disPlayBand, setDisplayBand] = useState([])
  const [disPlayUser, setDisplayUser] = useState([])
  const [disPlayMusic, setDisplayMusic] = useState([])

  const dispatch = useDispatch()


  useEffect(() => {
    if (allUser.length === 0) {

      axios.get(`http://localhost:3005/account/getallUser`)
      .then((res) => {
        var collectAllUser = {
          type: "collectAllUser",
          allUser: res.data
        }
        dispatch(collectAllUser)

        const userMusics = res.data.map((singleUser) => {
          return singleUser.uploads
        })
        var addMusic = {
          type: "addMusic",
          allMusic: userMusics
        }
        dispatch(addMusic)

      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      setDisplayUser(allUser.slice(0,4))
      setDisplayMusic(allMusic.slice(0,4))
    }

    if (allBand.length === 0) {
      axios.get(`http://localhost:3005/band`)
      .then((res) => {

        var collectAllBand = {
          type: "collectAllBand",
          allBand: res.data
        }
        dispatch(collectAllBand)


        const bandMusics = res.data.map((singleBand) => {
          return singleBand.uploads
        })
        var addMusic = {
          type: "addMusic",
          allMusic: bandMusics
        }
        dispatch(addMusic)

        })
      .catch((err) => {
        console.log(err)
      })


    } else {
      setDisplayBand(allBand.slice(0,4))
    }


  }, [])

  return (
    <div className='search-container'>
      <SearchBar setDisplayBand={setDisplayBand} setDisplayUser={setDisplayUser} setDisplayMusic={setDisplayMusic}/>
      <div className='search-random-container'>
        <RandomUser allUser={allUser}/>
        <RandomBand allBand={allBand}/>
        <RandomMusic allMusic={allMusic}/>
      </div>

    </div>

  );
}

  const mapStateToProps = function(state, props) {
    return {
      allUser: state.allUser,
      allBand: state.allBand,
      allMusic: state.allMusic

    }
  }

  export default connect(mapStateToProps, null)(SearchPage);