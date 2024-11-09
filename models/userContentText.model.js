import mongoose from 'mongoose';

const { Schema } = mongoose;

const EntrySchema = new Schema({
  url: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true }
});

const UserContentTextSchema = new Schema({
  uuid: { type: String, required: true, unique: true },
  entries: [EntrySchema]
});


const UserContentText = mongoose.model('UserContentText', UserContentTextSchema);

export { UserContentText };


