module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    title: {type: String},
    time: {type: String},
    score: {type: Number},
    presenter: {type: String}
  });

  return mongoose.model('SharingLog', UserSchema);
}
