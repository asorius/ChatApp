const socket=io()
// socket.on('connect',()=>{
//     console.log('Connected..')

// })
// socket.on('disconnect',()=>{
//     console.log('Disconnected..')
// })


socket.on('newMessage',(msg)=>{
    const formatedTime=moment(msg.createdAt).format('h:mm a')
    const template=jQuery('#message-template').html()
    const html=Mustache.render(template,{
        text:msg.text,
        from:msg.from,
        createdAt:formatedTime
    })
    jQuery('#messages').append(html)
})
socket.on('newLocationMessage',(msg)=>{
    const formatedTime=moment(msg.createdAt).format('h:mm a')
    const template=jQuery('#location-message-template').html()
    const html=Mustache.render(template,{
        url:msg.url,
        from:msg.from,
        createdAt:formatedTime
    })
    jQuery('#messages').append(html)
})


jQuery('#message-form').on('submit',(e)=>{
    e.preventDefault()
    const messageTextBox=jQuery('[name=message]')
    socket.emit('createMessage',{
        from:'User',
        text:messageTextBox.val()
    },()=>{})
    messageTextBox.val('')
})

const locationBtn=jQuery('#send-location')
locationBtn.on('click',(e)=>{
    e.preventDefault()
    if(!navigator.geolocation){
        return alert('Geolocation not available on your browser!')
    }
    locationBtn.attr('disabled','disabled').text('Sending location...')
    navigator.geolocation.getCurrentPosition((position)=>{
        locationBtn.removeAttr('disabled').text('Sending location')
        socket.emit('createLocationMessage',{
            lat:position.coords.latitude,
            long:position.coords.longitude
        })
    },(error)=>{
        locationBtn.removeAttr('disabled')        
        alert('Unable to fetch location.')})
})