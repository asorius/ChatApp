const path=require('path')
const publicPath=path.join(__dirname,'../public')
const express=require('express')
const socket=require('socket.io')
const http=require('http')
const {generateMessage}=require('./utils/message')

// for heroku
const port=process.env.PORT || 3000

const app=express()
const server=http.createServer(app)
const io=socket(server)
app.use(express.static(publicPath))
io.on('connection',(socket)=>{
    console.log('New user connected...')

    socket.emit('newMessage',generateMessage('admin','welcome to the chat!')
        )
    socket.broadcast.emit('newMessage',generateMessage('admin','user has joined!'))


    socket.on('createMessage',(newMsgData,callback)=>{
        console.log('new message created',newMsgData)
        io.emit('newMessage',generateMessage(newMsgData.from,newMsgData.text))
        callback('this is form the server')
    })

    socket.on('disconnect',()=>{
        console.log('User disconnected..')
    })
    
})

server.listen(port,()=>{
    console.log(`Server up on port ${port}...`)
})

