import React from 'react'
import { Table, Button, Row, Col, Image } from 'react-bootstrap'
import { Card, Body } from 'react-bootstrap'
import Conversation from '../components/Conversation'
import '../index.css'
import { format } from 'timeago.js';
const ChatMessage = ({message,own}) => {




return(
<>
<div className={own? "message own " : "message"}>
    <div className='messageTop'>
          <i className="fa fa-user" aria-hidden="true"/>&nbsp;
        <p className="messageText ">{message.text}</p>
    </div>
    <div className='messageBottom'>{format(message.createdAt)}</div>
</div>    
</>


)

}


export default ChatMessage