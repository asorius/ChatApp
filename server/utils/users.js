[
    {
        id:'socketid',
        name:'andrew',
        room:'theoffice fans'
    }
]




class Users{
    constructor(){
        this.users=[]
    }
    addUser(id,name,room){
        const user={id,name,room}
        this.users.push(user)
        return user
    }
    removeUser(id){
        const user=this.getUser(id)
        const newList=this.users.filter((user)=>user.id!==id)
        this.users=newList
        return user
    }
    getUser(id){
        return this.users.find((user)=>user.id===id)
        
    }
    getUsersList(room){
        const users=this.users.filter((user)=>user.room===room)
        const namesArray=users.map((user)=>user.name)
        
        return namesArray
    }
}

module.exports={
    Users
}