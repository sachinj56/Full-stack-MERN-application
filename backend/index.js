const express = require("express")
const app = express()
var cors = require('cors')
app.use(cors())
const port = 5000
const connecttoMongo= require('./db.js')
connecttoMongo();
app.use(express.json())

// Available routes
app.use("/api/auth",require('./routes/auth'))
app.use("/api/notes",require('./routes/notes'))
app.listen(port,()=>{
    console.log("Hello World")
})