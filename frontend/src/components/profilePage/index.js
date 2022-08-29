import React from 'react';
import {connect} from "react-redux"
import TimeLine from "./timeline.js"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from "axios"
import Repos from "./repos.js"

const ProfilePage = function(props) {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedSong, setSelectedSong] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [open_create, setOpen_create] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen_create = () => setOpen_create(true);
  const handleClose_create = () => setOpen_create(false);
  var genre = []
  var genreStr = ''
  for (var i = 0; i < props.category.length; i++) {
    genre.push(<text className="tag-label">{props.category[i]}</text>)
    genre.push(<text >{" "}</text>)
    genreStr += props.category[i]
    if (i< props.category.length-1) {
      genreStr += ','
    }
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '55%',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 20,
    p: 4,
    'overflow': "auto"
  };

  const editUserInfo = (event) => {
    event.preventDefault()
    const category = event.target.genre.value.split(',')
    var obj = {
      username: props.username,
      bio: event.target.bio.value,
      category: category
    }
    console.log("*****",obj)
    axios({
      method: "put",
      data: obj,
      withCredentials: true,
      url: 'http://localhost:3005/account/editUser'})
    .then((res) => {props.dispatch({type:'updateBasicInfo', bio: obj.bio, genre: obj.category });console.log(res)})
  }
  const uploadPhoto = () => {
    let photo= new FormData();
    photo.append("file", selectedImage);
    photo.append("upload_preset", "ls3v7qcx");
    console.log(photo)
    axios.post("https://api.cloudinary.com/v1_1/kylesh/upload", photo)
      .then((res) => {
        console.log(res.data.url)
        axios.put("http://localhost:3005/account/editUser",{username: props.username, avatar:res.data.url}).then(()=>{props.dispatch({type:"updateAvatar", avatar:res.data.url})}).catch((err)=>{console.log(err)})

      }).catch((err)=>(console.log("err",err)))
  }
  const addNewUpload = (event) => {
    event.preventDefault()

    let song= new FormData();
    song.append("file", selectedSong);
    song.append("upload_preset", "ls3v7qcx");
    console.log(song)


    axios.post("https://api.cloudinary.com/v1_1/kylesh/upload", song)
      .then((res) => {
        console.log(".....",res.data.url)
        axios.post("http://localhost:3005/account/uploads",
        {
          user: props.username,
          musicName: event.target.reponame.value,
          version_history:[{version_name: event.target.version.value, description: event.target.description.value, url: res.data.url, likes:0,createdAt: Date()}],

          username: props.username})
          .then(()=>{props.dispatch({type:"updateRepo", new:{
            musicName: event.target.reponame.value,
            version_history:[{version_name: event.target.version.value, description: event.target.description.value, url: res.data.url, likes:0,createdAt: Date()}]}})}).catch((err)=>{console.log(err)})

      }).catch((err)=>(console.log("err",err)))
  }



  return (
    <div className="profile-container">
      <div className="profile-box">
        <div className="profile-intro">
          <div classname="profile-avatar-container">
          <div class="inlay-circle"><img className="profile-avatar" src={props.avatar} alt="avatar"/></div>

          </div>

          <div className="name-genre-motto">
            <text className="username">{props.username}</text>
            <text className="motto">🎵 {props.motto}</text>
            {/* <text className="category"><text style={{"color":"green"}}>Genre</text> {props.category}</text> */}
          </div>
        </div>
        <div className="profile-modules">
          <div className="module-row1">
            <div className="module module1">
              <div className="moduleName">Statistics</div>
              <div className="moduleContent">
                <div><text style={{"font-size": "3rem", "color": "rgb(244, 168, 154)"}}>{props.followedby.length}</text> <text style={{"font-size": "1rem", "color": "rgb(244, 168, 154)"}}>followers</text></div>
                <div><text style={{"font-size": "3rem", "color": "rgb(244, 168, 154)"}}>{props.following.length}</text> <text style={{"font-size": "1rem", "color": "rgb(244, 168, 154)"}}>following</text></div>
                <div><text style={{"font-size": "3rem", "color": "rgb(244, 168, 154)"}}>{props.uploads.length}</text> <text style={{"font-size": "1rem", "color": "rgb(244, 168, 154)"}}> uploads </text></div>

              </div>

            </div>
            {/* <div className="module module2">module2</div> */}
            <div className="module module3">
              <div className="moduleName">Basic Info <span onClick={handleOpen}> ✏️</span></div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>

                  <h2>
                    Edit Basic Info
                  </h2>
                  <div className="modal-box">
                    <form className="signupInputfield" onSubmit={editUserInfo}>
                      <label className="signuplabel" htmlfor="username">Username</label>
                      <input className="inputbox" name='username' defaultValue={props.username}></input>
                      <label className="signuplabel" htmlfor="bio" >Bio</label>
                      <input className="inputbox" name='bio' defaultValue={props.motto}></input>
                      <label className="signuplabel" htmlfor="genre" >Genre</label>
                      <input className="inputbox" name='genre' defaultValue={genreStr}></input>
                      <div className="signupbtnGroup">
                        <button className="login-login">Confirm</button>
                      </div>
                    </form>
                  </div>

                </Box>
              </Modal>
              <div className="moduleContent1">
              <div><text style={{"font-size": "1rem", "color": "black", "padding-left": "20px"}}>
                Username: {props.username}
              </text></div>
              <div><text style={{"font-size": "1rem", "color": "black", "padding-left": "20px","display": "flex","flex-direction":"row"}}>
                Avatar:
                <button onClick={uploadPhoto}>Upload</button>
                <input
                  type="file"
                  name="myImage"
                  onChange={(event) => {
                    console.log("selected a file here",event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                  }}
                />

              </text></div>
              <div><text style={{"font-size": "1rem", "color": "black", "padding-left": "20px"}}>
                Bio: {props.motto}
              </text></div>
              <div><text style={{"font-size": "1rem", "color": "black", "padding-left": "20px"}}>
                Genre: {genre}
              </text></div>


              </div>
            </div>
          </div>
          <div className="module-row2">
            <div className="module module4" onClick={(event)=>{props.dispatch({type:"switchView",view:"SearchPage"})}}>
              <div className="moduleName" >Explore</div>
            </div>
            <div className="module module5" onClick={(event)=>{props.dispatch({type:"switchView",view:"BandPage"})}}>
              <div className="moduleName">My Band</div>
            </div>
            <div className="module module6"  onClick={(event)=>{props.dispatch({type:"switchView",view:"MusicPage"})}}>
              <div className="moduleName">Playlist</div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar">
        <div className="sidebar-module1"> <TimeLine/></div>
        <div className="sidebar-module2">
          <div className="sidebarmoduleName">Repos</div>
          <div className="sidebarmoduleContent">
            <div className="addnewrepo" onClick={handleOpen_create}>
              <div className="plussign">+</div>
              <div className="addnewrepotext">CREATE NEW
              <Modal
                open={open_create}
                onClose={handleClose_create}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>

                  <h2>
                    Create New Repo
                  </h2>
                  <div className="modal-box">
                    <form className="signupInputfield" onSubmit={addNewUpload}>
                      <label className="signuplabel" htmlfor="reponame">New Repo Name</label>
                      <input className="inputbox" name='reponame'></input>
                      <label className="signuplabel" htmlfor="version">Version</label>
                      <input className="inputbox" name='version'></input>
                      <label className="signuplabel" htmlfor="description">Description</label>
                      <input className="inputbox" name='description'></input>
                      <label className="signuplabel" htmlfor="music">Upload</label>
                      <input
                          type="file"
                          name="music"
                          onChange={(event) => {
                            console.log("selected a file here",event.target.files[0]);
                            setSelectedSong(event.target.files[0]);
                          }}
                        />
                      <div className="signupbtnGroup">
                        <button className="login-login">Create</button>
                      </div>
                    </form>
                  </div>

                </Box>
              </Modal>
              </div>
            </div>
            <Repos/>

          </div>
        </div>
      </div>
      {/* <div className="profile">Profile</div> */}

    </div>

  );
}

  const mapStateToProps = function(state, props) {
    console.log(state)
    return {
      avatar: state.avatar,
      username: state.currUser,
      motto: state.bio,
      category: state.category,
      followedby: state.follwedby,
      following: state.following,
      likes: state.likes,
      uploads: state.uploads
    }
  }

  export default connect(mapStateToProps, null)(ProfilePage);