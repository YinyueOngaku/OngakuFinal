import React from 'react';
import {useRef} from 'react';
import {connect} from "react-redux"
import {IoMdPlayCircle, IoMdPause,IoMdSkipBackward, IoMdSkipForward} from "react-icons/io"

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currMusic: this.props.song, paused: true}
  }

  componentDidMount() {
    let audio = this.refs.audio
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({currMusic: nextProps.song}, ()=>{this.playmusic()})
    }
  }


  playmusic = () => {
    console.log("*** play music 0")
    let music = this.refs.audio
    this.setState({paused: false})
    music.play()
  }
  pausemusic = () => {
    console.log("*** pause music")
    let music = this.refs.audio
    this.setState({paused: true})
    music.pause()
  }
  prevmusic = () => {
    console.log("prevmusic")
    this.props.dispatch({type: "prevSong"})

  }
  nextmusic = async () => {
    this.props.dispatch({type: "nextSong"})
    // music.current.play()

  }


updateTime = () => {
    this.props.dispatch({type:"songPlayTime"})
    // console.log("timer per sec", this.props.songtime)
  }

  render() {
    var playOrpause = []
    if (this.state.paused) {
      playOrpause.push(<button className="player-button" onClick={this.playmusic}><IoMdPlayCircle/></button>)
    } else {
      playOrpause.push(<button className="player-button" onClick={this.pausemusic}><IoMdPause/></button>)
    }

    return (

          <div className="music-container">
            <div className="player-box">
              <div className="avatar-song-singer">
                <div className="player-avatar"></div>
                <div className="player-song-singer"></div>
              </div>
              <div className="song-timebar">
                <div className="time-so-far">time so far</div>
                <div className="bar">bar</div>
                <div className="time-left">total time</div>
              </div>
              <div className="player-controller">
                <button className="player-button"  onClick={this.prevmusic}><IoMdSkipBackward/></button>
                {playOrpause}
                <button className="player-button" onClick={this.nextmusic}><IoMdSkipForward/></button>

              </div>

            </div>
            <div className='playlist-box'>
            <div style={{"display":"none"}}>
              <audio src={this.state.currMusic.url} ref="audio" id="hiddenplayer" controls onEnded={this.nextmusic} onListen={this.updateTime} />
            </div>
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
    }
  }

  export default connect(mapStateToProps, null)(MusicPlayer);