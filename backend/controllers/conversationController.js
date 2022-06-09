import AsyncHandler from 'express-async-handler'
import Conversation from '../models/conversationModel.js'

//new conversation
const newConversation = AsyncHandler(async(req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.reciverId ],
    })
    if(newConversation){
        const savedConversation = await newConversation.save()
        res.json(savedConversation)
    }else{  
        res.status(500)
        throw new Error
    }
})

//get conv of user
const getConversation = AsyncHandler(async(req, res) => {
    const conversation = await Conversation.find({
        members: { $in:[req.params.userId]},
    })
    if(conversation){
        res.json(conversation)
    }else{
        res.status(500)
        throw new Error
    }
})


export {newConversation, getConversation}