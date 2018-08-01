const path=require('path')
const publicPath=path.join(__dirname,'../public')
const express=require('express')
const socket=require('socket.io')
const http=require('http')
const {generateMessage,generateLocationMessage}=require('./utils/message')
const {isRealString}=require('./utils/validation')


// for heroku
const port=process.env.PORT || 3000

const app=express()
const server=http.createServer(app)
const io=socket(server)
app.use(express.static(publicPath))
io.on('connection',(socket)=>{
    console.log('User connected')
    socket.emit('newMessage',generateMessage('admin','welcome to the chat!')
        )
    socket.broadcast.emit('newMessage',generateMessage('admin','user has joined!'))


    socket.on('createMessage',(newMsgData,callback)=>{
        io.emit('newMessage',generateMessage(newMsgData.from,newMsgData.text))
        callback()
    })
    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('admin',coords.lat, coords.long))
    })
    socket.on('disconnect',()=>{
        console.log('User disconnected..')
    })
    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('name and room name are required')
        }
        callback()
    })
    
})

server.listen(port,()=>{
    console.log(`Server up on port ${port}...`)
})

