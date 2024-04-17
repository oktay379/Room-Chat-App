import React, { useEffect, useState } from 'react'

const Chat = ({socket, username, room}) => {

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on('messageReturn', (data) => {
      setMessageList((prev) => [...prev, data])
    })
  }, [socket])


  const sendMessage = async () => {
    const messageContent = {
      username: username,
      message: message,
      room: room,
      date: (new Date(Date.now)).getHours() + ':' + (new Date(Date.now)).getMinutes()
    }
    
    await socket.emit("message", messageContent);
    setMessageList((prev) => [...prev, messageContent])

    setMessage("");
  }
  
  console.log(messageList);

  return (
    <div className='flex items-center justify-center h-full bg-gray-500'>
        <div className='w-2/3 h-[600px] bg-white relative'>  
            <div className='w-full h-16 bg-gray-700'></div> 
            <div className='w-full h-[400px] overflow-y-auto'>
              {
                messageList && messageList.map((msg, i) => (
                  <div key={i}>
                  <div className={`${username === msg.username ? 'flex justify-end' : ''}`}>
                    <div className={`${username === msg.username ? 'bg-green-600' : 'bg-blue-600'} w-2/3 h-12 p-2 text-white m-2 rounded-xl rounded-br-none`}>
                      <div>{msg.message}</div>
                      <div className='text-xm justify-end w-full flex' >{msg.username}</div>
                    </div>
                  </div> 
                  </div>
                ))
              }
            </div>
            <div className='absolute bottom-0 left-0 w-full'>
                <input value={message} onChange={e => setMessage(e.target.value)} className='w-3/4' type="text" placeholder='Message...'/>
                <button onClick={sendMessage} className='w-1/4'>Send</button>
            </div>
        </div>
    </div>
  )
}

export default Chat