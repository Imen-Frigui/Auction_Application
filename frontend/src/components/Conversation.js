import { useEffect, useState } from "react";
import "../index.css"
import axios from "axios";

const Conversation=  ({ conversation, currentUser }) => {

  const [user, setUser] = useState('') 

  useEffect(()=>{
    const friendId = conversation.members.find((m) =>m !== currentUser._id )

    const getUser = async ()=>{
      try{
        const res = await axios.get(`/api/users/profile/${friendId}`)
        setUser(res.data)
      }catch(err){
        console.log(err)
      }

    }
    getUser()
 
  },[currentUser, conversation])
 
  
    return (
      <div className="conversation">
          <i className="fa fa-user" aria-hidden="true"/>&nbsp;
        <span className="conversationName">{user?.name}</span>
      </div>
    );
  }

  export default Conversation