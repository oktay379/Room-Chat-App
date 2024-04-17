import React from 'react'

const Room = ({username, room, setUsername, setRoom, socket, setChatScreen}) => {

  const sendRoom = () => {
    socket.emit('room', room)
    setChatScreen(true)
  };

  return (
    <div className='h-full bg-gray-500'>
        <h1>Chat</h1>
        <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder='Username' /> <br />
        <input value={room} onChange={e => setRoom(e.target.value)} type="text" placeholder='Room' />
        <div className='cursor-pointer' onClick={sendRoom}>Chat Start</div>
    </div>
  )
}

export default Room