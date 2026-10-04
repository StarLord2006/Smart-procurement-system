import React from 'react';
import { 
  BarChart3, 
  Users, 
  Building2, 
  Coins, 
  Scale, 
  TrendingDown, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  FileSpreadsheet,
  Layers
} from 'lucide-react';
import { OFFICIAL_KMS_STATS, EMPIRICAL_RESEARCH, CENTRES } from '../data/mockData';

export function AdminDashboard({ t }) {
  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="container">
        {/* State/National Level Procurement Scale */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-green">GOVERNMENT OF INDIA</span>
            <span className="badge badge-blue">{OFFICIAL_KMS_STATS.season}</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#064e3b', margin: 0 }}>
            {t.nationalStatsTitle}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
            Official macro-statistics demonstrating the scale of agricultural procurement and why digital coordination matters.
          </p>
        </div>

        {/* 4 Big Numbers (Slide 4 of Presentation) */}
        <div className="grid-4" style={{ marginBottom: '32px' }}>
          <div className="glass-card" style={{ padding: '20px', borderLeft: '4px solid #059669' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{t.registeredFarmers}</span>
              <Users size={18} color="#059669" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#064e3b' }}>
              24.46L
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              {OFFICIAL_KMS_STATS.registeredFarmers} registered on portal
            </span>
          </div>

          <div className="glass-card" style={{ padding: '20px', borderLeft: '4px solid #0284c7' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{t.plannedCentres}</span>
              <Building2 size={18} color="#0284c7" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0c4a6e' }}>
              18,465
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              15,299 transacted across states
            </span>
          </div>

          <div className="glass-card" style={{ padding: '20px', borderLeft: '4px solid #d97706' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{t.paddyProcured}</span>
              <Scale size={18} color="#d97706" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#78350f' }}>
              1.6Cr MT
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              {OFFICIAL_KMS_STATS.paddyProcuredMT}
            </span>
          </div>

          <div className="glass-card" style={{ padding: '20px', borderLeft: '4px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{t.mspPayable}</span>
              <Coins size={18} color="#10b981" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#064e3b' }}>
              ₹37,540Cr
            </div>
            <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
              ₹37,540.59 Cr successfully paid via DBT
            </span>
          </div>
        </div>

        {/* 8 Key Performance Indicators (Slide 13 of Presentation) */}
        <div className="glass-card" style={{ padding: '24px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#064e3b', margin: 0 }}>
                System Impact & Key Performance Indicators (KPIs)
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.825rem', margin: '4px 0 0 0' }}>
                "We should not simply say: 'Our system reduces waiting time.' We should measure it."
              </p>
            </div>
            <span className="badge badge-green">Simulated Pilot Data</span>
          </div>

          <div className="grid-4" style={{ gap: '14px' }}>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '0.75rem', fontWeight: 700 }}>
                <TrendingDown size={15} /> 86% REDUCTION
              </div>
              <strong style={{ display: 'block', fontSize: '1.3rem', color: '#0f172a', margin: '4px 0' }}>
                38 mins
              </strong>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Avg. Waiting Time (vs 4.8 hrs manual queue)
              </span>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '0.75rem', fontWeight: 700 }}>
                <TrendingDown size={15} /> 68% LESS CONGESTION
              </div>
              <strong style={{ display: 'block', fontSize: '1.3rem', color: '#0f172a', margin: '4px 0' }}>
                4.8 vehicles
              </strong>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Avg Queue Length (vs 16+ uncoordinated)
              </span>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '0.75rem', fontWeight: 700 }}>
                <TrendingUp size={15} /> 91.4% EFFICIENCY
              </div>
              <strong style={{ display: 'block', fontSize: '1.3rem', color: '#0f172a', margin: '4px 0' }}>
                91.4%
              </strong>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Slot Quota Utilization across centres
              </span>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '0.75rem', fontWeight: 700 }}>
                <TrendingUp size={15} /> 87.5% PUNCTUALITY
              </div>
              <strong style={{ display: 'block', fontSize: '1.3rem', color: '#0f172a', margin: '4px 0' }}>
                87.5%
              </strong>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                On-Time Arrival Rate at assigned window
              </span>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Avg Visits per Farmer</span>
              <strong style={{ display: 'block', fontSize: '1.3rem', color: '#0f172a', margin: '4px 0' }}>
                1.08 visits
              </strong>
              <span style={{ fontSize: '0.72rem', color: '#059669' }}>
                Reduced from 3.2 repeat attempts
              </span>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Procurement Clearance Time</span>
              <strong style={{ display: 'block', fontSize: '1.3rem', color: '#0f172a', margin: '4px 0' }}>
                19.4 mins
              </strong>
              <span style={{ fontSize: '0.72rem', color: '#059669' }}>
                Check-in to J-Form issuance
              </span>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>SMS Notification Delivery</span>
              <strong style={{ display: 'block', fontSize: '1.3rem', color: '#0f172a', margin: '4px 0' }}>
                99.2%
              </strong>
              <span style={{ fontSize: '0.72rem', color: '#059669' }}>
                Real-time queue & delay alerts
              </span>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>API Response Latency</span>
              <strong style={{ display: 'block', fontSize: '1.3rem', color: '#0f172a', margin: '4px 0' }}>
                142 ms
              </strong>
              <span style={{ fontSize: '0.72rem', color: '#059669' }}>
                99.98% uptime in harvest peak
              </span>
            </div>
          </div>
        </div>

        {/* Empirical Ground Realities & Delay Research (Slides 3, 6, 7 & 15) */}
        <div className="glass-card" style={{ padding: '24px', marginBottom: '32px' }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#064e3b', margin: 0 }}>
              {t.researchEvidenceTitle}
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.825rem', margin: '4px 0 0 0' }}>
              Rigorous literature foundations validating why Smart Scheduling & Dynamic Queues are necessary across Indian states.
            </p>
          </div>

          <div className="grid-2">
            {EMPIRICAL_RESEARCH.map((res, idx) => (
              <div key={idx} style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <strong style={{ color: '#0f172a', fontSize: '0.925rem', display: 'block', marginBottom: '4px' }}>
                    {res.study}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '8px' }}>
                    {res.scope}
                  </span>
                  <div style={{
                    background: '#fef3c7',
                    border: '1px solid #fde68a',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    color: '#92400e',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    marginBottom: '10px'
                  }}>
                    {res.finding}
                  </div>

                  {res.breakdown && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                      {res.breakdown.map((b, bi) => (
                        <span key={bi} style={{
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          color: '#334155'
                        }}>
                          {b.cat}: <strong>{b.val}</strong>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                  ➔ Solution Impact: {res.impact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mandi Centre Capacity Load Table */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#064e3b', margin: 0 }}>
              Regional Mandi Capacity & Congestion Matrix
            </h3>
            <span className="badge badge-green">5 Hubs Monitored</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '10px' }}>Centre Name</th>
                  <th style={{ padding: '10px' }}>State / District</th>
                  <th style={{ padding: '10px' }}>Daily Capacity</th>
                  <th style={{ padding: '10px' }}>Booked Quota</th>
                  <th style={{ padding: '10px' }}>Active Vehicles</th>
                  <th style={{ padding: '10px' }}>Avg Waiting Time</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {CENTRES.map(c => {
                  const percent = Math.round((c.currentBookedQuintals / c.dailyCapacityQuintals) * 100);
                  return (
                    <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 10px', fontWeight: 600, color: '#0f172a' }}>{c.name}</td>
                      <td style={{ padding: '12px 10px', color: '#64748b' }}>{c.district}, {c.state}</td>
                      <td style={{ padding: '12px 10px' }}>{c.dailyCapacityQuintals} Q</td>
                      <td style={{ padding: '12px 10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ flex: 1, background: '#e2e8f0', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{
                              background: percent > 90 ? '#ef4444' : percent > 75 ? '#f59e0b' : '#059669',
                              height: '100%',
                              width: `${percent}%`
                            }} />
                          </div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{percent}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 10px', fontWeight: 600 }}>{c.activeQueueVehicles} trucks</td>
                      <td style={{ padding: '12px 10px', color: c.avgWaitMins > 45 ? '#d97706' : '#059669', fontWeight: 600 }}>
                        {c.avgWaitMins} mins
                      </td>
                      <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                        <span className={`badge ${c.status === 'Operational' ? 'badge-green' : 'badge-amber'}`} style={{ fontSize: '0.65rem' }}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
