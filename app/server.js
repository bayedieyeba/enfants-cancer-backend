const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const colors = require("colors")
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const userRoutes = require('./routes/userRoutes')
const enfantRoutes = require('./routes/enfantRoutes')

var cors = require('cors')
dotenv.config();
connectDB()


const app = express()
app.use(cors({
    origin : "*",
    methods : ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json())

app.get('/', (req,res) => {
    res.send("API is running")
})

app.use('/api/user', userRoutes)
app.use('/api/enfant', enfantRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT,() => {
    console.log(`[++] Serveur is running on port: ${PORT}.`);
    
});