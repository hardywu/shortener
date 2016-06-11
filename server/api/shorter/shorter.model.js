'use strict';

import mongoose from 'mongoose';

const ShorterSchema = new mongoose.Schema({
  origin: { type: String, required: true, unique: true },
  token: { type: String, index: { unique: true } }
}, { timestamps: true });

const CounterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

const counter = mongoose.model('ShorterCounter', CounterSchema);

ShorterSchema.pre('save', function (next) {
  const doc = this;
  counter.findByIdAndUpdate(
    { _id: 'shorterId' },
    { $inc: { seq: 1 } },
    { upsert: true, new: true },
    function(error, count) {
      if (error)
        return next(error);
      doc.token = toBase62(count.seq);
      next();
    }
  );
});

// shuffle "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
// make the first few short urls looks randomized
const shuffledCharaterList =
  "ncNSb2EmPC5Kd1k9FaLQfMHelG0OqyUXVvJztirpuW4hZjoRsAD6TBYw73gIx8";
const symbols = shuffledCharaterList.split("");
const base = 62;

function toBase62(decimal) {
  let conversion = "";

  while (conversion.length < 5) {
    conversion = symbols[decimal % base] + conversion;
    decimal = Math.floor(decimal / base); // duplicated appeart after 62^5
  }

  return conversion;
}

export default mongoose.model('Shorter', ShorterSchema);
