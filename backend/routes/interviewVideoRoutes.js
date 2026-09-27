const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
  uploadVideo,
} = require(
  "../controllers/interviewVideoController"
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/interviews/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        file.originalname
    );
  },
});

const upload = multer({
  storage,
});

router.post(
  "/upload-video",
  upload.single("video"),
  uploadVideo
);

module.exports = router;