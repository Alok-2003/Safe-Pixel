const multer = require("multer");
const storage = () => multer.memoryStorage(); // Store the file data in memory for €
module.exports = {
  uploadUserImage: multer({ storage: storage() }).single("file"),
};
