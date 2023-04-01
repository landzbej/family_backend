const mongoose = require("mongoose");

  const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [{

      type: String
  
  }],
  //ADDED
  // image:
  //   {
  //       type: String
  //   }
  //ABOVE
  });


blogSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model("Blog", blogSchema);
// module.exports = new mongoose.model("Blog", blogSchema);