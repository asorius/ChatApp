const socket=io()
socket.on('connect',()=>{
    console.log('Connected..')

    socket.emit('createMessage',{
        to:'andrew',
        text:'ofc bruh',
        createdAt:1547
    })

})
socket.on('disconnect',()=>{
    console.log('Disconnected..')
})


socket.on('newMessage',(msg)=>{
    console.log(`New message from ${msg.from} : ${msg.text} at ${msg.createdAt}`)
})