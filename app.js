import express from 'express'
import bodyParser from 'body-parser'
import connectDB from './config/db.js';
import urlsRouter from './routes/urls.js'
import indexRouter from './routes/index.js';
import dotenv from 'dotenv'
dotenv.config({path: './config/.env'})

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

connectDB();

app.use('/', indexRouter);
app.use('/api', urlsRouter);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`\n\t\t\t------------------------------------Server is running at PORT ${PORT}------------------------------\n`)
})