import express from 'express';
// import AWS from 'aws-sdk'
// import multer from 'multer';
// import multerS3 from 'multer-s3'
import dotEnv from "dotenv";
import multerRouter from './multer.router.js';
import mailRouter from './mail.router.js';


dotEnv.config();

const app = express();

app.use('/upload', multerRouter);
app.use('/mailer', mailRouter);

app.get('/', (req, res) => {
    res.json('ㅇㅋ')
})

app.listen(3000, () => {
    console.log("서버 실행");
});