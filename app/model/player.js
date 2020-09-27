module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    name: {type: String},
    currExp: {type: Number},
    role: {type: String},
    username: {type: String},
    // level: {
    //   exp_level: {type: Number},
    //   skill_level: {type: Number}
    // },
    // exp: {
    //   sharing: {type: Number}
    // }
  });

  return mongoose.model('Player', UserSchema);
}
