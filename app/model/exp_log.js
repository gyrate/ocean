module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const NewSchema = new Schema({
    username: {type: String},
    from: {type: String},
    amount: {type: Number},
    // time:{type:String},
    description:{type:String}
  });

  return mongoose.model('ExpLog', NewSchema);
}
