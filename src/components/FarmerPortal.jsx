import React, { useState } from 'react';
import { 
  Sprout, 
  MapPin, 
  Calendar, 
  Clock, 
  Truck, 
  CheckCircle2, 
  AlertCircle, 
  QrCode, 
  FileText, 
  ArrowRight, 
  Coins, 
  ShieldCheck, 
  TrendingUp, 
  Info,
  ChevronRight
} from 'lucide-react';
import { CROPS_CATALOG, CENTRES, INITIAL_SLOTS, PROCUREMENT_STAGES } from '../data/mockData';

export function FarmerPortal({ 
  t, 
  queue, 
  mandiDelayMins, 
  onOpenTokenModal, 
  onOpenJFormModal,
  userBooking,
  setUserBooking 
}) {
  // Local state for interactive booking
  const [selectedCropId, setSelectedCropId] = useState('crop-paddy-a');
  const [quantityQuintals, setQuantityQuintals] = useState(40);
  const [harvestDate, setHarvestDate] = useState('2026-10-05');
  const [vehicleType, setVehicleType] = useState('Tractor-Trolley (HR-05-TJ-9901)');
  const [selectedCentreId, setSelectedCentreId] = useState('CTR-KNL-01');
  const [selectedSlotId, setSelectedSlotId] = useState('slot-2');
  const [bookingSuccessBanner, setBookingSuccessBanner] = useState(false);

  const selectedCrop = CROPS_CATALOG.find(c => c.id === selectedCropId) || CROPS_CATALOG[0];
  const selectedCentre = CENTRES.find(c => c.id === selectedCentreId) || CENTRES[0];
  const selectedSlot = INITIAL_SLOTS.find(s => s.id === selectedSlotId) || INITIAL_SLOTS[1];

  const estimatedMspValue = (quantityQuintals * selectedCrop.msp).toLocaleString('en-IN');

  // Find user's entry in the live queue
  const farmerQueueItem = queue.find(item => item.isCurrentFarmer || item.token === userBooking.token);
  const currentStageKey = farmerQueueItem ? farmerQueueItem.stage : userBooking.stage || 'SLOT_SCHEDULED';
  
  // Calculate queue rank
  const activeUnfinishedQueue = queue.filter(item => item.stage !== 'PROCUREMENT_COMPLETED');
  const userRankIndex = activeUnfinishedQueue.findIndex(item => item.isCurrentFarmer || item.token === userBooking.token);
  const queueRank = userRankIndex >= 0 ? userRankIndex + 1 : 1;
  const vehiclesAhead = Math.max(0, queueRank - 1);

  // Dynamic wait time calculation using Phase 2 Formula:
  // EWT = (VehiclesAhead * ServiceTimePerVehicle) + MandiDelay
  const nominalServiceMinsPerVehicle = 12;
  const calculatedWaitMins = (vehiclesAhead * nominalServiceMinsPerVehicle) + mandiDelayMins;

  const handleBookSlot = (e) => {
    e.preventDefault();
    const newToken = `TK-20261004-KNL-0${Math.floor(10 + Math.random() * 89)}`;
    const updatedBooking = {
      token: newToken,
      farmerName: 'Satvik Jaiswal (You)',
      phone: '+91 98112-24009',
      crop: selectedCrop.name,
      quantityQuintals: Number(quantityQuintals),
      vehicleNo: 'HR-05-TJ-9901',
      centreId: selectedCentre.id,
      centreName: selectedCentre.name,
      slotId: selectedSlot.id,
      slotTime: selectedSlot.time,
      stage: 'SLOT_SCHEDULED',
      grossKg: 0,
      tareKg: 0,
      moisturePercent: 0,
      isCurrentFarmer: true
    };
    setUserBooking(updatedBooking);
    setBookingSuccessBanner(true);
    setTimeout(() => setBookingSuccessBanner(false), 6000);
  };

  const getStageIndex = (stageKey) => {
    const idx = PROCUREMENT_STAGES.findIndex(s => s.key === stageKey);
    return idx >= 0 ? idx : 0;
  };

  const currentStageIndex = getStageIndex(currentStageKey);

  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="container">
        {/* Farmer Profile Card & DBT Identity */}
        <div className="glass-card" style={{
          padding: '20px 24px',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          borderLeft: '5px solid #059669'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-green">KYC & Aadhaar Verified</span>
              <span className="badge badge-blue">KMS 2025–26</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', color: '#064e3b', margin: 0 }}>
              {t.welcomeFarmer}: Satvik Jaiswal
            </h2>
            <p style={{ color: '#475569', fontSize: '0.875rem', margin: '4px 0 0 0' }}>
              {t.farmerId} • {t.farmerCategory} • Village: Nilokheri, Karnal (HR)
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{
              background: '#ffffff',
              padding: '10px 16px',
              borderRadius: '10px',
              border: '1px solid #d1fae5',
              textAlign: 'right'
            }}>
              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>DBT BANK ACCOUNT</span>
              <strong style={{ display: 'block', color: '#064e3b', fontSize: '0.9rem' }}>SBI •••• 9812</strong>
              <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>Direct MSP Transfer Ready</span>
            </div>

            <button 
              onClick={() => onOpenTokenModal(userBooking)}
              className="btn btn-outline"
              style={{ padding: '10px 16px' }}
            >
              <QrCode size={18} color="#059669" />
              <span>View E-Pass</span>
            </button>
          </div>
        </div>

        {/* Real-time Dynamic Delay Notification Banner */}
        {mandiDelayMins > 0 && (
          <div style={{
            background: '#fffbeb',
            border: '1.5px solid #f59e0b',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)'
          }}>
            <div style={{
              background: '#fef3c7',
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <AlertCircle size={24} color="#d97706" />
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ color: '#92400e', fontSize: '0.95rem', display: 'block' }}>
                Mandi Operational Delay Alert (+{mandiDelayMins} mins dynamic offset)
              </strong>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#78350f' }}>
                Karnal Central APMC Mandi is operating slightly behind schedule due to high intake volume and weighbridge calibration. 
                <strong> The smart scheduling engine has automatically adjusted your recommended arrival window to prevent queue congestion outside the gate.</strong>
              </p>
            </div>
          </div>
        )}

        {/* Success Alert Banner on booking */}
        {bookingSuccessBanner && (
          <div style={{
            background: '#ecfdf5',
            border: '1.5px solid #10b981',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <CheckCircle2 size={24} color="#059669" />
            <div>
              <strong style={{ color: '#064e3b', fontSize: '0.95rem' }}>
                Slot Successfully Booked! Digital E-Pass Generated: {userBooking.token}
              </strong>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#047857' }}>
                SMS with Token & QR link sent to your registered mobile number (+91 98112-24009).
              </p>
            </div>
          </div>
        )}

        {/* Section: Live Dynamic Queue Tracker (Step 4 Highlight) */}
        <div className="glass-card" style={{ padding: '24px', marginBottom: '28px', borderTop: '4px solid #10b981' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="pulse-indicator" />
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#064e3b' }}>
                  {t.step4Title}
                </h3>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
                Real-time queue monitoring at <strong>{selectedCentre.name}</strong> • Gate #1
              </p>
            </div>

            <span className="badge badge-green" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
              Token: {userBooking.token}
            </span>
          </div>

          {/* Dynamic ETA Metrics Grid */}
          <div className="grid-4" style={{ marginBottom: '24px' }}>
            {/* Metric 1: Queue Rank */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                {t.livePosition}
              </span>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#064e3b', margin: '4px 0' }}>
                #{queueRank}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                {vehiclesAhead} vehicles ahead of you
              </span>
            </div>

            {/* Metric 2: Estimated Wait Time */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                {t.estWaitTime}
              </span>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: mandiDelayMins > 0 ? '#d97706' : '#047857', margin: '4px 0' }}>
                {calculatedWaitMins} <span style={{ fontSize: '1rem', fontWeight: 600 }}>mins</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                Formula: ({vehiclesAhead} × 12m) {mandiDelayMins > 0 ? `+ ${mandiDelayMins}m delay` : ''}
              </span>
            </div>

            {/* Metric 3: Recommended Arrival Window */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                {t.recommendedArrival}
              </span>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '8px 0 4px 0' }}>
                {mandiDelayMins > 0 ? '10:45 AM' : '10:15 AM'}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                {mandiDelayMins > 0 ? 'Shifted +30m to avoid wait' : 'Arrive on scheduled time'}
              </span>
            </div>

            {/* Metric 4: Centre Capacity Load */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                Mandi Intake Load
              </span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>
                {Math.round((selectedCentre.currentBookedQuintals / selectedCentre.dailyCapacityQuintals) * 100)}%
              </div>
              <div style={{
                background: '#e2e8f0',
                height: '6px',
                borderRadius: '3px',
                overflow: 'hidden',
                marginTop: '8px'
              }}>
                <div style={{
                  background: '#059669',
                  height: '100%',
                  width: `${(selectedCentre.currentBookedQuintals / selectedCentre.dailyCapacityQuintals) * 100}%`
                }} />
              </div>
            </div>
          </div>

          {/* Active Queue Visual Track */}
          <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '16px', border: '1px solid #a7f3d0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#064e3b' }}>
                LIVE MANDI VEHICLE PROGRESSION
              </span>
              <span style={{ fontSize: '0.75rem', color: '#047857' }}>
                Updated 10 seconds ago via WebSockets
              </span>
            </div>

            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '6px' }}>
              {queue.map((item, index) => {
                const isUser = item.isCurrentFarmer || item.token === userBooking.token;
                return (
                  <div key={item.id} style={{
                    minWidth: '190px',
                    background: isUser ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                    border: isUser ? '2px solid #059669' : '1px solid #cbd5e1',
                    borderRadius: '10px',
                    padding: '12px',
                    boxShadow: isUser ? '0 4px 14px rgba(5, 150, 105, 0.2)' : 'none',
                    position: 'relative'
                  }}>
                    {isUser && (
                      <span style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '10px',
                        background: '#059669',
                        color: '#ffffff',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '999px'
                      }}>
                        YOUR PASS
                      </span>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>
                        #{index + 1}
                      </span>
                      <span className={`badge ${
                        item.stage === 'PROCUREMENT_COMPLETED' ? 'badge-green' :
                        item.stage === 'WEIGHBRIDGE_IN' ? 'badge-amber' : 'badge-blue'
                      }`} style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                        {item.stage.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <strong style={{ display: 'block', fontSize: '0.85rem', color: '#0f172a' }}>
                      {item.farmerName}
                    </strong>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', marginTop: '2px' }}>
                      {item.token} • {item.quantityQuintals} Q
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Registration & Slot Booking vs Procurement Lifecycle */}
        <div className="grid-2">
          {/* Column 1: Step 1 (Crop) & Step 2 (Slot Booking) */}
          <div>
            <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Sprout size={20} color="#059669" />
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#064e3b' }}>
                  {t.step1Title}
                </h3>
              </div>

              <form onSubmit={handleBookSlot}>
                {/* Crop Variety Select */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    {t.selectCrop}
                  </label>
                  <select
                    value={selectedCropId}
                    onChange={(e) => setSelectedCropId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.9rem',
                      outline: 'none',
                      background: '#ffffff'
                    }}
                  >
                    {CROPS_CATALOG.map(crop => (
                      <option key={crop.id} value={crop.id}>
                        {crop.name} — MSP: ₹{crop.msp.toLocaleString('en-IN')}/Q (Max Moisture: {crop.standardMoisture}%)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity and Harvest Date */}
                <div className="grid-2" style={{ marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      {t.quantityQuintals}
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="500"
                      value={quantityQuintals}
                      onChange={(e) => setQuantityQuintals(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      {t.harvestDate}
                    </label>
                    <input
                      type="date"
                      value={harvestDate}
                      onChange={(e) => setHarvestDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                      required
                    />
                  </div>
                </div>

                {/* MSP Value Calculation Pill */}
                <div style={{
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Coins size={18} color="#059669" />
                    <span style={{ fontSize: '0.825rem', color: '#065f46', fontWeight: 600 }}>
                      Guaranteed MSP Payout:
                    </span>
                  </div>
                  <strong style={{ fontSize: '1.1rem', color: '#064e3b' }}>
                    ₹{estimatedMspValue}
                  </strong>
                </div>

                {/* Step 2: Mandi & Slot Selection */}
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                    <MapPin size={20} color="#059669" />
                    <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#064e3b' }}>
                      {t.step2Title}
                    </h3>
                  </div>

                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    {t.selectCentre}
                  </label>
                  <select
                    value={selectedCentreId}
                    onChange={(e) => setSelectedCentreId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.9rem',
                      outline: 'none',
                      marginBottom: '16px',
                      background: '#ffffff'
                    }}
                  >
                    {CENTRES.map(centre => (
                      <option key={centre.id} value={centre.id}>
                        {centre.name} ({centre.district}, {centre.state}) — {centre.distanceKm} km away [Avg Wait: {centre.avgWaitMins}m]
                      </option>
                    ))}
                  </select>

                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                    {t.availableSlots} (Tomorrow - 05 Oct 2026)
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                    {INITIAL_SLOTS.map(slot => {
                      const isSelected = slot.id === selectedSlotId;
                      const isFull = slot.status === 'Full';
                      return (
                        <div
                          key={slot.id}
                          onClick={() => !isFull && setSelectedSlotId(slot.id)}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: isSelected ? '2px solid #059669' : '1px solid #e2e8f0',
                            background: isSelected ? '#ecfdf5' : isFull ? '#f1f5f9' : '#ffffff',
                            cursor: isFull ? 'not-allowed' : 'pointer',
                            opacity: isFull ? 0.6 : 1,
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Clock size={16} color={isSelected ? '#059669' : '#64748b'} />
                            <strong style={{ fontSize: '0.875rem', color: isSelected ? '#064e3b' : '#334155' }}>
                              {slot.time}
                            </strong>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                              Capacity: {slot.booked}/{slot.maxCapacity} vehicles
                            </span>
                            <span className={`badge ${
                              slot.status === 'Full' ? 'badge-red' :
                              slot.status === 'Fast Filling' ? 'badge-amber' : 'badge-green'
                            }`} style={{ fontSize: '0.65rem' }}>
                              {slot.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
                >
                  <CheckCircle2 size={18} />
                  <span>{t.bookSlotBtn}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Step 5 Procurement Journey Timeline */}
          <div>
            <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={20} color="#059669" />
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#064e3b' }}>
                    {t.step5Title}
                  </h3>
                </div>

                <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>
                  Trackable Life-Cycle
                </span>
              </div>

              {/* Progress Stepper Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
                {PROCUREMENT_STAGES.map((stage, idx) => {
                  const isDone = idx < currentStageIndex;
                  const isCurrent = idx === currentStageIndex;
                  const isPending = idx > currentStageIndex;

                  return (
                    <div key={stage.key} style={{ display: 'flex', gap: '14px', position: 'relative' }}>
                      {/* Circle Indicator */}
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        flexShrink: 0,
                        background: isDone ? '#059669' : isCurrent ? '#f59e0b' : '#e2e8f0',
                        color: isDone || isCurrent ? '#ffffff' : '#64748b',
                        boxShadow: isCurrent ? '0 0 0 4px #fef3c7' : 'none',
                        zIndex: 2
                      }}>
                        {isDone ? <CheckCircle2 size={18} /> : idx + 1}
                      </div>

                      {/* Line connector */}
                      {idx < PROCUREMENT_STAGES.length - 1 && (
                        <div style={{
                          position: 'absolute',
                          left: '15px',
                          top: '32px',
                          bottom: '-16px',
                          width: '2px',
                          background: idx < currentStageIndex ? '#059669' : '#e2e8f0',
                          zIndex: 1
                        }} />
                      )}

                      {/* Stage Content */}
                      <div style={{
                        flex: 1,
                        background: isCurrent ? '#fefce8' : '#ffffff',
                        border: isCurrent ? '1.5px solid #fef08a' : '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '12px 16px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ fontSize: '0.9rem', color: isCurrent ? '#92400e' : '#0f172a' }}>
                            {stage.label}
                          </strong>
                          <span className={`badge ${
                            isDone ? 'badge-green' : isCurrent ? 'badge-amber' : 'badge-blue'
                          }`} style={{ fontSize: '0.65rem' }}>
                            {isDone ? 'Completed' : isCurrent ? 'Active Now' : 'Pending'}
                          </span>
                        </div>
                        <p style={{ margin: '4px 0 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                          {stage.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* J-Form / Payment Trigger */}
              <div style={{ marginTop: '24px', borderTop: '1px solid #e2e8f0', paddingTop: '18px' }}>
                <button
                  onClick={() => onOpenJFormModal(userBooking)}
                  className="btn btn-outline"
                  style={{ width: '100%', padding: '12px' }}
                >
                  <FileText size={18} color="#059669" />
                  <span>View Official J-Form Certificate & DBT Payment Ledger</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
