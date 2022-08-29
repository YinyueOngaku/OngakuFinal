import React from 'react';
import {connect} from "react-redux"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios'
const Repos = function(props) {
  var addRepoToPlaylist = (name) => {
    var action = {
      type: "addToPlaylist",
      repoName: name,
      user: props.username

    }
    props.dispatch(action)
  }

  var deleteRepo = (name) => {
    var action = {
      type: "deleteRepo",
      repoName: name

    }
    props.dispatch(action)

  }
  var [selectedSong, setSelectedSong] = React.useState(null)
  var [currMusic, setCurrMusic] = React.useState()
  var [open, setOpen] = React.useState(false)
  var handleOpen = (music) => {setCurrMusic(music); setOpen(true)}
  var handleClose = () => {setOpen(false)}

  var uploadVersion = (event) => {
    event.preventDefault()

    let song= new FormData();
    song.append("file", selectedSong);
    song.append("upload_preset", "ls3v7qcx");
    console.log(song)


    axios.post("https://api.cloudinary.com/v1_1/kylesh/upload", song)
      .then((res) => {
        console.log(".....",res.data.url)
        axios.post("http://localhost:3005/account/version",
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

  var generateOneRepo = (music, index) => {
    return (
    <div className="onerepo">
      <div className="onerepo-img">{index+1}</div>
      <div className='onerepo-content'>
        {music.musicName}
      </div>
      <div className="onerepo-buttons">
        <div className="onerepo-addtoplaylist" onClick={()=>{addRepoToPlaylist(music.musicName)}}>☊ <span className="repo-tooltip">Listen</span></div>
        <div className="onerepo-versioncontroll" onClick={()=>{handleOpen(music)}}>✎<span className="repo-tooltip">Edit</span></div>
        <div className="onerepo-delete" onClick={()=>{deleteRepo(music.musicName)}}>✘ <span className="repo-tooltip">Remove</span></div>
      </div>
    </div>

    )
  }

  var generateRepos = () => {
    var result = []
    for (var i = 0; i < props.repos.length; i++) {
      result.push(generateOneRepo(props.repos[i], i))
    }
    return result
  }

  var generateModal = () => {
    if (!currMusic) {
      return <></>
    }
    var historyVersionTable = []
    var currVersionTable = []

    currVersionTable.push(
      <tr>
        <td>{currMusic.version_history[currMusic.version_history.length-1].version_name}</td>
        <td>{currMusic.version_history[currMusic.version_history.length-1].description}</td>
        <td>{currMusic.version_history[currMusic.version_history.length-1].createdAt}</td>
        <td> <a href={currMusic.version_history[currMusic.version_history.length-1].url}>Download</a></td>
      </tr>)

    for (var i = 0; i < currMusic.version_history.length-1; i++) {
      console.log("generate One Repo", currMusic.version_history[i].version_name)
      historyVersionTable.push(
          <tr>
            <td>{currMusic.version_history[i].version_name}</td>
            <td>{currMusic.version_history[i].description}</td>
            <td>{currMusic.version_history[i].createdAt}</td>
            <td> <a href={currMusic.version_history[i].url}>Download</a></td>
          </tr>)
    }

    return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h2>
                    Version Control Editor
                  </h2>
                  <h3>
                    Current Version
                  </h3>
                  <table>
                  <tr>
                    <th>Version</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Link</th>
                  </tr>
                  {currVersionTable}

                  </table>
                  <h3>
                    History Version
                  </h3>
                  <table>
                  <tr>
                    <th>Version</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Link</th>
                  </tr>
                  {historyVersionTable}

                  </table>

                  <h3>
                    Upload New Version
                  </h3>
                  <form className="signupInputfield" onSubmit={()=>{uploadVersion()}}>
                      <label className="signuplabel" htmlfor="version">Version</label>
                      <input className="inputbox" name='version'></input>
                      <label className="signuplabel" htmlfor="description">Description</label>
                      <input className="inputbox" name='description'></input>
                      <div style={{"display":"flex", "flex-direction":"column"}}>
                        <label className="signuplabel" htmlfor="music">Upload</label>
                        <input
                            type="file"
                            name="music"
                            onChange={(event) => {
                              console.log("selected a file here",event.target.files[0]);
                              setSelectedSong(event.target.files[0]);
                            }}
                          />
                      </div>

                      <div className="signupbtnGroup">
                        <button className="login-login">Upload</button>
                      </div>
                  </form>

                </Box>
              </Modal>)
  }

  var allRepos = generateRepos()
  var editor = generateModal()




  return (
      <div className="existingrepos">
        {allRepos}
        {editor}
      </div>

  );
}

  const mapStateToProps = function(state, props) {
    return {
      repos: state.uploads,
      username: state.currUser

    }
  }

  export default connect(mapStateToProps, null)(Repos);


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
