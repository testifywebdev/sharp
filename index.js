import express from "express";
import multer from "multer";
import sharp from "sharp";
import fs from "fs/promises"; 
import path from "path";

const upload = multer({ dest: "./uploads" });
const app = express();

app.post("/", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const buffer = await fs.readFile(filePath);

    const grayBuffer = await sharp(buffer).grayscale().toBuffer();

    res.set("Content-Type", "image/png");
    res.send(grayBuffer);

    // Clean up the uploaded file
    await fs.unlink(filePath);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).send("Failed to process image.");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
