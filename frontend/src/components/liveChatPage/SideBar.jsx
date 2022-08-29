import React, {useEffect} from 'react';
import axios from 'axios';


var SingleSideBar = function({singleRoom, setCurrentRoom, setRoomChange, currentRoom}) {

  var switchRoom = function(e) {
    e.preventDefault();
    setCurrentRoom(singleRoom)
    setRoomChange(true)
  }

  return (
    <>
      <div onClick = {switchRoom} className={currentRoom===singleRoom? 'chat-sideBar-single-container-chosen':'chat-sideBar-single-container'}>
        <div className='chat-sideBar-font'>{singleRoom}</div>
      </div>
      <div className='chat-sideBar-divider'/>
    </>

  )
}


var SideBar = function({username, chatroom, setCurrentRoom, setRoomChange, currentRoom}) {

  var fetchChat = function() {
    axios({
      method: "get",
      withCredentials: true,
      url: 'http://localhost:3005/account/getUser'
    })
    .then((res) => {
      // console.log(res)
    })
  }

  useEffect(() => {
    fetchChat()
  },[])


  return (
    <div className='chat-sideBar-container'>
      {chatroom && chatroom.map((singleRoom) => {
        return <SingleSideBar key={singleRoom} singleRoom={singleRoom} setCurrentRoom={setCurrentRoom} setRoomChange={setRoomChange} currentRoom={currentRoom}/>
      })}
    </div>
  )

}

export default SideBar