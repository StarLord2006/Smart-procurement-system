# Phase 1: Comprehensive Requirement Analysis & Specification
**Project:** Smart Procurement Scheduling & Queue Management Platform (KrishiSetu)  
**Academic Context:** B.Tech Information Technology, Semester V | Team Code: 28IT03 | Session: 2026–27  
**Institution:** Galgotias College of Engineering & Technology, Greater Noida  
**Supervision:** Dr. Meenakshi Yadav  
**Authors:** Rajnish (2400970130098), Raj Gupta (2400970130096), Satvik Jaiswal (2400970130109)  

---

## 1. Executive Summary & Problem Background

Agricultural procurement across India represents one of the world's largest logistics and financial coordination exercises. Official figures from the **Central Food Grains Procurement Portal (KMS 2025–26 Paddy-Rabi)** establish this monumental scale:
- **24.46 Lakh** Registered Farmers
- **18,465** Planned Procurement Centres (Mandis / PACs) across states
- **1.60 Crore Metric Tonnes (MT)** Paddy Procured
- **₹37,540.62 Crore** Minimum Support Price (MSP) Payable

### Empirical Field Evidence of Inefficiencies
Research demonstrates persistent systemic friction:
1. **Punjab Primary Farmer Survey (Gohain & Singh, 2018):**
   - Survey of 180 farmers across 6 districts of Punjab.
   - For the paddy/wheat sample: **139 out of 158 farmers (87.97% ≈ 88%)** reported delayed procurement of paddy.
   - Categorized by landholding: Marginal (23/26), Small (27/31), Semi-medium (42/45), Medium (35/39), Large (12/17).
   - Delay in procurement was ranked as the **#1 single marketing problem**.
2. **Telangana Field Study (Sandya et al., 2020):**
   - **~73%** of sampled farmers reported delayed procurement and distress storage of harvested produce.
3. **West Bengal Decentralized Procurement (DCP) Study:**
   - **88.33%** of farmers reported procurement delays extending beyond 15 days after harvesting, coupled with severe serial-number and token allotment bottlenecks.
4. **Annual Survey of State of Marginal Farmers (2023 - 6,115 households across 20 states):**
   - Only **31.9%** sold through government procurement centers; long waiting times and physical congestion were primary reasons for avoiding MSP centers.
   - **58.95%** of dissatisfied farmers cited payment delays.

---

## 2. Core Stakeholders & Farmer Requirements

### 2.1 Farmer Requirements
- **FR-01 (Authentication & Profile):** Fast, frictionless authentication via Aadhaar / Farmer ID / Mobile OTP. Profile stores landholding classification (Marginal, Small, Semi-medium, Medium, Large) and default Mandi preference.
- **FR-02 (Crop & Harvest Declaration):** Pre-register crop variety (e.g., Paddy Grade A, Common Paddy, Wheat Sharbati, Mustard), estimated yield in Quintals/MT, harvesting date, and readiness window.
- **FR-03 (Transparent Centre Visibility):** Real-time visibility into nearest procurement centres, daily intake capacity, operating hours, current backlog, and distance.
- **FR-04 (Smart Slot Reservation):** Ability to choose preferred date and time slot (e.g., 09:00 - 11:00 AM) based on available quota, preventing uncoordinated arrival.
- **FR-05 (Digital Token & Pass):** Instant generation of an authenticated Digital E-Pass with unique Token Number, QR code, assigned gate, and estimated reporting time.
- **FR-06 (Live Queue Tracking & Dynamic ETA):** Continuous tracking of live queue status (e.g., "3 vehicles ahead of you", "Estimated weighbridge entry: 10:25 AM").
- **FR-07 (Overload & Delay Alerts):** Timely notifications (SMS / WhatsApp / In-app) if mandi operations face sudden bottlenecks (e.g., weighbridge breakdown, moisture testing delays) so farmers do not leave their villages prematurely.
- **FR-08 (Procurement Journey Visibility):** Step-by-step audit trail: *Slot Booked → Gate Check-in → Weighment In → Moisture/Quality Test → Unloading & Weighment Out → Acceptance Certificate → MSP Payment Disbursal*.
- **FR-09 (Multi-Lingual & Low-Bandwidth Interface):** Intuitive design operable in Hindi, Punjabi, Bengali, Telugu, and English, with high-contrast text and minimal data consumption.

### 2.2 Procurement Centre (Mandi / Officer) Requirements
- **PR-01 (Capacity & Quota Management):** Set daily handling capacity (e.g., 1,500 Quintals/day, 45 vehicles/day) and allocate hourly throughput limits.
- **PR-02 (Rapid Check-in Verification):** Barcode/QR code scanner to verify digital tokens at the entry gate within 10 seconds.
- **PR-03 (Digital Weighment & QA Recording):** Direct entry of gross weight, tare weight, net weight, and quality parameters (moisture %, foreign matter %, damaged grains).
- **PR-04 (Dynamic Queue Throttling):** Ability to pause, slow down, or expand hourly slot allocations when operational shocks occur.
- **PR-05 (E-Procurement Receipt Issuance):** Instant generation of digitally signed Farmer J-Form / Procurement Acknowledgment slip with MSP value calculation.

### 2.3 Administrative & District Officer Requirements
- **AR-01 (Mandi Overview Dashboard):** Real-time monitoring of center-wise capacity utilization, average wait time, and queue backlog.
- **AR-02 (Bottleneck Heatmap):** Instant detection of Mandis exceeding 90% capacity or reporting >2 hour wait times.
- **AR-03 (MSP Disbursement Tracking):** Real-time reconciliation of total value procured vs. payments processed via PFMS/DBT.
- **AR-04 (Demand vs. Supply Forecasting):** Anticipation of incoming produce volumes over 7–14 days based on farmer registration schedules.

---

## 3. End-to-End Procurement Workflow

```
[Farmer Registration & KYC]
           │
           ▼
[Crop & Readiness Registration] (Crop, Expected Quantity, Harvest Date)
           │
           ▼
[Centre Selection & Slot Booking] (Algorithmic Capacity Check & Quota Lock)
           │
           ▼
[Digital Token / E-Pass Generated] (QR Code, Token #, Assigned Time Window)
           │
           ▼
[Dynamic Queue Optimization] (Real-time ETA recalculation, Overload SMS alerts)
           │
           ▼
[Mandi Gate Check-in] (QR Scan, Vehicle Entry Recorded)
           │
           ▼
[Gross Weighment] (Weighbridge In)
           │
           ▼
[Moisture & Quality Inspection] (FSSAI/FCI Standard Check)
           │
           ▼
[Unloading & Tare Weighment] (Net Produce Calculated)
           │
           ▼
[Procurement Receipt / J-Form Issued] (Digital Acknowledgment)
           │
           ▼
[Direct Benefit Transfer (DBT) / MSP Payment] (Bank Account Credit)
```

---

## 4. Detailed Functional Requirements (FRs)

| Req ID | Module | Feature Description | Acceptance Criteria |
|---|---|---|---|
| **FR-M1-01** | Farmer Mgmt | Aadhaar/Mobile OTP registration & Profile setup | Verification completed in < 30s; land details captured. |
| **FR-M1-02** | Farmer Mgmt | Multi-crop declaration (Paddy, Wheat, Maize, etc.) | Stores quantity in Quintals, variety, and harvest readiness. |
| **FR-M2-01** | Slot Engine | Real-time center capacity and slot matrix display | Displays available slots per 2-hour window; prohibits double booking. |
| **FR-M2-02** | Slot Engine | Algorithmic booking with quota enforcement | Locks slot temporarily (5 mins) during booking to avoid race conditions. |
| **FR-M3-01** | Token Engine | Cryptographic Token & QR Code Generation | Token format: `TK-YYYYMMDD-CENTREID-SEQUENCE`. Contains verified payload. |
| **FR-M4-01** | Live Queue | Real-time queue position and dynamic wait-time calculator | Recalculates ETA based on active service rate ($T_{service}$) and vehicle backlog. |
| **FR-M4-02** | Live Queue | Mandi overload alert dispatcher | Triggers notification when mandi processing delay exceeds 30 minutes. |
| **FR-M5-01** | Mandi Ops | Fast QR check-in & gate queue prioritization | Changes status to `ARRIVED`; assigns local gate sequence. |
| **FR-M5-02** | Mandi Ops | Dual-stage weighbridge (Gross - Tare = Net) recording | Auto-computes net weight and verifies against declared slot tolerance (±15%). |
| **FR-M5-03** | Mandi Ops | Quality inspection & Moisture recording | Compares moisture reading against statutory MSP threshold (e.g., ≤17% for Paddy). |
| **FR-M6-01** | Financials | MSP Payable calculation and Payment status updates | Accurately calculates $Net\_Weight \times MSP\_Rate$; updates status: `INITIATED` → `APPROVED` → `PAID`. |
| **FR-M7-01** | Admin Analytics | Real-time District & State KPI aggregates | Visualizes total procured MT, total MSP paid, avg wait time, and centre utilization. |

---

## 5. Non-Functional Requirements (NFRs)

1. **Performance & Scalability:**
   - API response time $\le 200\text{ ms}$ under 95th percentile for slot lookups.
   - Capable of supporting concurrent peak harvest traffic (minimum 10,000 active sessions per state).
2. **Reliability & Availability:**
   - 99.9% uptime during the 60-day peak procurement harvest window.
   - Graceful offline fallback with local caching for queue token viewing in rural fringe areas.
3. **Accessibility & Usability:**
   - Full support for 5 languages: English, Hindi (हिन्दी), Punjabi (ਪੰਜਾਬੀ), Telugu (తెలుగు), Bengali (বাংলা).
   - High contrast UI with voice assistance readiness; mobile-first touch target sizing ($\ge 48\text{px}$).
4. **Data Integrity & Auditability:**
   - Immutable audit logging for weighment recordings, quality rejection/acceptance, and payment status transitions.
   - Prevention of counterfeit tokens through SHA-256 digital signature embedded within QR codes.
