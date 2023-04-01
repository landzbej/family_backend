//ADDED EVERYTHING IN THIS FILE
const jwt = require('jsonwebtoken');
const imagesRouter = require('express').Router();
const Image = require('../models/image');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const User = require('../models/user')
const logger = require('../utils/logger');
var fs = require('fs');
var path = require('path');
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

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

imagesRouter.get('/', (request, response) => {
  Image
  .find({})
  // .populate('user', {username: 1, name: 1})
  .then(images => {
    response.json(images)
  })
  })

  imagesRouter.delete('/', async(request, response, next) => {
    await Image.deleteMany({})
    console.log('all cleared')
  })


  imagesRouter.post('/', async (request, response, next) => {
    console.log('request.body', request.body)
    let { image, paramId } = request.body
    const final_img = {
        image: image,
        paramId: paramId
    };
    console.log('final_img', final_img)
    Image.create(final_img).then(function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log(result.img.Buffer);
            console.log("Saved To database");
            // res.contentType(final_img.contentType);
            res.send(final_img);
        }
    })

    // const body = request.body;
    // if (!body.author ) {
    // return response.status(400).json({ 
    //   error: "content missing from user request" 
    // });
    // }
    
    // // const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    // // if (!decodedToken.id) {
    // //   return response.status(401).json({ error: 'token invalid' })
    // // }
    // // const user = body.user || await User.findById(decodedToken.id);
    // //ADDED
    // // console.log('path', path)
    // // console.log('dirname', _dirname)
    // //ABOVE
    // const image = new Image({
    //   image
    // });

    // console.log(image);
    
    // try{
    // const savedImage = await image.save();
    // // user.blogs = user.blogs.concat(savedBlog._id);
    // // await user.save();
    // response.set('Access-Control-Allow-Origin', '*')
    // response.json(savedImage)
    // } catch(error) {
    // error => next(error);
    // }
    })

  module.exports = imagesRouter;