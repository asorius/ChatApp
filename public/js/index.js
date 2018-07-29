const socket=io()
socket.on('connect',()=>{
    console.log('Connected..')

})
socket.on('disconnect',()=>{
    console.log('Disconnected..')
})


socket.on('newMessage',(msg)=>{
    console.log('New message',msg)
    const li=jQuery('<li></li>')
    li.text(`${msg.from}: ${msg.text}`)
    jQuery('#messages').append(li)
})


jQuery('#message-form').on('submit',(e)=>{
    e.preventDefault()
    socket.emit('createMessage',{
        from:'User',
        text:jQuery('[name=message]').val()
    },()=>{})
    jQuery('[name=message]').val('')
})