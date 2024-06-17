import express from 'express';
import { upload, uploadLocal } from './multer.middleware.js';

const router = express.Router();

//로컬에 저장
router.post('/uploadLocal', uploadLocal.single('file'), function (req, res, next) {
  const { wow } = req.body;
  res.send({
      wow,
  });
});

//여러개
router.post('/uploads', upload.array('file', 2), function (req, res, next) {
  const wow = req.body.wow;
  const loc = req.files.map((cur) => {
    return { location: cur.location };
  })
  res.send({
      fileLocation: loc,
      wow,
  });
});

//한개
router.post('/upload', upload.single('file'), function (req, res, next) {
  const {postContent} = req.body;
  const loc = req.file.location;
  res.send({
      fileLocation: loc,
      postContent,
  });
});

export default router;

