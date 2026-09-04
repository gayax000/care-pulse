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
    const { patientName, doctorOrService, rating, comments, symptomsInquiry, recommend } = req.body;
    
    if (!patientName || !patientName.trim()) return res.status(400).json({ error: 'Patient name is required' });
    if (!doctorOrService || !doctorOrService.trim()) return res.status(400).json({ error: 'Doctor or department is required' });
    if (!rating || rating < 1 || rating > 5) return res.status(400).json({ error: 'Rating must be between 1 and 5 stars' });
    if (!comments || !comments.trim()) return res.status(400).json({ error: 'Patient comments are required' });

    const newFb = new Feedback({
      patientName: patientName.trim(),
      doctorOrService: doctorOrService.trim(),
      rating: Number(rating),
      comments: comments.trim(),
      symptomsInquiry: symptomsInquiry ? symptomsInquiry.trim() : '',
      recommend: recommend !== undefined ? Boolean(recommend) : true
    });

    await newFb.save();
    res.status(201).json(newFb);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
 
// 3. Update feedback
exports.updateFeedback = async (req, res) => {
  try {
    if (req.body.rating !== undefined && (req.body.rating < 1 || req.body.rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5 stars' });
    }
    const updated = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Feedback review not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
 
// 4. Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Feedback review not found' });
    res.json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};