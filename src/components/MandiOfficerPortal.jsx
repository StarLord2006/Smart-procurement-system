import React, { useState } from 'react';
import { 
  Building2, 
  Scale, 
  Droplet, 
  CheckCircle2, 
  AlertTriangle, 
  PlusCircle, 
  Clock, 
  QrCode, 
  ArrowRight, 
  FileCheck, 
  Truck,
  RotateCcw,
  Zap
} from 'lucide-react';
import { PROCUREMENT_STAGES } from '../data/mockData';

export function MandiOfficerPortal({ 
  t, 
  queue, 
  setQueue, 
  mandiDelayMins, 
  setMandiDelayMins, 
  onOpenJFormModal,
  onNotify
}) {
  const [tokenInput, setTokenInput] = useState('');
  const [activeItem, setActiveItem] = useState(queue[0] || null);
  const [grossInput, setGrossInput] = useState(activeItem ? activeItem.grossKg || 7850 : 7850);
  const [tareInput, setTareInput] = useState(activeItem ? activeItem.tareKg || 3350 : 3350);
  const [moistureInput, setMoistureInput] = useState(activeItem ? activeItem.moisturePercent || 16.2 : 16.2);

  // Synchronize inputs when selecting another farmer in the queue
  const handleSelectFarmer = (item) => {
    setActiveItem(item);
    setGrossInput(item.grossKg || 7850);
    setTareInput(item.tareKg || 3350);
    setMoistureInput(item.moisturePercent || 16.2);
  };

  // Fast Gate Check-In by Token
  const handleCheckInByToken = (e) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    
    let matched = false;
    const updated = queue.map(item => {
      if (item.token.toLowerCase() === tokenInput.trim().toLowerCase()) {
        matched = true;
        return { ...item, stage: 'GATE_CHECKIN' };
      }
      return item;
    });

    if (matched) {
      setQueue(updated);
      onNotify(`Gate Check-in Verified: Token ${tokenInput.toUpperCase()} entry barrier opened.`);
      setTokenInput('');
    } else {
      onNotify(`Token ${tokenInput} not found in today's scheduled roster.`, 'error');
    }
  };

  // Stage Advancement Handler
  const handleAdvanceStage = (itemId, targetStage) => {
    const updated = queue.map(item => {
      if (item.id === itemId) {
        const netKg = Math.max(0, Number(grossInput) - Number(tareInput));
        return {
          ...item,
          stage: targetStage,
          grossKg: Number(grossInput),
          tareKg: Number(tareInput),
          moisturePercent: Number(moistureInput),
          netQuintals: (netKg / 100).toFixed(2)
        };
      }
      return item;
    });
    setQueue(updated);
    
    // Update local active item
    const current = updated.find(it => it.id === itemId);
    if (current) setActiveItem(current);

    onNotify(`Vehicle ${current?.token} advanced to stage: ${targetStage.replace(/_/g, ' ')}`);
  };

  // Simulate Delay Injection
  const toggleDelay = (mins) => {
    if (mandiDelayMins > 0) {
      setMandiDelayMins(0);
      onNotify("Mandi operations returned to normal nominal throughput (0 delay).");
    } else {
      setMandiDelayMins(mins);
      onNotify(`Dynamic bottleneck injected: +${mins}m added. All waiting farmers' ETAs recalculated!`, 'warning');
    }
  };

  // Simulate adding a random arrival
  const handleAddRandomArrival = () => {
    const newId = `Q-${Math.floor(100 + Math.random() * 900)}`;
    const randomTokens = ['HR-KNL-901', 'PB-LDH-442', 'UP-BR-551', 'HR-KNL-109'];
    const chosenToken = `TK-20261004-${randomTokens[Math.floor(Math.random() * randomTokens.length)]}`;
    const newItem = {
      id: newId,
      token: chosenToken,
      farmerName: 'Kulwinder Singh',
      phone: '+91 98721-00998',
      crop: 'Paddy (Grade A)',
      quantityQuintals: 45,
      vehicleNo: `HR-05-TX-${Math.floor(1000 + Math.random() * 9000)}`,
      slotTime: '10:00 AM – 12:00 PM',
      stage: 'GATE_CHECKIN',
      grossKg: 0,
      tareKg: 0,
      moisturePercent: 0,
      serviceMinsLeft: 14
    };
    setQueue([...queue, newItem]);
    onNotify(`New arrival recorded: ${newItem.farmerName} checked in with token ${newItem.token}.`);
  };

  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="container">
        {/* Mandi Officer Header Banner */}
        <div className="glass-card" style={{
          padding: '20px 24px',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          borderLeft: '5px solid #064e3b'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-green">Mandi Station Active</span>
              <span className="badge badge-blue">Karnal Weighbridge Station #01</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', color: '#064e3b', margin: 0 }}>
              {t.mandiConsoleTitle}
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
              Weighbridge Officer: Inspector R.K. Hooda • APMC Terminal Terminal #04
            </p>
          </div>

          {/* Interactive Simulation Action Pills */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => toggleDelay(25)}
              className={mandiDelayMins > 0 ? "btn btn-outline" : "btn btn-warning"}
              style={{ padding: '8px 14px', fontSize: '0.825rem' }}
            >
              <AlertTriangle size={15} />
              <span>{mandiDelayMins > 0 ? t.clearDelay : t.simulateDelay}</span>
            </button>

            <button
              onClick={handleAddRandomArrival}
              className="btn btn-outline"
              style={{ padding: '8px 14px', fontSize: '0.825rem' }}
            >
              <PlusCircle size={15} color="#059669" />
              <span>Simulate Farmer Arrival</span>
            </button>
          </div>
        </div>

        {/* Top Fast Check-In Bar */}
        <div className="glass-card" style={{ padding: '18px 24px', marginBottom: '24px' }}>
          <form onSubmit={handleCheckInByToken} style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <QrCode size={20} color="#059669" />
              <strong style={{ fontSize: '0.9rem', color: '#064e3b' }}>Fast Gate Check-In:</strong>
            </div>
            <input
              type="text"
              placeholder="Enter or scan token (e.g., TK-20261004-KNL-041)"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              style={{
                flex: 1,
                minWidth: '240px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '10px 18px' }}>
              <CheckCircle2 size={16} />
              <span>Verify & Check In</span>
            </button>
          </form>
        </div>

        {/* 2-Column: Left = Active Queue Table, Right = Active Vehicle Weighment & QA Processing */}
        <div className="grid-2">
          {/* Column 1: Active Queue Table */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#064e3b', margin: 0 }}>
                {t.activeVehiclesInQueue} ({queue.length})
              </h3>
              <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                Live Stream
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '10px 8px' }}>Token & Farmer</th>
                    <th style={{ padding: '10px 8px' }}>Crop / Qty</th>
                    <th style={{ padding: '10px 8px' }}>Current Stage</th>
                    <th style={{ padding: '10px 8px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {queue.map(item => {
                    const isSelected = activeItem && activeItem.id === item.id;
                    return (
                      <tr 
                        key={item.id}
                        onClick={() => handleSelectFarmer(item)}
                        style={{
                          borderBottom: '1px solid #f1f5f9',
                          background: isSelected ? '#ecfdf5' : 'transparent',
                          cursor: 'pointer',
                          transition: 'background 0.15s'
                        }}
                      >
                        <td style={{ padding: '10px 8px' }}>
                          <strong style={{ display: 'block', color: '#0f172a' }}>{item.farmerName}</strong>
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.token}</span>
                        </td>
                        <td style={{ padding: '10px 8px' }}>
                          <span style={{ display: 'block', color: '#0f172a', fontWeight: 600 }}>{item.quantityQuintals} Q</span>
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.crop}</span>
                        </td>
                        <td style={{ padding: '10px 8px' }}>
                          <span className={`badge ${
                            item.stage === 'PROCUREMENT_COMPLETED' ? 'badge-green' :
                            item.stage === 'WEIGHBRIDGE_IN' ? 'badge-amber' :
                            item.stage === 'MOISTURE_QUALITY_TEST' ? 'badge-blue' : 'badge-blue'
                          }`} style={{ fontSize: '0.62rem' }}>
                            {item.stage.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td style={{ padding: '10px 8px', textAlign: 'right' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectFarmer(item);
                            }}
                            className="btn btn-outline"
                            style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Column 2: Selected Vehicle Weighment & QA Processing Station */}
          {activeItem ? (
            <div className="glass-card" style={{ padding: '24px', borderTop: '4px solid #059669' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <span className="badge badge-green" style={{ marginBottom: '4px' }}>
                    Active Terminal Inspection
                  </span>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#064e3b' }}>
                    {activeItem.farmerName}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Token: {activeItem.token} • Vehicle: {activeItem.vehicleNo}
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Current Stage</span>
                  <strong style={{ color: '#047857', fontSize: '0.9rem' }}>
                    {activeItem.stage.replace(/_/g, ' ')}
                  </strong>
                </div>
              </div>

              {/* Gross Weight, Tare Weight, Moisture Inputs */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
                <div className="grid-2" style={{ marginBottom: '14px' }}>
                  {/* Gross Weight */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      {t.grossWeight}
                    </label>
                    <input
                      type="number"
                      value={grossInput}
                      onChange={(e) => setGrossInput(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: '#064e3b'
                      }}
                    />
                  </div>

                  {/* Tare Weight */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      {t.tareWeight}
                    </label>
                    <input
                      type="number"
                      value={tareInput}
                      onChange={(e) => setTareInput(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: '#334155'
                      }}
                    />
                  </div>
                </div>

                {/* Net Produce Computed Live */}
                <div style={{
                  background: '#ecfdf5',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px'
                }}>
                  <span style={{ fontSize: '0.825rem', color: '#065f46', fontWeight: 600 }}>
                    Computed Net Quantity:
                  </span>
                  <strong style={{ fontSize: '1.15rem', color: '#064e3b' }}>
                    {((Math.max(0, grossInput - tareInput)) / 100).toFixed(2)} Quintals
                  </strong>
                </div>

                {/* Moisture Content & QA Verification */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>
                      {t.moisture} (Calibrated Electronic Meter)
                    </label>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: Number(moistureInput) <= 17.0 ? '#059669' : '#d97706'
                    }}>
                      {Number(moistureInput) <= 17.0 ? '✓ Standard Compliant (≤ 17%)' : '⚠ Moisture Exceeded (> 17%)'}
                    </span>
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    value={moistureInput}
                    onChange={(e) => setMoistureInput(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: Number(moistureInput) <= 17.0 ? '1.5px solid #10b981' : '1.5px solid #f59e0b',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: '#0f172a'
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons for Current Stage */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeItem.stage === 'SLOT_SCHEDULED' && (
                  <button
                    onClick={() => handleAdvanceStage(activeItem.id, 'GATE_CHECKIN')}
                    className="btn btn-primary"
                    style={{ padding: '12px' }}
                  >
                    <CheckCircle2 size={16} />
                    <span>Authorize Gate Entry & Scan Pass</span>
                  </button>
                )}

                {activeItem.stage === 'GATE_CHECKIN' && (
                  <button
                    onClick={() => handleAdvanceStage(activeItem.id, 'WEIGHBRIDGE_IN')}
                    className="btn btn-primary"
                    style={{ padding: '12px' }}
                  >
                    <Scale size={16} />
                    <span>Record Gross Weight at Weighbridge</span>
                  </button>
                )}

                {activeItem.stage === 'WEIGHBRIDGE_IN' && (
                  <button
                    onClick={() => handleAdvanceStage(activeItem.id, 'MOISTURE_QUALITY_TEST')}
                    className="btn btn-primary"
                    style={{ padding: '12px' }}
                  >
                    <Droplet size={16} />
                    <span>Verify Grain Moisture & Grade</span>
                  </button>
                )}

                {activeItem.stage === 'MOISTURE_QUALITY_TEST' && (
                  <button
                    onClick={() => handleAdvanceStage(activeItem.id, 'WEIGHBRIDGE_OUT')}
                    className="btn btn-primary"
                    style={{ padding: '12px' }}
                  >
                    <Scale size={16} />
                    <span>Authorize Unload & Record Tare Weight</span>
                  </button>
                )}

                {activeItem.stage === 'WEIGHBRIDGE_OUT' && (
                  <button
                    onClick={() => handleAdvanceStage(activeItem.id, 'PROCUREMENT_COMPLETED')}
                    className="btn btn-primary"
                    style={{ padding: '12px' }}
                  >
                    <FileCheck size={16} />
                    <span>Finalize Procurement & Authorize J-Form</span>
                  </button>
                )}

                {activeItem.stage === 'PROCUREMENT_COMPLETED' && (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => onOpenJFormModal(activeItem)}
                      className="btn btn-primary"
                      style={{ flex: 1, padding: '12px' }}
                    >
                      <FileCheck size={16} />
                      <span>{t.issueReceipt}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              Select a vehicle from the queue to process.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
