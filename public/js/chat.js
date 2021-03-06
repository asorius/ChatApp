const socket=io()
function scrollToBottom () {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
  
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.animate({scrollTop:scrollHeight}, 250)
    }
  }
socket.on('connect',()=>{
    const params=jQuery.deparam(window.location.search)
    socket.emit('join',params,(err)=>{
        if(err){
            alert(err)
            window.location.href='/'
        }else{
            console.log('no errors')
        }
    })
})
socket.on('disconnect',()=>{
    console.log('Disconnected..')})

socket.on('updateUserList',(usersArray)=>{
    const ul=$('<ul></ul>')
    usersArray.forEach(element=> {
        ul.append($('<li></li>').text(element))
    })
    $('#users').html(ul)
})

socket.on('newMessage',(msg)=>{
    const formatedTime=moment(msg.createdAt).format('h:mm a')
    const template=jQuery('#message-template').html()
    const html=Mustache.render(template,{
        text:msg.text,
        from:msg.from,
        createdAt:formatedTime
    })
    jQuery('#messages').append(html)
    scrollToBottom() 
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
    scrollToBottom()
})


jQuery('#message-form').on('submit',(e)=>{
    e.preventDefault()
    const messageTextBox=jQuery('[name=message]')
    socket.emit('createMessage',{
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

