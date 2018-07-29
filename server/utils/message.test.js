const expect=require('expect')
const {generateMessage,generateLocationMessage}=require('./message')

describe('Message generation.',()=>{
    it('should generate new message',()=>{
        expect(generateMessage('jon','texte')).toMatchObject({from:'jon',text:'texte'})
        expect(typeof generateMessage('jon','texte').createdAt).toBe('number')
    })
})
describe('Location message generation.',()=>{
    it('should generate new lcoation message',()=>{
        const coords={lat:43,long:22}
        const user='jonny'
        const url=`http://www.google.com/maps?q=43,22`
        expect(typeof generateLocationMessage(user,coords.lat,coords.long)).toBe('object')
        expect(generateLocationMessage(user,coords.lat,coords.long).url).toBe(url)
        expect(typeof generateMessage('jon','texte').createdAt).toBe('number')
    })
})