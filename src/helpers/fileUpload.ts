import { Request } from "express";
import multer, { Multer, StorageEngine } from "multer";
const { v4: uuidv4 } = require("uuid");

const DIR = "./src/uploads";

const storage: StorageEngine = multer.diskStorage({
  destination: (
    _: Request,
    __: Express.Multer.File,
    callback: CallableFunction
  ) => {
    callback(null, DIR);
  },
  filename: (
    _: Request,
    file: Express.Multer.File,
    callback: CallableFunction
  ) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    callback(null, uuidv4() + "-" + fileName);
  },
});

const upload: Multer = multer({
  storage: storage,
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: CallableFunction
  ) => {
    console.log(req.body);
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

export default upload;
