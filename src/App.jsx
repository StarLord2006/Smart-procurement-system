import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { FarmerPortal } from './components/FarmerPortal';
import { MandiOfficerPortal } from './components/MandiOfficerPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { PhaseBlueprint } from './components/PhaseBlueprint';
import { DigitalTokenModal } from './components/DigitalTokenModal';
import { JFormModal } from './components/JFormModal';
import { NotificationToast } from './components/NotificationToast';
import { TRANSLATIONS, INITIAL_QUEUE } from './data/mockData';

export function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [activeRole, setActiveRole] = useState('farmer'); // 'farmer' | 'mandi' | 'admin' | 'blueprint'
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [mandiDelayMins, setMandiDelayMins] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Active farmer's booking
  const [userBooking, setUserBooking] = useState({
    token: 'TK-20261004-KNL-041',
    farmerName: 'Satvik Jaiswal (You)',
    phone: '+91 98112-24009',
    crop: 'Paddy (Grade A)',
    quantityQuintals: 40,
    vehicleNo: 'HR-05-TJ-9901',
    centreId: 'CTR-KNL-01',
    centreName: 'Karnal Central APMC Mandi',
    slotId: 'slot-2',
    slotTime: '10:00 AM – 12:00 PM',
    stage: 'SLOT_SCHEDULED',
    grossKg: 7850,
    tareKg: 3350,
    moisturePercent: 16.2,
    isCurrentFarmer: true
  });

  // Modals state
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [jFormModalOpen, setJFormModalOpen] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(userBooking);

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'SMS Sent to +91 98112-24009',
      message: 'Your slot is confirmed for tomorrow (10:00 AM - 12:00 PM) at Karnal Mandi. Token: TK-20261004-KNL-041.',
      type: 'success',
      time: '1m ago'
    }
  ]);

  // Keep live time ticking
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

  const addNotification = (message, type = 'success') => {
    const newNotif = {
      id: Date.now(),
      title: type === 'warning' ? 'Mandi Operational Alert' : 'System SMS Dispatch',
      message,
      type,
      time: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 4)]);
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleOpenTokenModal = (data) => {
    setSelectedModalData(data || userBooking);
    setTokenModalOpen(true);
  };

  const handleOpenJFormModal = (data) => {
    setSelectedModalData(data || userBooking);
    setJFormModalOpen(true);
    // Celebrate with confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Header
        currentLang={currentLang}
        setLang={setCurrentLang}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        t={t}
        mandiDelayMins={mandiDelayMins}
        currentTime={currentTime}
        notificationsCount={notifications.length}
      />

      {/* Main Content Area based on Selected Role */}
      <main style={{ flex: 1 }}>
        {activeRole === 'farmer' && (
          <FarmerPortal
            t={t}
            queue={queue}
            mandiDelayMins={mandiDelayMins}
            onOpenTokenModal={handleOpenTokenModal}
            onOpenJFormModal={handleOpenJFormModal}
            userBooking={userBooking}
            setUserBooking={(b) => {
              setUserBooking(b);
              addNotification(`Slot booked! Digital Token ${b.token} generated.`);
              try {
                confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
              } catch (e) {}
            }}
          />
        )}

        {activeRole === 'mandi' && (
          <MandiOfficerPortal
            t={t}
            queue={queue}
            setQueue={setQueue}
            mandiDelayMins={mandiDelayMins}
            setMandiDelayMins={setMandiDelayMins}
            onOpenJFormModal={handleOpenJFormModal}
            onNotify={addNotification}
          />
        )}

        {activeRole === 'admin' && (
          <AdminDashboard t={t} />
        )}

        {activeRole === 'blueprint' && (
          <PhaseBlueprint />
        )}
      </main>

      {/* Footnote Bar */}
      <footer className="no-print" style={{
        background: '#0f172a',
        color: '#94a3b8',
        padding: '20px 0',
        fontSize: '0.8rem',
        borderTop: '1px solid #1e293b',
        textAlign: 'center'
      }}>
        <div className="container">
          <p style={{ margin: 0 }}>
            <strong>Smart Procurement System (KrishiSetu)</strong> • Galgotias College of Engineering & Technology, Greater Noida
          </p>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.75rem' }}>
            Submitted by: Rajnish (2400970130098), Raj Gupta (2400970130096), Satvik Jaiswal (2400970130109) • Supervised by Dr. Meenakshi Yadav (Team 28IT03)
          </p>
        </div>
      </footer>

      {/* Modals & Popups */}
      <DigitalTokenModal
        isOpen={tokenModalOpen}
        onClose={() => setTokenModalOpen(false)}
        tokenData={selectedModalData}
        t={t}
      />

      <JFormModal
        isOpen={jFormModalOpen}
        onClose={() => setJFormModalOpen(false)}
        data={selectedModalData}
        t={t}
      />

      {/* Live Push Notifications Toast */}
      <NotificationToast
        notifications={notifications}
        onDismiss={dismissNotification}
      />
    </div>
  );
}

export default App;
