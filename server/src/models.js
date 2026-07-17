const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 24 },
  passwordHash: { type: String, required: true },
  elo: { type: Number, default: 1000 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

userSchema.index({ username: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const deckSlotSchema = new mongoose.Schema({
  role: { type: String, required: true },
  pieceKey: { type: String, required: true },
}, { _id: false });

const deckSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, default: 'Mon deck', maxlength: 40 },
  faction: { type: String, required: true, enum: ['Nintendo', 'PlayStation', 'SEGA', 'Xbox'] },
  slots: { type: [deckSlotSchema], required: true },
  isDefault: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Token: mongoose.model('Token', tokenSchema),
  Deck: mongoose.model('Deck', deckSchema),
};
