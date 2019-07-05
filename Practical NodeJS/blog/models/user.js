import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    set: value => value.trim().toLowerCase(),
    validate: [
      email => (email.match(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i) != null),
      'Inavlid email'
    ],
  },
  password: String,
  admin: {
    type: Boolean,
    default: false
  }
});

// compile schema into model and export 
// const User = mongoose.model('User', userSchema);

// export { User };
export default mongoose.model('User', userSchema);
