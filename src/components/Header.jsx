import React from 'react';
import { 
  Sprout, 
  UserCheck, 
  Building2, 
  BarChart3, 
  FileCode2, 
  Globe2, 
  Bell, 
  Clock, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { LANGUAGES } from '../data/mockData';

export function Header({ 
  currentLang, 
  setLang, 
  activeRole, 
  setActiveRole, 
  t, 
  mandiDelayMins,
  currentTime,
  notificationsCount
}) {
  return (
    <header className="no-print" style={{ 
      background: 'linear-gradient(180deg, #064e3b 0%, #065f46 100%)', 
      color: '#ffffff',
      borderBottom: '2px solid #059669',
      boxShadow: '0 4px 20px rgba(6, 78, 59, 0.25)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Top Academic & National Banner */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.25)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '5px 16px',
        fontSize: '0.8rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a7f3d0' }}>
          <span style={{ 
            background: '#047857', 
            padding: '2px 8px', 
            borderRadius: '4px', 
            fontSize: '0.72rem', 
            fontWeight: 700, 
            letterSpacing: '0.5px' 
          }}>
            TEAM 28IT03
          </span>
          <span>{t.collegeHeader}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#e2e8f0', fontSize: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={13} color="#34d399" />
            <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className={`pulse-indicator ${mandiDelayMins > 0 ? 'warning' : ''}`} />
            <span>
              {mandiDelayMins > 0 ? (
                <strong style={{ color: '#fbbf24' }}>Mandi Congestion (+{mandiDelayMins}m dynamic buffer)</strong>
              ) : (
                <strong style={{ color: '#34d399' }}>Live Mandi Engine: Normal Throughput</strong>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container" style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        {/* Brand identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
            border: '1.5px solid rgba(255, 255, 255, 0.25)'
          }}>
            <Sprout size={26} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.5px', color: '#ffffff' }}>
                {t.appTitle}
              </span>
              <span style={{ 
                background: '#10b981', 
                color: '#064e3b', 
                fontSize: '0.65rem', 
                padding: '2px 7px', 
                borderRadius: '6px', 
                fontWeight: 800,
                textTransform: 'uppercase'
              }}>
                Smart MSP
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#a7f3d0', margin: 0 }}>
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Role Switcher Tabs */}
        <nav style={{
          display: 'flex',
          background: 'rgba(0, 0, 0, 0.25)',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          gap: '4px'
        }}>
          <button
            onClick={() => setActiveRole('farmer')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              fontSize: '0.85rem',
              fontWeight: 600,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: activeRole === 'farmer' ? '#ffffff' : 'transparent',
              color: activeRole === 'farmer' ? '#065f46' : '#d1fae5',
              boxShadow: activeRole === 'farmer' ? '0 2px 8px rgba(0,0,0,0.15)' : 'none'
            }}
          >
            <UserCheck size={16} />
            <span>{t.navFarmer}</span>
          </button>

          <button
            onClick={() => setActiveRole('mandi')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              fontSize: '0.85rem',
              fontWeight: 600,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: activeRole === 'mandi' ? '#ffffff' : 'transparent',
              color: activeRole === 'mandi' ? '#065f46' : '#d1fae5',
              boxShadow: activeRole === 'mandi' ? '0 2px 8px rgba(0,0,0,0.15)' : 'none'
            }}
          >
            <Building2 size={16} />
            <span>{t.navMandi}</span>
          </button>

          <button
            onClick={() => setActiveRole('admin')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              fontSize: '0.85rem',
              fontWeight: 600,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: activeRole === 'admin' ? '#ffffff' : 'transparent',
              color: activeRole === 'admin' ? '#065f46' : '#d1fae5',
              boxShadow: activeRole === 'admin' ? '0 2px 8px rgba(0,0,0,0.15)' : 'none'
            }}
          >
            <BarChart3 size={16} />
            <span>{t.navAdmin}</span>
          </button>

          <button
            onClick={() => setActiveRole('blueprint')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              fontSize: '0.85rem',
              fontWeight: 600,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: activeRole === 'blueprint' ? '#f59e0b' : 'transparent',
              color: activeRole === 'blueprint' ? '#ffffff' : '#fde68a',
              boxShadow: activeRole === 'blueprint' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
            }}
          >
            <FileCode2 size={16} />
            <span>{t.navBlueprint}</span>
          </button>
        </nav>

        {/* Right Tools: Language Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.12)',
            borderRadius: '8px',
            padding: '4px 10px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Globe2 size={16} style={{ marginRight: '6px', color: '#6ee7b7' }} />
            <select
              value={currentLang}
              onChange={(e) => setLang(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code} style={{ background: '#064e3b', color: '#ffffff' }}>
                  {lang.native} ({lang.label})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
