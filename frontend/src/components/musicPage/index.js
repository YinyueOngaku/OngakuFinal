import React from 'react';
import {connect, useSelector, useDispatch} from "react-redux"
import {IoIosPlay, IoMdPause,IoMdSkipBackward, IoMdSkipForward} from "react-icons/io"
import PlayListItem from "./playlistitem.js"
class MusicPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currMusic: this.props.song, paused: true, percentage: 0, duration: 0, time: 0}
  }

  componentDidMount() {
    // let audio = this.refs.audio
    // this.setState({duration: audio.duration})
  }



  componentWillReceiveProps(nextProps) {
    let audio = this.refs.audio
    if (this.props !== nextProps) {
      this.setState({currMusic: nextProps.song, duration: audio.duration}, ()=>{this.playmusic()})
    }
  }

  playmusic = () => {
    this.pausemusic()
    console.log("*** play music 0")
    let music = this.refs.audio
    this.setState({paused: false, duration: music.duration})
    music.play()
  }
  pausemusic = () => {
    console.log("*** pause music")
    let music = this.refs.audio
    this.setState({paused: true, time: music.currentTime, duration: music.duration})
    music.pause()
  }
  prevmusic = () => {
    console.log("prevmusic")
    this.props.dispatch({type: "prevSong"})

  }
  nextmusic = () => {

    this.props.dispatch({type: "nextSong"})

  }


updateTime = () => {
    let music = this.refs.audio
    var percentage = music.currentTime/music.duration*100;
    let timebar = this.refs.timebar
    timebar.value = percentage;
    this.setState({time: music.currentTime})

  }

  setTime = (event) => {
    console.log(event.target.value)
    let music = this.refs.audio;
    let timebar = this.refs.timebar
    timebar.value = event.target.value;

    music.currentTime = event.target.value * music.duration/100;
    this.playmusic()
  }

  setStateTime = (event) => {
    let music = this.refs.audio
    this.setState({time:  event.target.value * music.duration/100})
  }
  updateDuration = () => {
    let music = this.refs.audio
    this.setState({duration: music.duration})
  }
  render() {
    // console.log(this.state.percentage)
    var playOrpause = []
    if (this.state.paused) {
      playOrpause.push(<button className="player-button play-pause" onClick={this.playmusic}><IoIosPlay/></button>)
    } else {
      playOrpause.push(<button className="player-button play-pause" onClick={this.pausemusic}><IoMdPause/></button>)
    }
    var totaltime = (this.state.duration ? new Date(this.state.duration*1000).toISOString().slice(14,19) : new Date(0).toISOString().slice(14,19) || 0)

    var playQ = []

    for (var i = 0; i < this.props.playlist.length; i++) {
      playQ.push(<PlayListItem song={this.props.playlist[i]}/>)
    }
    return (

          <div className="music-container" >
            <div className="player-box">
              <div className="avatar-song-singer">
                <img className="playerbackground" src={require('./1.jpg')} alt="background"/>
                <div className="player-avatar"><img className="player-avatar-img" src={require('./3.jpg')} alt="coverimg"/></div>
                <div className="player-song">{this.props.song.musicName}</div>
                <div className="player-singer">{this.props.song.artist}</div>
              </div>
              <div className="song-timebar">
                <div className="time-sofar">{new Date(this.state.time*1000).toISOString().slice(14,19)}</div>
                <div className="bar">
                  <div className="input-range">
                    <input type="range" ref="timebar" onMouseDown={this.pausemusic} onMouseMove= {this.setStateTime} onMouseUp={this.setTime} className="input-range__slider" min="0" max="100" step="1" defaultValue={this.state.percentage}/>
                  </div>
                </div>
                <div className="time-total">{totaltime}</div>
              </div>
              <div className="player-controller">
                <button className="player-button"  onClick={this.prevmusic} onMouseMove={this.updateDuration}><IoMdSkipBackward/></button>
                {playOrpause}
                <button className="player-button" onClick={this.nextmusic} onMouseMove={this.updateDuration}><IoMdSkipForward/></button>

              </div>

            </div>
            <div className='playlist-box' onMouseMove={this.updateDuration}>
              <div className="playqueue">Play Queue</div>
              {playQ}
            </div>
            <div style={{"display":"none"}}>
              <audio src={this.state.currMusic.url} preload ref="audio" id="hiddenplayer" controls onEnded={this.nextmusic} onTimeUpdate={this.updateTime}/>
            </div>
          </div>



    );
  }
}

  const mapStateToProps = function(state, props) {
    return {
      avatar: state.avatar,
      username: state.currUser,
      motto: state.bio,
      category: state.category,
      song: state.currSong,
      playlist: state.playlist
    }
  }

  export default connect(mapStateToProps, null)(MusicPage);