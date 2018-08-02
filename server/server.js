const path=require('path')
const publicPath=path.join(__dirname,'../public')
const express=require('express')
const socket=require('socket.io')
const http=require('http')
const {generateMessage,generateLocationMessage}=require('./utils/message')
const {isRealString}=require('./utils/validation')
const {Users}=require('./utils/users')

const users=new Users()

// for heroku
const port=process.env.PORT || 3000

const app=express()
const server=http.createServer(app)
const io=socket(server)
app.use(express.static(publicPath))
io.on('connection',(socket)=>{
    console.log('User connected')

    socket.on('createMessage',(newMsgData,callback)=>{
        const user=users.getUser(socket.id)
        if(user && isRealString(newMsgData.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,newMsgData.text))
        }
        callback()
        
    })
    socket.on('createLocationMessage',(coords)=>{
        const user=users.getUser(socket.id)
        if(user){
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.lat, coords.long))}
    })

    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('name and room name are required')
        }
        socket.join(params.room)

        users.removeUser(socket.id)
        users.addUser(socket.id,params.name,params.room)
        io.to(params.room).emit('updateUserList', users.getUsersList(params.room))

        socket.emit('newMessage',generateMessage('Server','welcome to the chat!'))
        socket.broadcast.to(params.room).emit('newMessage',generateMessage(`${params.name} has joined!`))

        callback()
    })

    socket.on('disconnect',()=>{
        const user=users.removeUser(socket.id)

        if(user){
            io.to(user.room).emit('updateUserList',users.getUsersList(user.room))
            io.to(user.room).emit('newMessage',generateMessage('server',`${user.name} has left the room..`))

        }
    })
    
})

server.listen(port,()=>{
    console.log(`Server up on port ${port}...`)
})

