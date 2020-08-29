module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const NewSchema = new Schema({
    name: {type: String},
    from: {type: String},
    amount: {type: Number},
    time:{type:String},
    belong:{type:String}
  });

  return mongoose.model('ExpLog', NewSchema);
}
