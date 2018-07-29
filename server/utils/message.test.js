const expect=require('expect')
const {generateMessage}=require('./message')

it('should generate new message',()=>{
    expect(generateMessage('jon','texte')).toMatchObject({from:'jon',text:'texte'})
    expect(typeof generateMessage('jon','texte').createdAt).toBe('number')
})