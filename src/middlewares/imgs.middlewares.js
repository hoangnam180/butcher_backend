const multer = require('multer');
const upload = multer({
  dest: 'src/public/uploads/',
  filename: (req, file, cb) => {
    try {
      cb(null, file.originalname);
    } catch (err) {
      console.log(err);
    }
  },
});

const uploadFile = upload.single('avatar');

module.exports = { uploadFile };
