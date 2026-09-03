const Feedback = require('../models/Feedback');
 
// 1. Get all feedbacks
exports.getFeedbacks = async (req, res) => {
  try {
    const list = await Feedback.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
// 2. Submit new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { patientName, doctorOrService, rating, comments } = req.body;
    if (!patientName || !doctorOrService || !rating || !comments) {
      return res.status(400).json({ error: 'All feedback fields are required!' });
    }
    const newFb = new Feedback(req.body);
    await newFb.save();
    res.status(201).json(newFb);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
 
// 3. Update feedback
exports.updateFeedback = async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
 
// 4. Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};