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
socket.on('newLocationMessage',(msg)=>{
    const li=jQuery('<li></li>')
    const a=jQuery('<a target="_blank">Open my location on Google Maps</a>')
    li.text=`admin: `
    a.attr('href',msg.url)
    li.append(a)
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

const locationBtn=jQuery('#send-location')
locationBtn.on('click',(e)=>{
    e.preventDefault()
    if(!navigator.geolocation){
        return alert('Geolocation not available on your browser!')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('createLocationMessage',{
            lat:position.coords.latitude,
            long:position.coords.longitude
        })
    },(error)=>alert('Unable to fetch location.'))
})