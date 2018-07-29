const path=require('path')
const publicPath=path.join(__dirname,'../public')
const express=require('express')

// for heroku
const port=process.env.PORT || 3000

const app=express()
app.use(express.static(publicPath))


app.listen(port,()=>{
    console.log(`Server up on port ${port}...`)
})

