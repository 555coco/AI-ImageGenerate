import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongoDB/connect.js'
import postRoutes from './routes/postRoutes.js'
import sdRoutes from './routes/sdRoutes.js'


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({limit:'50mb'}))

app.use('/api/post',postRoutes)
app.use('/api/sd', sdRoutes)

app.get('/', async (req,res) => {
    res.send("hello i am hwy")
})

const startServer = async () => {
try {
    connectDB(process.env.MONGODB_URL)
} catch (error) {
    console.log(error)
}

    app.listen(8080, () => {
        console.log('Server is running on the port 8080')
    })
}

startServer()
