module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        name: { type: String },
        currExp: { type: Number }
    });

    return mongoose.model('Player', UserSchema);
}
