module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const NewSchema = new Schema({
    from: {type: String},
    to: {type: String},
    amount: {type: String},
    time: {type: String},
    reason:{type:String}
  });

  return mongoose.model('CardLog', NewSchema);
}
