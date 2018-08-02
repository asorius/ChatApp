const {Users}=require('./users')
const expect=require('expect')


describe('Users tests.',()=>{
    let usersList
    beforeEach(()=>{
        usersList=new Users()
        usersList.users=[
            {
                id:'2',
                name:'joe',
                room: 'office'
            },{
                id:'3',
                name:'ken',
                room: 'four'
            },{
                id:'4',
                name:'jen',
                room: 'four'
            }
        ]
    })

    it('should add new user',()=>{
        const users=new Users()
        const user={
            id:'2',
            name:'joe',
            room: 'The Office Fans'
        }
        const response=users.addUser(user.id,user.name,user.room)

        expect(users.users).toEqual([user])
        expect(users.users.length).not.toBe(0)

    })
    it('should remove a user',()=>{
        const response=usersList.removeUser('3')
        expect(response).toMatchObject({
            id:'3',
            name:'ken',
            room: 'four'
        })
        expect(usersList.users.length).toBe(2)

    })
    it('should  NOT remove a user',()=>{
        const response=usersList.removeUser('8')
        expect(response).toBeFalsy()
        expect(usersList.users.length).toBe(3)

    })
    it('should return users according to room',()=>{
        const response=usersList.getUsersList('four')
        expect(response).toEqual(['ken','jen'])

    })
    it('should get user according to id',()=>{
        const response=usersList.getUser('3')
        expect(response).toMatchObject(usersList.users[1])

    })
    it('should NOT get user according to id',()=>{
        const response=usersList.getUser('8')
        expect(response).toBeFalsy()

    })
})