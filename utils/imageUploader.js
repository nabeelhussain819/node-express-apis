const multer = require('multer');
const path = require('path');

const uploadPath = path.join(__dirname, '../uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); 
  },
  filename: (req, file, cb) => {
    cb(null,Date.now() + file.originalname); 
  }
});

exports.upload = multer({ storage: storage });
