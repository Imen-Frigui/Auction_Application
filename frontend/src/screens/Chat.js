import React, {useState, useEffect, useRef} from 'react'
import {  useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import ChatMessage from '../components/ChatMessage'
import ChatOnline from '../components/ChatOnline'
import Conversation from '../components/Conversation'
import '../index.css'
import axios from 'axios'
import {io} from 'socket.io-client' 


const Chat = () => {

const [conversation, setConversation] = useState([])
const [currentChat, setCurrentChat] = useState('')
const [messages, setMessages] = useState([])
const [newMessage, setNewMessage] = useState('')
const [arrivalMessage, setArrivalMessage] = useState(null)
const [onlineUsers, setOnlineUsers] = useState([])



const socket = useRef()

const scrollRef = useRef()

const userLogin = useSelector(state => state.userLogin )
const {userInfo} = userLogin

useEffect(()=>{
    socket.current = io("ws://localhost:8900")
    socket.current.on('getMessage', data =>{
        setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now()
        })

        
    })
},[])

useEffect(()=>{
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages((prev) =>[...prev, arrivalMessage])


},[arrivalMessage, currentChat])

useEffect(()=>{
    socket.current.emit('addUser', userInfo._id)
    socket.current.on('getUsers', users=>{
        setOnlineUsers(users)
    })
},[userInfo])




useEffect(() => {
    const getConversations = async ()=> {
        try{
            const res = await axios.get(`/api/conversation/${userInfo._id}`)
            setConversation(res.data)
        }catch(err){
            console.log(err)
        }
    }
    getConversations()
},[userInfo])

useEffect(()=>{
    const getMessages = async ()=>{
        try{
            const res = await axios.get(`/api/message/${currentChat._id}`)
            setMessages(res.data)
        }catch(err){
            console.log(err)
        }
    }
    getMessages()
},[currentChat])

const handleSubmit = async(e)=>{
    e.preventDefault()
    const message = {
        sender: userInfo._id,
        text: newMessage,
        conversationId: currentChat._id
    }

    const reciverId = currentChat.members.find(member=> member !==userInfo._id)

    socket.current.emit('sendMessage', {
        senderId: userInfo._id,
        reciverId,
        text: newMessage,
    })

    try{
        const res = await axios.post('/api/message', message)
        setMessages([...messages, res.data])
        setNewMessage('')

    }catch(err){
        console.log(err)
    }
}


useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavio: 'smooth'})

},[messages])



return(
<>
    <div className='chat'>
        <div className='chatMenu'>
            <div className='chatMenuWarrper'>
                <input placeholder='search for user' className='chatMenuInput' />
            </div>
            {conversation.map(c => (
                <div key={c._id} onClick={()=>setCurrentChat(c)}>
                    <Conversation conversation={c} currentUser={userInfo}/>
                </div>

            )
            )}


        </div>
        <div className='chatBox'>
            <div className='chatBoxWarrper'>
                {
                    currentChat ?
                <>
                <div className='chatBoxTop'>
                    {messages.map(m=>(
                        <div ref={scrollRef}>
                            <ChatMessage message={m} own={m.sender === userInfo._id} />
                        </div>

                    ))}
          
                </div>
                <div className='chatBoxBottom'>     
                    <textarea className='chatMessage' placeholder='write your message ...' onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} cols='50' rows='3'></textarea>
                    <Button onClick={handleSubmit}>Send</Button>
                </div> </> : <span className='noConversationText'>Open a Conversation to start Chating</span> }
            </div>
        </div>
        <div className='chatOnline'>            
            <div className='chatOnlineWarrper'>
                <ChatOnline onlineUsers={onlineUsers} currentId={userInfo._id} setCurrentChat={setCurrentChat}/>
            </div>
        </div>
    </div>
</>


)

}


export default Chat