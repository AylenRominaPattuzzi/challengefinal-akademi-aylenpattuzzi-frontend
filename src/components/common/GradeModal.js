import React from 'react';
import Button from './Button';
import './Modal.css';

export default function GradeModal({ 
  studentName,
  gradeValue,
  onChange,
  onCancel,
  onSave
}) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Cargar nota para {studentName}</h3>
        <input
          type="number"
          min="0"
          max="10"
          value={gradeValue}
          onChange={onChange}
        />
        <div className="modal-actions">
          <Button texto="Cancelar" onClick={onCancel} type="button" />
          <Button texto="Guardar" onClick={onSave} type="button" color="green" />
        </div>
      </div>
    </div>
  );
}
