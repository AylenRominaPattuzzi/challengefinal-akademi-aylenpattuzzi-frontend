import React from 'react'
import Button from './Button'
import './Modal.css'

export default function Modal({
  productName,
  onConfirm,
  onCancel,
  modalTitle,
  modalDescription
}) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{modalTitle}</h3>
        <p>{modalDescription} "{productName}"?</p>
        <div className="modal-actions">
          <Button
            texto='Cancelar'
            onClick={onCancel}
            type='button'
          />
          <Button
            texto='Confirmar'
            onClick={onConfirm}
            type='button'
            color='red'
          />
        </div>
      </div>
    </div>
  )
}