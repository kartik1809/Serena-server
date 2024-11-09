import mongoose from 'mongoose';

const { Schema } = mongoose;

const DaySchema = new Schema({
  date: { type: String, required: true },
  seconds: { type: Number, default: 0 },
});

const DomainSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  days: [DaySchema],
  allTime: {
    seconds: { type: Number, default: 0 },
  },
});

const UserSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  domains: [DomainSchema],
});

const Domain = mongoose.model('Domain', DomainSchema);
const UserContent = mongoose.model('UserContent', UserSchema);

export { Domain, UserContent };
