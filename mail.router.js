import express from 'express';
import { transporter, mailOptions } from './mail.middleware.js';

const router = express.Router();

router.post('/mail', async (req, res) => {

    transporter.sendMail(mailOptions);

    res.send({data: "완료!!"})
})




export default router;