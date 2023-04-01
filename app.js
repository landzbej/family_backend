// const http = require('http')
//ADDED
const multer = require('multer');
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
const upload = multer({ storage: storage });
//ABOVE

const config = require('./utils/config');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
//ADDED
const imagesRouter = require('./controllers/images')
//ABOVE
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = config.MONGODB_URI;

mongoose.connect(url)
.then(result => {
  logger.info("connected to MongoDB");
})
.catch((error) => {
  logger.info("error connecting to MongoDB:", error.message);
});

app.use(cors())
app.use(express.json())
//ADDED
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//ABOVE
app.use('/api/users', usersRouter);
//ADDED
app.use('/api/images', imagesRouter);
//ABOVE

app.use('/', blogsRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler);

module.exports = app;