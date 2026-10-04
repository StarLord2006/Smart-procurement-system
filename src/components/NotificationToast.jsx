import React from 'react';
import { Bell, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

export function NotificationToast({ notifications, onDismiss }) {
  if (!notifications || notifications.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '380px',
      width: '100%'
    }}>
      {notifications.map(notif => (
        <div key={notif.id} style={{
          background: notif.type === 'error' ? '#fef2f2' : notif.type === 'warning' ? '#fffbeb' : '#ffffff',
          border: `1.5px solid ${notif.type === 'error' ? '#f87171' : notif.type === 'warning' ? '#fbbf24' : '#10b981'}`,
          borderRadius: '12px',
          padding: '12px 16px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          animation: 'slideUp 0.25s ease'
        }}>
          <div style={{ marginTop: '2px', flexShrink: 0 }}>
            {notif.type === 'error' ? (
              <AlertCircle size={18} color="#ef4444" />
            ) : notif.type === 'warning' ? (
              <AlertTriangle size={18} color="#f59e0b" />
            ) : (
              <CheckCircle2 size={18} color="#059669" />
            )}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: notif.type === 'error' ? '#b91c1c' : notif.type === 'warning' ? '#b45309' : '#047857'
              }}>
                {notif.title || 'System Notification (SMS/Push)'}
              </span>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                {notif.time || 'Just now'}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.825rem', color: '#334155', lineHeight: 1.4 }}>
              {notif.message}
            </p>
          </div>

          <button
            onClick={() => onDismiss(notif.id)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
