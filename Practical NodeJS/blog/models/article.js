import mongoose from 'mongoose';

// article schema blueprint for data modelling
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: [
      value => value.length <= 120,
      'Title is too long (120 max)'
    ],
    default: 'New Post'
  },
  text: String,
  published: {
    type: Boolean,
    default: false
  },
  slug: {
    type: String,
    set: value => value.toLowerCase().replace(' ', '-')
  }
});

// abstract find method
articleSchema.static({
  list(callback) {
    this.find({}, null, { sort: { _id: -1 } }, callback);
  }
});

// compile the schema into a model
// const Article =  mongoose.model('Article', articleSchema);

// export {Article};
export default mongoose.model('Article', articleSchema);
