// server.js
import express from "express";
import multer from "multer";
import pinataSDK, { PinataPinOptions } from "@pinata/sdk";
import dotenv from "dotenv";
import stream from "stream";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);

app.use(cors()); // Enable CORS for all routes

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/status", (_: any, res: any) => {
  res.status(200).json({ status: "all good" });
});

app.post("/upload", upload.single("file"), async (req: any, res: any) => {
  try {
    const file = req.body.file;
    const fileName = req.body.fileName;

    const readableStream = new stream.PassThrough();

    readableStream.end(file.buffer);

    const options: PinataPinOptions = {
      pinataMetadata: {
        name: fileName,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };

    const result = await pinata.pinFileToIPFS(readableStream, options);

    res.json(result);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Error uploading file" });
  }
});

app.listen(port, () => {
  console.log(`Server running on portd ${port}`);
});
