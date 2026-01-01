import app from "./app.js"
import connectionToDB from "./config/db.js"
const PORT=process.env.PORT || 1000


app.listen(PORT,async ()=>{
    console.log(`http://LocalHost:${PORT}`)
    await connectionToDB()
})