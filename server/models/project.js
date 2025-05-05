import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  image: { type: String, default: '' },
  category: { type: String, required: true },
  description: { type: String, required: true },
  teamSize: { type: Number, required: true },
  mentorship: { type: Boolean, required: true },
  requiredSkills: { type: String, required: false },
  likes: { type: Number, default: 0 },
  image: { type: String, default: "" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  pendingJoinRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
