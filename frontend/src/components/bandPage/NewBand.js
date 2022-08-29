import React, {useState} from 'react';
import {connect, useSelector, useDispatch} from "react-redux"
import axios from 'axios';

const InputAvatar = function({avatar, setAvatar}) {
  const [inputPhoto, setInputPhoto] = useState('')

  const upload = function(file) {
    const photoData = new FormData();
    photoData.append('file', file[0]);
    photoData.append('upload_preset', 'efm30u0x');
    axios.post('https://api.cloudinary.com/v1_1/dhst87v9a/image/upload', photoData)
        .then((res) => {
          setAvatar(`https://res.cloudinary.com/dhst87v9a/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1657832797/${res.data.public_id}.jpg`);
        });


  };


  return (
    <div className='band-newBand-avatar-container'>
      <div className='band-newBand-avatar-title'>New Band Photo:</div>
      <label htmlFor="formFile">
        <input type='file' onChange={(e) => {upload(e.target.files)}} className="form-control" id="formFile"></input>
      </label>

      {avatar.length > 0 && <img className = 'band-newBand-avatar-thumbnail' src={avatar} alt='not found'/>}

    </div>
  )
}

const InputBandname = function({setBandname}) {
  return (
    <div className='band-newBand-name-container'>
      <div className='band-newBand-name-title'>New Band Name:</div>
      <input onChange={(e) => {setBandname(e.target.value)}}></input>
    </div>
  )
}

const InputBio = function({setBio}) {
  return (
    <div className='band-newBand-bio-container'>
      <div className='band-newBand-bio-title'>Intro Of The New Band:</div>
      <input onChange={(e) => {setBio(e.target.value)}}></input>

    </div>
  )
}

const InputCategory = function({setCategory, category}) {
  const [currentInput, setCurrentInput] = useState('')

  var handleChange = function(e) {
    setCurrentInput(e.targetValue)
    // setCategory(e.target.value);
  }

  var handleEnter = function(e) {
    if (e.key === 'Enter') {
      setCategory([...category, e.target.value])
      setCurrentInput('')
    }
  }

  return (
    <div className='band-newBand-category-container'>
      <div className='band-newBand-category-title' >Category (press enter/return to add multiple tags):</div>
      <input value={currentInput} onChange={(e) => {handleChange(e)}} onKeyDown={(e) => {handleEnter(e)}}></input>
      <div className='band-newBand-category-tag-container'>
        {category.map((singleCategory) => {
          return <div className='band-newBand-category-tag'>{singleCategory}</div>
        })}
      </div>
    </div>
  )
}

const InputMember = function({setMember, member}) {

  const [currentInput, setCurrentInput] = useState('')

  var handleChange = function(e) {
    setCurrentInput(e.targetValue)

  }

  var handleEnter = function(e) {
    if (e.key === 'Enter') {
      setMember([...member, e.target.value])
      setCurrentInput('')
    }
  }

  return (
    <div className='band-newBand-member-container'>
      <div className='band-newBand-member-title' >Member (press enter/return to add multiple members):</div>
      <input value={currentInput} onChange={(e) => {handleChange(e)}} onKeyDown={(e) => {handleEnter(e)}}></input>
      <div className='band-newBand-member-tag-container'>
        {member.map((singleCategory) => {
          return <div className='band-newBand-member-tag'>{singleCategory}</div>
        })}
      </div>
    </div>
  )
}


const NewBand = function({userData, bandJoinedData,setOpenNewBand}) {
  const [avatar, setAvatar] = useState('')
  const [bandname, setBandname] = useState('')
  const [bio, setBio] = useState('')
  const [category, setCategory] = useState([])
  const [member, setMember] = useState([])

  var createBand = function(e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:3005/band/',
      data :
      {
        bandname: bandname,
        bio:  bio,
        avatar: avatar,
        category: category,
        followedby: [],
        uploads: [],
        timeline: {
          time: (new Date()).toString().slice(0,24),
          action: "Started the new band",
          involvedName: bandname
        },
        memberof: member
      }
     })


  }
  return (
    <>
      <div className='modal-overlay'></div>

      <div className='band-newBand-container'>
        <button className='band-newBand-close' onClick={() => {setOpenNewBand(false)}}>close</button>
        {/* <div className='band-newBand-title'>Create A Band</div> */}
        <div className='band-newBand-input-container'>
          <InputAvatar avatar={avatar} setAvatar={setAvatar}/>
          <InputBandname setBandname={setBandname}/>
          <InputBio setBio={setBio}/>
          <InputCategory setCategory={setCategory} category={category}/>
          <InputMember setMember={setMember} member={member}/>
        </div>
        <button className='band-newBand-submit' onClick={createBand}>submit</button>
      </div>
    </>

  )
}


const mapStateToProps = function(state, props) {
  return {
    bandFollowingData: state.bandFollowingData,
    bandJoinedData: state.bandJoinedData,
    userData: state.userData
  }
}

export default connect(mapStateToProps, null)(NewBand);