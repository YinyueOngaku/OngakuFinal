import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'
import axios from 'axios'




var SingleChat = function({username, chat}) {

  return (
    <div>
      {chat.user === username && (
        <div className='chat-box-single-me'>
          <div className='chat-box-single-message-container-me'>
            <div className='chat-box-single-message'>{chat.comment}</div>
          </div>
          <div className='chat-box-single-name'>{chat.user}</div>
        </div>
        )}
      {chat.user !== username && (
        <div className='chat-box-single-others'>
          <div className='chat-box-single-name'>{chat.user}</div>
          <div className='chat-box-single-message-container-others'>
            <div className='chat-box-single-message'>{chat.comment}</div>
          </div>

        </div>
        )}
    </div>
  )
}

export function ChatBox({currentRoom, username, setRoomChange, whetherRoomChange}) {
  const [message, setMessage] = useState('');
  var [historyMessage, setHistoryMessage] = useState([]);
  const [chatItems, setChatItems] = useState([])
  const [previousRoom, setPreviousRoom] = useState('');

  var newSocket = io('http://localhost:3005', {transports: ['websocket']});

  const fetchHistoryData = async () => {
    if (currentRoom.length > 0) {
      axios({
        method: "get",
        withCredentials: true,
        url: `http://localhost:3005/chat/${currentRoom}`
      })
      .then((res) => {
        const newChat = {};
        for (var chat of res.data[0].chats) {
          newChat[chat.time] = {'user': chat.user, 'comment': chat.comment}
        }
        setHistoryMessage(newChat);
        renderSingleChat(newChat);
        setRoomChange(false)
      })
    }
  }

  const sendMessage = (e) => {
    e.preventDefault();
    newSocket.emit('send_message', {comment: message, user: username, chatroom: currentRoom});
    const sendTime = new Date().toString().slice(0,24);
    setHistoryMessage((state) => {
      var newHistoryMessage = state
      newHistoryMessage[sendTime] = {comment: message, user: username, chatroom: currentRoom}
      setHistoryMessage(newHistoryMessage);
      renderSingleChat(newHistoryMessage);
      return state;
    });

    axios({
      method: "post",
      withCredentials: true,
      data:{comment: message, user: username},
      url: `http://localhost:3005/chat/${currentRoom}`
    })
    .then((res) => {
      console.log('success posted',res)
    })
  }


  const renderSingleChat = function(chatData) {
    var newChatItems = [];
    Object.keys(chatData).forEach((chatKey) => {
      newChatItems.push(<SingleChat key={chatKey} chat={chatData[chatKey]} username={username}/>)
    })
    setChatItems(newChatItems)
  }

  useEffect(()=> {
    if (whetherRoomChange && currentRoom.length > 0) {
      if (previousRoom.length>0) {
        newSocket.emit('leave_room', previousRoom)
      }
      setPreviousRoom(currentRoom)
      fetchHistoryData();
      newSocket.emit('join_room', currentRoom)
    }

    newSocket.on('receive_message', (data) => {
      setHistoryMessage((state) => {
        var newHistoryMessage = state
        newHistoryMessage[data.time] = data
        setHistoryMessage(newHistoryMessage);
        renderSingleChat(newHistoryMessage);

        return state;
      });

    })
  }, [newSocket, currentRoom])



  return (
    <div className='chat-box-whole-container'>
      <div className='chat-box-roomname-title'>{currentRoom}</div>
      <div className='chat-box-roomname-title-content-divider'/>
      <div className='chat-box-container'>
        {chatItems}
      </div>
      <div className='chat-box-roomname-title-content-divider'/>
      <div className='chat-box-input-container'>
        <textarea className='chat-box-input-text' onChange={(e)=> {setMessage(e.target.value)}} />
        <button className='chat-box-input-button' onClick={sendMessage}>send message</button>
      </div>
    </div>


  )
}