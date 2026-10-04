import React from 'react';
import { QrCode, Printer, CheckCircle2, ShieldCheck, MapPin, Calendar, Clock, Truck, X } from 'lucide-react';

export function DigitalTokenModal({ isOpen, onClose, tokenData, t }) {
  if (!isOpen || !tokenData) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
      padding: '16px'
    }}>
      <div className="glass-card" style={{
        maxWidth: '520px',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '2px solid #059669',
        animation: 'fadeIn 0.25s ease'
      }}>
        {/* Pass Header */}
        <div style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
          color: '#ffffff',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="#34d399" />
              <span style={{ fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#a7f3d0' }}>
                Government of India • MSP E-Procurement
              </span>
            </div>
            <h3 style={{ margin: '4px 0 0 0', color: '#ffffff', fontSize: '1.25rem' }}>
              {t.tokenTitle || 'Digital Procurement E-Pass'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="no-print"
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Pass Body */}
        <div style={{ padding: '24px' }}>
          {/* Token ID highlight banner */}
          <div style={{
            background: '#ecfdf5',
            border: '2px dashed #059669',
            borderRadius: '12px',
            padding: '14px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', letterSpacing: '0.5px' }}>
              AUTHENTICATED TOKEN NUMBER
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#064e3b', letterSpacing: '1px', margin: '4px 0' }}>
              {tokenData.token}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>
              <CheckCircle2 size={15} />
              <span>Gate Priority: Entry Gate #1 (Weighbridge In)</span>
            </div>
          </div>

          {/* QR Code and Farmer Specs */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
            {/* Scannable QR Code Visual */}
            <div style={{
              background: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center',
              flexShrink: 0
            }}>
              <svg width="120" height="120" viewBox="0 0 120 120" style={{ display: 'block' }}>
                {/* Simulated high-fidelity 2D Barcode pattern */}
                <rect width="120" height="120" fill="#ffffff" />
                <rect x="10" y="10" width="30" height="30" fill="#064e3b" />
                <rect x="15" y="15" width="20" height="20" fill="#ffffff" />
                <rect x="20" y="20" width="10" height="10" fill="#064e3b" />
                
                <rect x="80" y="10" width="30" height="30" fill="#064e3b" />
                <rect x="85" y="15" width="20" height="20" fill="#ffffff" />
                <rect x="90" y="20" width="10" height="10" fill="#064e3b" />
                
                <rect x="10" y="80" width="30" height="30" fill="#064e3b" />
                <rect x="15" y="85" width="20" height="20" fill="#ffffff" />
                <rect x="20" y="90" width="10" height="10" fill="#064e3b" />
                
                {/* Data Dots */}
                <circle cx="50" cy="20" r="4" fill="#064e3b" />
                <circle cx="65" cy="20" r="3" fill="#064e3b" />
                <circle cx="55" cy="35" r="4" fill="#064e3b" />
                <rect x="48" y="48" width="24" height="24" fill="#059669" rx="3" />
                <circle cx="60" cy="60" r="5" fill="#ffffff" />
                <circle cx="25" cy="55" r="4" fill="#064e3b" />
                <circle cx="95" cy="55" r="4" fill="#064e3b" />
                <circle cx="50" cy="85" r="3" fill="#064e3b" />
                <circle cx="65" cy="95" r="4" fill="#064e3b" />
                <circle cx="85" cy="85" r="4" fill="#064e3b" />
                <circle cx="100" cy="95" r="3" fill="#064e3b" />
              </svg>
              <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600, display: 'block', marginTop: '6px' }}>
                SCAN AT MANDI GATE
              </span>
            </div>

            {/* Token details list */}
            <div style={{ flex: 1, fontSize: '0.85rem' }}>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Farmer Name:</span>
                <strong style={{ display: 'block', color: '#0f172a' }}>{tokenData.farmerName}</strong>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Assigned Mandi:</span>
                <strong style={{ display: 'block', color: '#0f172a' }}>{tokenData.centreName || 'Karnal Central APMC Mandi'}</strong>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div>
                  <span style={{ color: '#64748b' }}>Slot Time:</span>
                  <strong style={{ display: 'block', color: '#047857' }}>{tokenData.slotTime}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b' }}>Vehicle:</span>
                  <strong style={{ display: 'block', color: '#0f172a' }}>{tokenData.vehicleNo || 'HR-05-TJ-9901'}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Crop & MSP specifications */}
          <div style={{
            background: '#f8fafc',
            borderRadius: '10px',
            padding: '12px 16px',
            border: '1px solid #e2e8f0',
            fontSize: '0.825rem',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Declared Crop:</span>
              <strong style={{ color: '#0f172a' }}>{tokenData.crop}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Expected Quantity:</span>
              <strong style={{ color: '#0f172a' }}>{tokenData.quantityQuintals} Quintals</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Applicable MSP Rate:</span>
              <strong style={{ color: '#047857' }}>₹2,320 / Quintal</strong>
            </div>
          </div>

          <p style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center', margin: '0 0 16px 0' }}>
            {t.scanInstructions}
          </p>

          {/* Action buttons */}
          <div className="no-print" style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => window.print()}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              <Printer size={16} />
              <span>Print / Download E-Pass</span>
            </button>
            <button 
              onClick={onClose}
              className="btn btn-outline"
              style={{ padding: '10px 20px' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
