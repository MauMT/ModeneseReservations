const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser")
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const fs = require('fs');
const cors = require('cors');

const {mongoose} = require("./database");
dotenv.config({ path: path.resolve(__dirname, './.env') });
const PORT = process.env.PORT || 3001;

//  ============= MIDDLEWARE

app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.options('*', cors());
app.use('/uploads/images', express.static(path.join('uploads', 'images')));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT');
  
  next();
});

// ============= ROUTES
const authRoutes = require('./routes/auth')
const validateToken = require('./routes/validate-token')
const userRoutes = require('./routes/registered-user')

app.use('/api/user', authRoutes);
app.use('/api/admin', validateToken, userRoutes);
app.use("/", require("./routes/index.routes"));


// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log(`Database: ${process.env.MONGODB_ATLAS}`);


//database