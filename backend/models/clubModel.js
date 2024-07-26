import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const clubModel = mongoose.models.club || mongoose.model('Club', clubSchema);
export default clubModel;