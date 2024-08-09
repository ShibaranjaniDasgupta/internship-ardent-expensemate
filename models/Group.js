const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  groupName: { type: String, required: true },
  description: { type: String },
  members: [
    {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      amount: { type: Number, required: true } // Add amount field
    }
  ]
}, { timestamps: true });

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;
