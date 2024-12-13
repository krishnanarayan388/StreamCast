const express = require("express");
const { uploadimage } = require("../controllers/fileupload");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const router = express();


// Configuration
cloudinary.config({
  cloud_name: "ompra",
  api_key: "316452442986623",
  api_secret: "ol61Fq9h1aHG7C0eKUsUPeP-Kwk",
});

const storage = multer.diskStorage({});
const upload = multer({ storage })



router.post('/upload-image',upload.single('file'), async (req,res)=>{
    try {
        // console.log(req);
        // Console form data
        console.log(req.file.path ," PAth ");
        const result = await cloudinary.uploader.upload(req.file.path,
          {
            resource_type: 'auto',
          }
        );
        res.json({
          public_id: result.public_id,
          url: result.secure_url,
        });
      } catch (error) {
        console.log("Error is:- ", error);
        res.status(500).json({
          error: "Server Error",
        });
      }
})





module.exports = router;
