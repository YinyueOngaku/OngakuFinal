import React, {useState, useEffect} from 'react';
import SideBar from './SideBar.jsx';
import axios from 'axios';
import {ChatBox} from './ChatBox.jsx';

var LiveChatPage = function({user}) {
  const [chatroom, setChatroom] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('');
  const [whetherRoomChange, setRoomChange] = useState(true)
  const [storeMessage, setStoreMessage] = useState([]);

  var fetchChatName = function() {
    axios({
      method: "get",
      withCredentials: true,
      url: 'http://localhost:3005/account/getUser'
    })
    .then((res) => {
      console.log('chat',res)
      setChatroom(res.data.chatroom)
      if (res.data.chatroom.length > 0) {
        setCurrentRoom(res.data.chatroom[0])
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }


  useEffect(() => {
    fetchChatName()
  },[user])


  return (
    <>
      <div className='chat-container'>
        <SideBar username={user} chatroom = {chatroom} setCurrentRoom={setCurrentRoom} setRoomChange={setRoomChange} currentRoom={currentRoom}/>
        <div className='chat-divide-line'></div>
        <ChatBox username={user} currentRoom={currentRoom} whetherRoomChange={whetherRoomChange} setRoomChange={setRoomChange} storeMessage = {storeMessage} setStoreMessage={setStoreMessage}/>
      </div>
    </>

  )

}

export default LiveChatPage