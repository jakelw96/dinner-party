const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

const uploadImage = () => {
    cloudinary.v2.uploader.upload("https://image.shutterstock.com/z/stock-photo-vaca-nas-nuvens-fotos-incomuns-1507883195.jpg", 
    { public_id: "test" },
    function(error, result) {console.log(result); });
}

uploadImage();