const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  name: { type: String },
  type: { type: String },
});

const jobSchema = new mongoose.Schema({
  title: { type: String },
  fields: { type: [fieldSchema] }, // Accepts array of objects
  data: { type: Array }, // General array for dynamic data
});

module.exports = mongoose.models.Job || mongoose.model('Job', jobSchema);
