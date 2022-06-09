import React, { useEffect, useState } from 'react'
import { Table, Button, Row, Col, Image } from 'react-bootstrap'
import { Card, Body } from 'react-bootstrap'
import Conversation from '../components/Conversation'
import '../index.css'

const ChatOnline = ({onlineUsers, currentId, setCurrentChat}) => {
    const [friends, setFreinds] = useState([])
    const [onlineFriends, setOnlineFreinds] = useState([])


    //useEffect(()=>{
        //const  getFreinds = async

    //},[])



return(
<>
<div className="chatOnline">
    <div className='chatOnlineFriend'>
        <div className='chatOnlineImgContainer'>
            <i className="fa fa-user" aria-hidden="true">&nbsp;</i>&nbsp;&nbsp;
            <div className='chatOnlineBadge'>&nbsp;</div>
        </div>
        <span className='chatOnlineName'>imen frigui</span>
    </div>
</div>    
</>


)

}


export default ChatOnline