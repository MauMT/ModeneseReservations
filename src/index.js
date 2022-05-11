const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser")
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const fs = require('fs');


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
app.use('/api/user', authRoutes)

app.use("/", require("./routes/index.routes"));
/* 
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});
 */

//  ============= STATIC FILES


// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log(`Database: ${process.env.MONGODB_ATLAS}`);


//database