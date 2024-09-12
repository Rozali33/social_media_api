
const { Schema, model } = require('mongoose');

const schema = new Schema ({
  content: {
      type: Schema.Types.String,
      required: true,
      min: 1,
      max: 256,
  },
  userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
  },
  createdAt: {
      type: Schema.Types.Date,
      required: true,
  },
  updatedAt: {
      type: Schema.Types.Date,
      required: true,
  },
});

const postModel = model('post', schema);

module.exports = postModel;






// const postSchema = new mongoose.Schema({
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   title: {
//     type: String,
//     required: true
//   },
//   description:{
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// postSchema.pre('save', async function() {
//   try {
//     // Find the user document and update its posts array with the new post
//     const user = await mongoose.model('User').findByIdAndUpdate(
//       this.author,
//       { $push: { posts: this._id } },
//       { new: true }
//     );
   
//   } catch (err) {
//     console.error(err);
//   }
// });

// userSchema.plugin(postMiddleware);

// const Post = mongoose.model('Post', postSchema);

// module.exports = Post;