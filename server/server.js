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

    socket.emit('newMessage',{
        from:'andrew',
        text:'hey. Can we meet up at six?',
        createdAt:522
    })

    socket.on('createMessage',(newMsgData)=>{
        console.log('new message created',newMsgData)
    })

    socket.on('disconnect',()=>{
        console.log('User disconnected..')
    })
    
})

server.listen(port,()=>{
    console.log(`Server up on port ${port}...`)
})

