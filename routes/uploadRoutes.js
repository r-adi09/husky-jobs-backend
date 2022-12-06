const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");

const pipeline = promisify(require("stream").pipeline);

const router = express.Router();

const upload = multer();

router.post("/resume", upload.single("file"), (req, res) => {
  const { file } = req;
  const fileName = file.originalname;
  const extension = fileName.split(".").pop();
  if (extension != "pdf") {
    res.status(400).json({
      message: "Invalid format",
    });
  } else {
    const filename = `${uuidv4()}.${extension}`;
    fs.writeFile(
      `${__dirname}/../public/resume/${filename}`,
      file.buffer,
      (err) => {
        if (err) {
          res.status(400).json({
            message: "Error while uploading",
          });
        } else {
          res.send({
            message: "File uploaded successfully",
            url: `/host/resume/${filename}`,
          });
        }
      }
    );
  }
});

router.post("/profile", upload.single("file"), (req, res) => {
  const { file } = req;
  const fileName = file.originalname;
  const extension = fileName.split(".").pop();
  if (extension != "jpg" && extension != "png") {
    res.status(400).json({
      message: "Invalid format",
    });
  } else {
    const filename = `${uuidv4()}.${extension}`;
    fs.writeFile(
      `${__dirname}/../public/profile/${filename}`,
      file.buffer,
      (err) => {
        if (err) {
          res.status(400).json({
            message: "Error while uploading",
          });
        } else {
          res.send({
            message: "Profile image uploaded successfully",
            url: `/host/profile/${filename}`,
          });
        }
      }
    );
  }
});

module.exports = router;
