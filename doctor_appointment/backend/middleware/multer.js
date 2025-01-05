import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    // Use the original file name or modify it as needed
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
