const path=require('path')
const publicPath=path.join(__dirname,'../public')
const express=require('express')
const socket=require('socket.io')
const http=require('http')

// for heroku
const port=process.env.PORT || 3000

const app=express()
const server=http.createServer(app)
const io=socket(server)
app.use(express.static(publicPath))
io.on('connection',(socket)=>{
    console.log('New user connected...')


    socket.on('createMessage',(newMsgData)=>{
        console.log('new message created',newMsgData)
        io.emit('newMessage',{
            from:newMsgData.from,
            text:newMsgData.text,
            createdAt:new Date().getTime()
        })
    })

    socket.on('disconnect',()=>{
        console.log('User disconnected..')
    })
    
})

server.listen(port,()=>{
    console.log(`Server up on port ${port}...`)
})

