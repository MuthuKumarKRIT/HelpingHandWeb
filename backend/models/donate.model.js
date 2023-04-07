const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const donateSchema = new Schema({
  pname: { type: String, required: true },
  quant: { type: String, required: true },
  description: { type: String, required: true },
});
const Donate = mongoose.model('Donate', donateSchema);
module.exports = Donate;