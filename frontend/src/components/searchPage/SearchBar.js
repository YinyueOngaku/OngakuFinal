import React, {useState} from 'react';
import {connect, useSelector, useDispatch} from "react-redux"
import axios from 'axios';

const SearchBar = function({setDisplayMusic, setDisplayUser, setDisplayBand}) {
  const [inputSearch, setInputSearch] = useState('')

  var changeInput = function(e) {
    setInputSearch(e.target.value)
  }

  var search = function(e) {
    e.preventDefault();
    console.log('whether inputSearch is correct: ', inputSearch)
    axios.get(`http://localhost:3005/account/getUserByFilter`, {'filter': inputSearch})
    .then((res) => {
      console.log('what i got! ',res)
    })
    .catch((err) => {
      console.log(err)
    })

  }



  return (
    <div className='search-searchBar-container'>
      <input value = {inputSearch} onChange={changeInput} className='search-searchBar-input' placeholder='Search' type='text'/>
      <button className='search-searchBar-button'>SEARCH</button>
    </div>

  );
}

  const mapStateToProps = function(state, props) {
    return {
      allUser: state.allUser
    }
  }

  export default connect(mapStateToProps, null)(SearchBar);