import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  recipient: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;
