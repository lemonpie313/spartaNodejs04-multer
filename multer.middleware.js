import AWS from 'aws-sdk'
import multer from 'multer';
import multerS3 from 'multer-s3'
import path from 'path';
import dotEnv from "dotenv";

dotEnv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});

// 확장자 검사 목록
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp', '.gif'];

// 로컬에 저장
const uploadLocal = multer({
  // 파일 저장 위치 (disk , memory 선택)
  storage: multer.diskStorage({
      destination: function (req, file, done) {
          done(null, 'uploads/');
      },
      filename: function (req, file, done) {
          const ext = path.extname(file.originalname);
          done(null, path.basename(file.originalname, ext) + Date.now() + ext);
      }
  }),
  // 파일 허용 사이즈 (5 MB)
  limits: { fileSize: 5 * 1024 * 1024 }
});

// s3에 저장
const upload = multer({
    storage: multerS3({
        s3         : s3,
        bucket     : process.env.AWS_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key        : (req, file, callback) => {
            
            // 오늘 날짜 구하기
            const today = new Date();
            const currentYear = today.getFullYear();
            const currentMonth = today.getMonth() + 1;
            const currentDate = today.getDate();
            const date = `${currentYear}-${currentMonth}-${currentDate}`;
            
            // 임의번호 생성
            let randomNumber = '';
            for (let i = 0; i < 8; i++) {
                randomNumber += String(Math.floor(Math.random() * 10));
            }
            
            // 확장자 검사
            const extension = path.extname(file.originalname).toLowerCase();
            if (!allowedExtensions.includes(extension)) {
                return callback(new Error('확장자 에러'));
            }
            
            // folder라는 파일 내부에 업로드한 사용자에 따라 임의의 파일명으로 저장
            callback(null, `folder/${date}_${randomNumber}`);
        },
        // acl 권한 설정
        acl        : 'public-read-write'
    }),
    // 이미지 용량 제한 (5MB)
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export { upload, uploadLocal };