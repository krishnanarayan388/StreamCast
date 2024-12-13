const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configuration
cloudinary.config({
  cloud_name: "ompra",
  api_key: "316452442986623",
  api_secret: "ol61Fq9h1aHG7C0eKUsUPeP-Kwk",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "my_folder",
    format: async (req, file) => "png", // or jpeg, bmp, gif, etc.
    public_id: (req, file) => "unique_id", // or use a unique ID generator
  },
});

const upload = multer({ storage: storage });
// });

exports.uploadimage = async (req, res) => {
  try {
    console.log(req);
    // Console form data
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server Error",
    });
  }
};
