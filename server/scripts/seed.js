const mongoose = require('mongoose');
require('dotenv').config();

const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const Medicine = require('../models/Medicine');
const Feedback = require('../models/Feedback');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🌱 Connected to MongoDB for CarePulse seeding...');

    await Doctor.deleteMany();
    await Appointment.deleteMany();
    await Medicine.deleteMany();
    await Feedback.deleteMany();

    await Doctor.insertMany([
      { name: 'Dr. Kasun Perera', specialization: 'Cardiology', qualifications: 'MBBS, MD, MRCP (UK)', contactEmail: 'kasun.doc@carepulse.lk', consultationFee: 2500, availableDays: 'Mon, Wed (5:00 PM - 8:00 PM)' },
      { name: 'Dr. Nimesha Fernando', specialization: 'Pediatrics', qualifications: 'MBBS, DCH, MD (Pediatrics)', contactEmail: 'nimesha.p@carepulse.lk', consultationFee: 2200, availableDays: 'Tue, Thu, Sat (4:00 PM - 7:00 PM)' },
      { name: 'Dr. Ruwan Alwis', specialization: 'General Medicine', qualifications: 'MBBS (Colombo)', contactEmail: 'ruwan.a@carepulse.lk', consultationFee: 1500, availableDays: 'Daily (9:00 AM - 1:00 PM)' }
    ]);

    await Appointment.insertMany([
      { patientName: 'Kamal Gunaratne', patientPhone: '0771234567', doctorName: 'Dr. Kasun Perera', appointmentDate: '2026-09-10', timeSlot: '05:30 PM', status: 'Confirmed' },
      { patientName: 'Sunil Shantha', patientPhone: '0719876543', doctorName: 'Dr. Nimesha Fernando', appointmentDate: '2026-09-12', timeSlot: '06:00 PM', status: 'Pending' }
    ]);

    await Medicine.insertMany([
      { medicineName: 'Paracetamol 500mg', category: 'Pain Relief', stockQuantity: 250, unitPrice: 5.50, expiryDate: '2027-12-31', manufacturer: 'State Pharmaceuticals' },
      { medicineName: 'Amoxicillin 250mg', category: 'Antibiotics', stockQuantity: 80, unitPrice: 35.00, expiryDate: '2026-11-20', manufacturer: 'Astron Ltd' },
      { medicineName: 'Vitamin C 500mg Chewable', category: 'Vitamins & Supplements', stockQuantity: 150, unitPrice: 15.00, expiryDate: '2028-06-15', manufacturer: 'NatureCare' }
    ]);

    await Feedback.insertMany([
      { patientName: 'Chaminda Silva', doctorOrService: 'Dr. Kasun Perera (Cardiology)', rating: 5, comments: 'Extremely polite and thorough examination. Clinic staff was very supportive.', symptomsInquiry: 'None, feeling much better.', recommend: true },
      { patientName: 'Anula Wijesinghe', doctorOrService: 'Pharmacy Services', rating: 4, comments: 'Fast dispensing and medicines were well packed with usage instructions.', symptomsInquiry: '', recommend: true }
    ]);

    console.log('✅ CarePulse Sample Data seeded successfully for all 4 modules!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding Error:', err);
    process.exit(1);
  }
};

seedData();