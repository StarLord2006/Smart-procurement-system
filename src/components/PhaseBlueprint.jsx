import React, { useState } from 'react';
import { 
  FileText, 
  Database, 
  Layers, 
  Cpu, 
  GraduationCap, 
  CheckCircle2, 
  Code, 
  Server, 
  ShieldCheck, 
  Clock,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export function PhaseBlueprint() {
  const [activeTab, setActiveTab] = useState('phase1');

  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="container">
        {/* Academic Header Banner */}
        <div className="glass-card" style={{
          padding: '24px',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
          color: '#ffffff',
          borderLeft: '6px solid #10b981'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <GraduationCap size={20} color="#34d399" />
                <span style={{ fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#a7f3d0', fontWeight: 700 }}>
                  Galgotias College of Engineering & Technology, Greater Noida
                </span>
              </div>
              <h2 style={{ fontSize: '1.6rem', color: '#ffffff', margin: 0 }}>
                Phase 1 & Phase 2 System Architecture & Specification Blueprint
              </h2>
              <p style={{ color: '#d1fae5', fontSize: '0.9rem', margin: '6px 0 0 0' }}>
                B.Tech in Information Technology • Semester V • Team Code: <strong>28IT03</strong> • Session 2026–27
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.12)',
              padding: '12px 18px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.85rem'
            }}>
              <span style={{ color: '#a7f3d0', display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>PROJECT SUPERVISOR</span>
              <strong style={{ fontSize: '1rem', color: '#ffffff' }}>Dr. Meenakshi Yadav</strong>
              <div style={{ marginTop: '6px', fontSize: '0.78rem', color: '#f8fafc' }}>
                Team Members: Rajnish (098), Raj Gupta (096), Satvik Jaiswal (109)
              </div>
            </div>
          </div>
        </div>

        {/* Blueprint Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          borderBottom: '2px solid #e2e8f0',
          paddingBottom: '8px',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => setActiveTab('phase1')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              background: activeTab === 'phase1' ? '#059669' : '#ffffff',
              color: activeTab === 'phase1' ? '#ffffff' : '#475569',
              boxShadow: activeTab === 'phase1' ? '0 4px 12px rgba(5,150,105,0.25)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <FileText size={16} />
            <span>Phase 1: Requirement Analysis</span>
          </button>

          <button
            onClick={() => setActiveTab('phase2-arch')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              background: activeTab === 'phase2-arch' ? '#059669' : '#ffffff',
              color: activeTab === 'phase2-arch' ? '#ffffff' : '#475569',
              boxShadow: activeTab === 'phase2-arch' ? '0 4px 12px rgba(5,150,105,0.25)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Layers size={16} />
            <span>Phase 2: 5-Layer System Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('phase2-db')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              background: activeTab === 'phase2-db' ? '#059669' : '#ffffff',
              color: activeTab === 'phase2-db' ? '#ffffff' : '#475569',
              boxShadow: activeTab === 'phase2-db' ? '0 4px 12px rgba(5,150,105,0.25)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Database size={16} />
            <span>Database Schema & Tables</span>
          </button>

          <button
            onClick={() => setActiveTab('phase2-math')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              background: activeTab === 'phase2-math' ? '#059669' : '#ffffff',
              color: activeTab === 'phase2-math' ? '#ffffff' : '#475569',
              boxShadow: activeTab === 'phase2-math' ? '0 4px 12px rgba(5,150,105,0.25)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Cpu size={16} />
            <span>Smart Scheduling & Dynamic ETA Formulation</span>
          </button>
        </div>

        {/* Tab 1: Phase 1 Requirements Analysis */}
        {activeTab === 'phase1' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ color: '#064e3b', fontSize: '1.3rem', marginBottom: '14px' }}>
                1. Stakeholder Workflows & Requirements Specification
              </h3>

              <div className="grid-3" style={{ marginBottom: '20px' }}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ color: '#064e3b', fontSize: '1rem', display: 'block', marginBottom: '8px' }}>
                    🌾 Farmer Requirements
                  </strong>
                  <ul style={{ paddingLeft: '18px', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li>Aadhaar/Mobile OTP authentication with landholding category.</li>
                    <li>Pre-register crop batch (Paddy, Wheat, etc.) & quantity.</li>
                    <li>Real-time visibility into nearest centres and operating load.</li>
                    <li>Book 2-hour arrival slots & receive authenticated digital E-Pass.</li>
                    <li>Live dynamic queue position & ETA tracking.</li>
                    <li>Proactive SMS/App alerts on Mandi congestion.</li>
                  </ul>
                </div>

                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ color: '#064e3b', fontSize: '1rem', display: 'block', marginBottom: '8px' }}>
                    🏢 Centre / Mandi Officer
                  </strong>
                  <ul style={{ paddingLeft: '18px', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li>Configure daily intake quota & hourly vehicle thresholds.</li>
                    <li>Sub-second QR code scan check-in at gate barriers.</li>
                    <li>Direct entry of gross weight and post-unload tare weight.</li>
                    <li>Calibrated electronic moisture testing with instant MSP check.</li>
                    <li>Dynamic delay throttling button when bottlenecks occur.</li>
                    <li>Immediate issuance of digital Form-J procurement certificate.</li>
                  </ul>
                </div>

                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ color: '#064e3b', fontSize: '1rem', display: 'block', marginBottom: '8px' }}>
                    ⚙️ State / District Administrator
                  </strong>
                  <ul style={{ paddingLeft: '18px', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li>Cross-mandi capacity utilization heatmap.</li>
                    <li>Live monitoring of average wait times and physical queues.</li>
                    <li>Reconciliation of total MT procured against MSP payable.</li>
                    <li>7 to 14 day predictive crop arrival forecasting.</li>
                    <li>Performance benchmarking (before vs after digital scheduling).</li>
                  </ul>
                </div>
              </div>

              {/* Functional & Non-Functional Specifications Table */}
              <h4 style={{ color: '#0f172a', marginBottom: '10px' }}>Key Functional & Non-Functional Matrix</h4>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#ecfdf5', color: '#065f46', borderBottom: '1.5px solid #a7f3d0' }}>
                      <th style={{ padding: '8px 10px' }}>Module Code</th>
                      <th style={{ padding: '8px 10px' }}>Specification</th>
                      <th style={{ padding: '8px 10px' }}>Type</th>
                      <th style={{ padding: '8px 10px' }}>Target SLA / Criterion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '8px 10px', fontWeight: 600 }}>FR-AUTH-01</td>
                      <td style={{ padding: '8px 10px' }}>Farmer Aadhaar OTP & DBT verification</td>
                      <td style={{ padding: '8px 10px' }}>Functional</td>
                      <td style={{ padding: '8px 10px', color: '#059669' }}>Completion in &lt; 30 seconds</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '8px 10px', fontWeight: 600 }}>FR-SLOT-02</td>
                      <td style={{ padding: '8px 10px' }}>Algorithmic quota locking to prevent double booking</td>
                      <td style={{ padding: '8px 10px' }}>Functional</td>
                      <td style={{ padding: '8px 10px', color: '#059669' }}>Atomic Redis lock per slot (5-min TTL)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '8px 10px', fontWeight: 600 }}>FR-QUEUE-03</td>
                      <td style={{ padding: '8px 10px' }}>Real-time dynamic wait recalculation & alert dispatch</td>
                      <td style={{ padding: '8px 10px' }}>Functional</td>
                      <td style={{ padding: '8px 10px', color: '#059669' }}>Triggered when drift &gt; 20 minutes</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '8px 10px', fontWeight: 600 }}>NFR-PERF-01</td>
                      <td style={{ padding: '8px 10px' }}>Peak harvest API response latency</td>
                      <td style={{ padding: '8px 10px' }}>Non-Functional</td>
                      <td style={{ padding: '8px 10px', color: '#059669' }}>p95 &lt; 200 ms under 10k concurrent users</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '8px 10px', fontWeight: 600 }}>NFR-AVAIL-02</td>
                      <td style={{ padding: '8px 10px' }}>High availability during 60-day procurement window</td>
                      <td style={{ padding: '8px 10px' }}>Non-Functional</td>
                      <td style={{ padding: '8px 10px', color: '#059669' }}>99.9% Uptime with automated failover</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 5-Layer System Architecture */}
        {activeTab === 'phase2-arch' && (
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ color: '#064e3b', fontSize: '1.3rem', marginBottom: '8px' }}>
              2. Decoupled 5-Tier System Architecture
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '20px' }}>
              Engineered for low-latency rural accessibility, instantaneous queue status updates, and fault-tolerant operations.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Layer 1 */}
              <div style={{
                background: '#ecfdf5',
                border: '1.5px solid #10b981',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <strong style={{ color: '#064e3b', fontSize: '0.95rem' }}>1. PRESENTATION LAYER (Client Tier)</strong>
                  <span className="badge badge-green">React.js + Responsive PWA</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#047857', margin: 0 }}>
                  Farmer mobile portal, Mandi Officer weighbridge console, and State Executive analytics dashboard. Multilingual support (Hindi, Punjabi, Telugu, Bengali, English) and offline E-Pass caching.
                </p>
              </div>

              {/* Layer 2 */}
              <div style={{
                background: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>2. API GATEWAY & SECURITY LAYER</strong>
                  <span className="badge badge-blue">REST + JWT Auth + Rate Limiting</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0 }}>
                  Ingress routing, payload validation, cryptographic token verification, and strict Role-Based Access Control (RBAC).
                </p>
              </div>

              {/* Layer 3 */}
              <div style={{
                background: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>3. CORE APPLICATION SERVICES (Django REST)</strong>
                  <span className="badge badge-amber">Python Business Logic</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0 }}>
                  Farmer Profile Service, Smart Slot Reservation Engine, Weighbridge Gross/Tare Validator, Moisture QA Verifier, and PFMS/DBT Payment Dispatcher.
                </p>
              </div>

              {/* Layer 4 */}
              <div style={{
                background: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>4. REAL-TIME ENGINE (Django Channels + WebSockets)</strong>
                  <span className="badge badge-green">Sub-second Sync</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0 }}>
                  Continuous queue position broadcasting, dynamic wait time recomputation, and SMS/WhatsApp gateway push triggers when bottlenecks are detected.
                </p>
              </div>

              {/* Layer 5 */}
              <div style={{
                background: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>5. DATA PERSISTENCE & CACHING TIER</strong>
                  <span className="badge badge-blue">PostgreSQL + Redis</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0 }}>
                  PostgreSQL relational data store for ACID-compliant transactions, immutable weighment records, and J-Forms. Redis for atomic slot locks and in-memory queue prioritization.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Database Schema */}
        {activeTab === 'phase2-db' && (
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ color: '#064e3b', fontSize: '1.3rem', marginBottom: '8px' }}>
              3. Relational PostgreSQL Schema & Entity Relationship Model
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '20px' }}>
              Normalized schema enforcing transactional integrity, referential constraints, and audit logging.
            </p>

            <div className="grid-2" style={{ gap: '20px' }}>
              {/* Table 1 */}
              <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#064e3b', display: 'block', fontSize: '0.95rem', marginBottom: '8px' }}>
                  📁 TABLE: farmers
                </strong>
                <pre style={{ background: '#0f172a', color: '#a7f3d0', padding: '12px', borderRadius: '8px', fontSize: '0.75rem', overflowX: 'auto' }}>
{`id: UUID PRIMARY KEY
aadhaar_hash: VARCHAR(64) UNIQUE NOT NULL
full_name: VARCHAR(120) NOT NULL
mobile_number: VARCHAR(15) NOT NULL
state: VARCHAR(50) NOT NULL
district: VARCHAR(50) NOT NULL
landholding_category: VARCHAR(30) -- Marginal/Small/etc.
dbt_bank_ifsc: VARCHAR(15)
dbt_account_number: VARCHAR(30)
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP`}
                </pre>
              </div>

              {/* Table 2 */}
              <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#064e3b', display: 'block', fontSize: '0.95rem', marginBottom: '8px' }}>
                  📁 TABLE: slot_bookings
                </strong>
                <pre style={{ background: '#0f172a', color: '#a7f3d0', padding: '12px', borderRadius: '8px', fontSize: '0.75rem', overflowX: 'auto' }}>
{`id: UUID PRIMARY KEY
farmer_id: UUID REFERENCES farmers(id)
crop_lot_id: UUID REFERENCES crop_lots(id)
centre_id: UUID REFERENCES centres(id)
token_number: VARCHAR(40) UNIQUE NOT NULL
slot_date: DATE NOT NULL
slot_window: VARCHAR(30) -- e.g. 10:00-12:00
declared_quintals: DECIMAL(8,2)
vehicle_number: VARCHAR(20)
status: VARCHAR(30) -- SCHEDULED/ARRIVED/COMPLETED
qr_signature: TEXT NOT NULL`}
                </pre>
              </div>

              {/* Table 3 */}
              <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#064e3b', display: 'block', fontSize: '0.95rem', marginBottom: '8px' }}>
                  📁 TABLE: queue_entries
                </strong>
                <pre style={{ background: '#0f172a', color: '#a7f3d0', padding: '12px', borderRadius: '8px', fontSize: '0.75rem', overflowX: 'auto' }}>
{`id: UUID PRIMARY KEY
booking_id: UUID REFERENCES slot_bookings(id)
check_in_timestamp: TIMESTAMP NOT NULL
current_stage: VARCHAR(40) NOT NULL
queue_position: INT NOT NULL
dynamic_eta: TIMESTAMP NOT NULL
delay_offset_mins: INT DEFAULT 0
last_notified_at: TIMESTAMP`}
                </pre>
              </div>

              {/* Table 4 */}
              <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#064e3b', display: 'block', fontSize: '0.95rem', marginBottom: '8px' }}>
                  📁 TABLE: procurement_transactions
                </strong>
                <pre style={{ background: '#0f172a', color: '#a7f3d0', padding: '12px', borderRadius: '8px', fontSize: '0.75rem', overflowX: 'auto' }}>
{`id: UUID PRIMARY KEY
queue_id: UUID REFERENCES queue_entries(id)
gross_weight_kg: DECIMAL(10,2) NOT NULL
tare_weight_kg: DECIMAL(10,2) NOT NULL
net_quintals: DECIMAL(8,2) GENERATED ALWAYS
moisture_percent: DECIMAL(4,2) NOT NULL
msp_rate_per_quintal: DECIMAL(8,2) NOT NULL
total_msp_payable: DECIMAL(12,2) NOT NULL
payment_status: VARCHAR(30) -- PENDING/PAID
pfms_transaction_ref: VARCHAR(50)`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Scheduling & Dynamic ETA Logic */}
        {activeTab === 'phase2-math' && (
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ color: '#064e3b', fontSize: '1.3rem', marginBottom: '8px' }}>
              4. Smart Scheduling Engine & Dynamic ETA Formulation
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '20px' }}>
              Mathematical formulation of the dynamic coordination algorithm that prevents physical mandi gridlocks.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Formula Card */}
              <div style={{
                background: '#ecfdf5',
                border: '1.5px solid #10b981',
                borderRadius: '12px',
                padding: '20px'
              }}>
                <strong style={{ color: '#064e3b', fontSize: '1.1rem', display: 'block', marginBottom: '8px' }}>
                  Dynamic Estimated Waiting Time (EWT) Equation
                </strong>
                <div style={{
                  background: '#ffffff',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid #a7f3d0',
                  fontSize: '1.2rem',
                  fontFamily: 'monospace',
                  color: '#064e3b',
                  textAlign: 'center',
                  marginBottom: '12px'
                }}>
                  EWT_k = (N_k - 1) × T_service + Δ_delay
                </div>
                <div style={{ fontSize: '0.85rem', color: '#047857', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>• <strong>EWT_k:</strong> Dynamic remaining wait time for vehicle in position <em>k</em>.</div>
                  <div>• <strong>N_k:</strong> Physical queue rank of the farmer's vehicle.</div>
                  <div>• <strong>T_service:</strong> Rolling exponential moving average (EMA) of weighment & moisture clearance time (~12.5 mins/vehicle).</div>
                  <div>• <strong>Δ_delay:</strong> Dynamically injected operational delay buffer (weighbridge calibration, rain, or power interruption).</div>
                </div>
              </div>

              {/* Dynamic Notification Threshold Trigger */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', fontSize: '0.95rem', display: 'block', marginBottom: '6px' }}>
                  Automated Queue Smoothing & Alert Dispatch Logic
                </strong>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0 }}>
                  If Δ_delay shifts by <strong>&ge; 20 minutes</strong>, the system triggers the <em>Arrival Smoothing Protocol</em>:
                </p>
                <div style={{
                  background: '#fef3c7',
                  border: '1px solid #fde68a',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  color: '#92400e',
                  fontSize: '0.8rem',
                  marginTop: '10px'
                }}>
                  "Attention: Mandi queue running 25 mins slow due to weighbridge calibration. Your suggested gate entry time is revised to 10:45 AM. Please do not leave your farm early."
                </div>
                <p style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '10px' }}>
                  This active feedback loop flattens arrival peaks, eliminating the multi-day queues documented in the Punjab, Telangana, and West Bengal field surveys.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
