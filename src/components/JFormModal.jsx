import React from 'react';
import { FileText, Printer, CheckCircle2, ShieldCheck, X } from 'lucide-react';

export function JFormModal({ isOpen, onClose, data, t }) {
  if (!isOpen || !data) return null;

  const netWeightQuintals = ((data.grossKg - data.tareKg) / 100).toFixed(2);
  const mspRate = 2320;
  const totalAmount = (netWeightQuintals * mspRate).toLocaleString('en-IN');

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
        maxWidth: '560px',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '2px solid #047857'
      }}>
        {/* J-Form Header */}
        <div style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
          color: '#ffffff',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="#34d399" />
              <span style={{ fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#a7f3d0' }}>
                FOOD CORPORATION OF INDIA & STATE APMC
              </span>
            </div>
            <h3 style={{ margin: '4px 0 0 0', color: '#ffffff', fontSize: '1.2rem' }}>
              FORM 'J' - SALE / PROCUREMENT CERTIFICATE
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

        {/* Certificate Body */}
        <div style={{ padding: '24px', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '14px' }}>
            <div>
              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>J-Form Certificate No:</span>
              <strong style={{ display: 'block', color: '#0f172a' }}>JF-20261004-98124</strong>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Transaction Date:</span>
              <strong style={{ display: 'block', color: '#0f172a' }}>04-Oct-2026</strong>
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div><span style={{ color: '#64748b' }}>Farmer Name:</span> <strong>{data.farmerName}</strong></div>
              <div><span style={{ color: '#64748b' }}>Token No:</span> <strong>{data.token}</strong></div>
              <div><span style={{ color: '#64748b' }}>Crop Variety:</span> <strong>{data.crop}</strong></div>
              <div><span style={{ color: '#64748b' }}>Vehicle:</span> <strong>{data.vehicleNo}</strong></div>
            </div>
          </div>

          {/* Weighment & Quality Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px', textAlign: 'left', fontSize: '0.825rem' }}>
            <thead>
              <tr style={{ background: '#ecfdf5', color: '#065f46', borderBottom: '1px solid #a7f3d0' }}>
                <th style={{ padding: '8px' }}>Parameter</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>Measurement</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>Standard Spec</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '8px' }}>Gross Weight (Loaded)</td>
                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 600 }}>{data.grossKg || 7850} kg</td>
                <td style={{ padding: '8px', textAlign: 'right', color: '#64748b' }}>Computerized Bridge</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '8px' }}>Tare Weight (Empty)</td>
                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 600 }}>{data.tareKg || 3350} kg</td>
                <td style={{ padding: '8px', textAlign: 'right', color: '#64748b' }}>Post-Unload</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '8px' }}>Net Procured Produce</td>
                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700, color: '#047857' }}>
                  {netWeightQuintals} Quintals
                </td>
                <td style={{ padding: '8px', textAlign: 'right', color: '#64748b' }}>Tolerance Passed</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '8px' }}>Moisture Content</td>
                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700, color: '#059669' }}>
                  {data.moisturePercent || 16.2}%
                </td>
                <td style={{ padding: '8px', textAlign: 'right', color: '#059669' }}>Standard (≤ 17.0%)</td>
              </tr>
              <tr style={{ background: '#f8fafc', fontWeight: 700 }}>
                <td style={{ padding: '8px' }}>MSP Rate per Quintal</td>
                <td style={{ padding: '8px', textAlign: 'right', color: '#047857' }}>₹{mspRate.toLocaleString('en-IN')}</td>
                <td style={{ padding: '8px', textAlign: 'right', color: '#64748b' }}>Govt Mandate</td>
              </tr>
            </tbody>
          </table>

          {/* Total Amount & Direct Bank Transfer Banner */}
          <div style={{
            background: '#ecfdf5',
            border: '1.5px solid #10b981',
            borderRadius: '10px',
            padding: '14px',
            marginBottom: '18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 700 }}>TOTAL MSP PAYABLE AMOUNT</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#064e3b' }}>
                ₹{totalAmount}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="badge badge-green" style={{ marginBottom: '4px' }}>
                <CheckCircle2 size={12} />
                DBT APPROVED
              </span>
              <span style={{ display: 'block', fontSize: '0.7rem', color: '#065f46' }}>
                PFMS Ref: UTR-SBIN-20261004-991
              </span>
            </div>
          </div>

          <div className="no-print" style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => window.print()}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              <Printer size={16} />
              <span>Print Official J-Form</span>
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
