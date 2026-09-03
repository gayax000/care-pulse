import React, { useState, useEffect } from 'react';

export default function MedicineModal({ isOpen, onClose, onSave, editingMed }) {
  const [formData, setFormData] = useState({
    medicineName: '', category: 'Antibiotics', stockQuantity: '', unitPrice: '', expiryDate: '', manufacturer: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingMed) setFormData(editingMed);
    else setFormData({ medicineName: '', category: 'Antibiotics', stockQuantity: '', unitPrice: '', expiryDate: '', manufacturer: '' });
    setErrors({});
  }, [editingMed, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.medicineName.trim()) errs.medicineName = 'Medicine name is required';
    if (formData.stockQuantity === '' || formData.stockQuantity < 0) errs.stockQuantity = 'Valid quantity required';
    if (!formData.unitPrice || formData.unitPrice < 0) errs.unitPrice = 'Valid price required';
    if (!formData.expiryDate.trim()) errs.expiryDate = 'Expiry date required';
    if (!formData.manufacturer.trim()) errs.manufacturer = 'Manufacturer is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{editingMed ? '💊 Edit Medicine Stock' : '💊 Add Medicine to Inventory'}</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
          <div className="form-group">
            <label>Medicine Name</label>
            <input className="form-control" placeholder="Amoxicillin 500mg" value={formData.medicineName} onChange={e => setFormData({...formData, medicineName: e.target.value})} />
            {errors.medicineName && <div className="error-text">{errors.medicineName}</div>}
          </div>
          <div className="form-group">
            <label>Category</label>
            <select className="form-control" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option>Antibiotics</option>
              <option>Pain Relief</option>
              <option>Vitamins & Supplements</option>
              <option>Cardiovascular</option>
              <option>Respiratory</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Stock Quantity (Units / Tablets)</label>
            <input type="number" min="0" className="form-control" placeholder="100" value={formData.stockQuantity} onChange={e => setFormData({...formData, stockQuantity: Number(e.target.value)})} />
            {errors.stockQuantity && <div className="error-text">{errors.stockQuantity}</div>}
          </div>
          <div className="form-group">
            <label>Unit Price (Rs.)</label>
            <input type="number" min="0" className="form-control" placeholder="45.00" value={formData.unitPrice} onChange={e => setFormData({...formData, unitPrice: Number(e.target.value)})} />
            {errors.unitPrice && <div className="error-text">{errors.unitPrice}</div>}
          </div>
          <div className="form-group">
            <label>Expiry Date</label>
            <input type="date" className="form-control" value={formData.expiryDate} onChange={e => setFormData({...formData, expiryDate: e.target.value})} />
            {errors.expiryDate && <div className="error-text">{errors.expiryDate}</div>}
          </div>
          <div className="form-group">
            <label>Manufacturer / Supplier</label>
            <input className="form-control" placeholder="State Pharmaceuticals / GlaxoSmithKline" value={formData.manufacturer} onChange={e => setFormData({...formData, manufacturer: e.target.value})} />
            {errors.manufacturer && <div className="error-text">{errors.manufacturer}</div>}
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '15px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editingMed ? 'Update Inventory' : 'Add Stock'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}