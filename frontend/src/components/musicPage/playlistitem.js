import React from 'react'
import {connect, useSelector, useDispatch} from "react-redux"
class PlayListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  playThisSong = (event) => {
    var action = {
      type: "playThisSong",
      songName: event.target.textContent
    }
    this.props.dispatch(action)


  }
 deleteThisSong = (songid) => {
    var action = {
      type: "deleteThisSong",
      songName: songid
    }
    console.log("********",songid)
    this.props.dispatch(action)

  }

  render() {
    // console.log("&*********",this.props.song.musicName===this.props.currSong.musicName,this.props.currSong.musicName)
    var styleofthis = this.props.song.musicName === this.props.currSong.musicName ? "playlistitemonair" : "playlistitem"
    var songid = this.props.song.musicName
    var ondisplay = []
    if (this.props.song.musicName === this.props.currSong.musicName) {
      ondisplay.push(<div className="ondisplay"><iframe className="musicplaying" src="https://gifer.com/embed/Z23b" width='30' height='30' frameBorder="0" allowFullScreen allowtransparency = "true"></iframe></div>)
    } else {
      ondisplay.push(<div className="ondisplay"></div>)
    }
    return (
      <div className={styleofthis} >
        <div className='basicInfo' >
          <div id={songid} style={{"font-size": "1.5rem"}} onClick={this.playThisSong}>{this.props.song.musicName}</div>
          <div style={{"font-size": "1.2rem"}}>{this.props.song.artist}</div>
        </div>
        {ondisplay}

        <div className="listitemdelete" onClick={()=> {this.deleteThisSong(songid)}}>✕</div>


      </div>
  )
  }
}

const mapStateToProps = function(state, props) {
  return {
    currSong: state.currSong
  }
}

export default connect(mapStateToProps, null)(PlayListItem);