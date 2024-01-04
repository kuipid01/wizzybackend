import express from 'express'
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import authRouter from './routes/auth.route.js'


// Start express app
const app = express();

dotenv.config()

const port = process.env.PORT || 3000;



const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('db connected')
    } catch (error) {
        console.log(error)
    }
}

// Use the user router
app.use(express.json())
app.use(cookieParser())




// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))

app.options('*', cors());

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.listen(port, () => {
    connect()
    console.log('Server Running')
});