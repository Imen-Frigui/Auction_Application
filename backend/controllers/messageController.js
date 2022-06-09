import AsyncHandler from 'express-async-handler'
import Message from '../models/messageModel.js'



//add message
const newMessage = AsyncHandler(async(req, res) => {
    const newMessage = new Message(req.body)
    if(newMessage){
        const savedMessage = await newMessage.save()
        res.json(savedMessage)
    }else{
        res.status(500)
        throw new Error
    }
})

//get message
const getMessage = AsyncHandler(async(req, res) => {
    const messages = await Message.find({
        conversationId: req.params.conversationId,
    })
    if(messages){
        res.json(messages)
    }else{
        res.status(500)
        throw new Error
    }
})

export{newMessage, getMessage}