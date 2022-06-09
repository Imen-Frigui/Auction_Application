const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  })

let users = []  

const addUser = (userId, socketId)=>{
  !users.some(user=>user.userId === userId) &&
  users.push({userId, socketId})
}

const removeUser = (socketId)=>{
  users = users.filter(user=>user.socketId !== socketId)
}

const getUser = (userId)=>{
  return users.find(user=>user.userId === userId)
}


io.on("connection", (socket) => {
    //connsct
    console.log('a user connected')
    socket.on('addUser', userId=>{
      addUser(userId, socket.id)
      io.emit('getUsers', users)

    })

    //send_recive messg
    socket.on('sendMessage',({senderId, reciverId, text})=>{
      const user = getUser(reciverId)
      io.to(user.socketId).emit('getMessage',{
        senderId,
        text
      })

    })

    //disconnect
    socket.on('disconnect', ()=>{
      console.log('a user disconnrect')
      removeUser(socket.id)
      io.emit('getUsers', users)
    })
})