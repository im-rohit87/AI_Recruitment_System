const express = require("express");
const router = express.Router();

const upload =
  require("../middleware/uploadMiddleware");

const {
  uploadCandidates,
  getCandidates,
  shortlistCandidate,
} = require(
  "../controllers/candidateController"
);

router.put(
  "/shortlist/:id",
  shortlistCandidate
);

router.get("/", getCandidates);

router.get("/upload", (req, res) => {
  res.send("Upload endpoint ready");
});

router.post(
  "/upload",
  upload.single("file"),
  uploadCandidates
);

module.exports = router;