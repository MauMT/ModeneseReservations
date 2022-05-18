const mongoose = require('mongoose');
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, './.env') });

const option = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(process.env.MONGODB_ATLAS, option)
.then(() => console.log('Connected to DB'))
.catch(e => console.log('DB Error:', e))
module.exports = mongoose;
