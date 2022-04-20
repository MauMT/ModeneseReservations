const mongoose = require('mongoose');
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, './.env') });

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));

module.exports = mongoose;
