# Phase 2: System Architecture, Database Design & Scheduling Engine Specification
**Project:** Smart Procurement Scheduling & Queue Management Platform (KrishiSetu)  
**Academic Context:** B.Tech Information Technology, Semester V | Team Code: 28IT03 | Session: 2026–27  
**Institution:** Galgotias College of Engineering & Technology, Greater Noida  
**Supervision:** Dr. Meenakshi Yadav  
**Authors:** Rajnish (2400970130098), Raj Gupta (2400970130096), Satvik Jaiswal (2400970130109)  

---

## 1. System Architecture Overview

The system follows a resilient, decoupled 5-tier architecture tailored for high transaction volumes during seasonal harvests:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             PRESENTATION LAYER                              │
│  Farmer Mobile/Web App  │  Mandi Officer Tablet/Desktop  │  Admin Analytics │
│  (React.js + Multi-Lingual + Accessible Design + Local Storage Offline Pass)│
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HTTPS / WSS
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                            API & GATEWAY LAYER                              │
│  Rate Limiting │ JWT Auth │ Role Based Access Control │ Payload Validation  │
└───────────────────┬─────────────────────────────────────┬───────────────────┘
                    │                                     │
┌───────────────────▼─────────────────┐   ┌───────────────▼───────────────────┐
│        APPLICATION SERVICES         │   │         REAL-TIME ENGINE          │
│  • Farmer & Crop Service            │   │  • WebSocket Broadcaster          │
│  • Smart Slot Allocation Engine     │   │  • Queue State Synchronizer       │
│  • Weighment & Quality Verification │   │  • Push / SMS Notification Relay  │
│  • MSP & Payment Lifecycle Engine   │   │  • Dynamic ETA Recalculator       │
└───────────────────┬─────────────────┘   └───────────────┬───────────────────┘
                    │                                     │
┌───────────────────▼─────────────────────────────────────▼───────────────────┐
│                              DATA PERSISTENCE                               │
│  PostgreSQL (Relational ACID Data)  │  Redis (In-memory Queues & Slot Locks)│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Database Schema (Relational Design)

### 2.1 Entity Relationship Model
```
┌─────────────────┐       ┌─────────────────┐       ┌──────────────────────┐
│     FARMERS     │1     *│   CROP_LOTS     │1     *│     SLOT_BOOKINGS    │
├─────────────────┤───────├─────────────────┤───────├──────────────────────┤
│ id (PK)         │       │ id (PK)         │       │ id (PK)              │
│ aadhaar_hash    │       │ farmer_id (FK)  │       │ farmer_id (FK)       │
│ full_name       │       │ crop_name       │       │ crop_lot_id (FK)     │
│ phone_number    │       │ variety         │       │ centre_id (FK)       │
│ state, district │       │ quantity_quintal│       │ slot_date            │
│ land_holding    │       │ harvest_date    │       │ slot_start_time      │
└─────────────────┘       └─────────────────┘       │ slot_end_time        │
                                                    │ token_number         │
                                                    │ status               │
                                                    └──────────┬───────────┘
                                                               │ 1
                                                               │
                                                               │ 1
┌─────────────────┐       ┌─────────────────┐       ┌──────────▼───────────┐
│     CENTRES     │1     *│ DAILY_CAPACITY  │       │   QUEUE_ENTRIES      │
├─────────────────┤───────├─────────────────┤       ├──────────────────────┤
│ id (PK)         │       │ id (PK)         │       │ id (PK)              │
│ code            │       │ centre_id (FK)  │       │ booking_id (FK)      │
│ name            │       │ operation_date  │       │ check_in_time        │
│ district, state │       │ max_quintals    │       │ current_stage        │
│ weighbridge_cnt │       │ max_vehicles    │       │ queue_position       │
│ operating_hours │       │ booked_vehicles │       │ estimated_wait_mins  │
└─────────────────┘       └─────────────────┘       └──────────┬───────────┘
                                                               │ 1
                                                               │
                                                               │ 1
┌──────────────────────────────────────────────────────────────▼───────────┐
│                         PROCUREMENT_TRANSACTIONS                         │
├──────────────────────────────────────────────────────────────────────────┤
│ id (PK)                                                                  │
│ queue_id (FK)                                                            │
│ gross_weight_kg                                                          │
│ tare_weight_kg                                                           │
│ net_weight_quintals                                                      │
│ moisture_percentage                                                      │
│ quality_grade (Grade A / Standard / Rejected)                            │
│ msp_rate_per_quintal                                                     │
│ total_amount_payable                                                     │
│ payment_status (PENDING / APPROVED / PROCESSED / TRANSFERRED)            │
│ transaction_utr_ref                                                      │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 3. User Roles and RBAC Matrix

| Permission / Action | Farmer | Mandi Gate Operator | Weighbridge & Quality Officer | Centre Manager | State Admin |
|---|:---:|:---:|:---:|:---:|:---:|
| Register Farmer Profile & Land Details | **CRU** | R | - | R | R |
| Register Crop Lot & Harvest Data | **CRUD** | R | R | R | R |
| View Mandi Availability & Book Slot | **CR** | R | - | R | R |
| Generate & Download Digital Token / QR | **R** | R | R | R | R |
| Gate Check-in & QR Verification | - | **CRU** | - | R | R |
| Record Gross/Tare Weights | - | - | **CRU** | R | R |
| Record Moisture % & Grade | - | - | **CRU** | R | R |
| Re-sequence Queue / Declare Delay | - | R | - | **CRU** | **CRU** |
| Approve J-Form & Initiate MSP Payment | - | - | - | **CRU** | **CRU** |
| District-Wide Demand & Throughput Analytics | - | - | - | R | **CRUD** |

---

## 4. RESTful API Structure

### 4.1 Farmer & Booking Endpoints
- `POST /api/v1/farmers/auth/otp-request` & `verify`
- `GET /api/v1/farmers/profile`
- `POST /api/v1/crops` (Register crop batch, estimated quintals, readiness date)
- `GET /api/v1/centres?district={dist}&crop={crop}` (List centers with distance, current utilization, and next available slot)
- `GET /api/v1/centres/{id}/slots?date={date}` (Fetch slot matrix with capacity indicators)
- `POST /api/v1/bookings` (Reserve slot, generate token & cryptographic QR code)
- `GET /api/v1/bookings/{id}/token` (Retrieve digital E-Pass)

### 4.2 Queue & Mandi Operations Endpoints
- `GET /api/v1/queue/live/{centreId}` (Get active queue status, total waiting vehicles, current serving token)
- `POST /api/v1/queue/checkin` (Scan QR code at entry gate, transition booking to `ARRIVED`)
- `POST /api/v1/queue/weighment` (Log gross weight and tare weight)
- `POST /api/v1/queue/quality` (Log moisture meter reading and grade compliance)
- `POST /api/v1/queue/complete` (Finalize procurement, generate official J-Form)
- `POST /api/v1/centres/{id}/declare-delay` (Trigger real-time queue re-estimation and farmer SMS alerts)

### 4.3 Payment & Analytics Endpoints
- `GET /api/v1/payments/{farmerId}` (Track MSP disbursal stages via PFMS/DBT)
- `GET /api/v1/analytics/overview` (Statewide KPIs: Total procured MT, MSP disbursed, Avg wait time, Active queues)

---

## 5. Smart Scheduling & Dynamic Queue Estimation Logic

### 5.1 Slot Quota Allocation Algorithm
Let:
- $C_{daily}$ = Total daily center intake capacity in Quintals (e.g., 2,000 Q).
- $W$ = Number of working hours per day (typically 8 hours = 4 two-hour slot windows).
- $Q_{slot}$ = Max capacity per window = $\frac{C_{daily}}{4} \times \alpha_{safety}$ where $\alpha_{safety} = 0.85$ (15% buffer for delays).
- $V_{avg}$ = Average tractor-trolley load ($\approx 40$ Quintals).
- Maximum vehicles per 2-hour window: $K_{max} = \lfloor \frac{Q_{slot}}{V_{avg}} \rfloor \approx 10\text{--}12$ vehicles.

When a farmer books:
$$\text{If } \sum_{i \in \text{Booked}} q_i + q_{farmer} \le Q_{slot} \implies \text{Approve Booking}$$
$$\text{Else } \implies \text{Suggest next available window or adjacent center}$$

### 5.2 Dynamic Real-Time Wait Time & ETA Formulation
Unlike static appointment apps, KrishiSetu updates the estimated arrival and waiting time dynamically when Mandi events (e.g., rain, weighbridge inspection lag, or unloading delay) occur:

$$\text{Estimated Waiting Time (EWT)}_k = (N_k - 1) \times \bar{T}_{\text{service}} + \Delta_{\text{operational\_delay}}$$

Where:
- $N_k$ = Position of farmer $k$ in the active physical queue.
- $\bar{T}_{\text{service}}$ = Rolling average service time per vehicle (Weighment In + Moisture Sample + Dump/Unload + Weighment Out), typically $12.5\text{ minutes}$.
- $\Delta_{\text{operational\_delay}}$ = Dynamically injected delay when center throughput falls below nominal threshold:
  $$\Delta_{\text{delay}} = \max(0, T_{\text{elapsed\_current\_token}} - T_{\text{nominal\_service}})$$

### 5.3 Event-Driven Notification Engine
When $\text{EWT}_k$ shifts by $> 25\text{ minutes}$:
$$\text{Trigger Notification: } \text{"Attention: Mandi queue running 35 mins behind. New recommended arrival: 10:45 AM."}$$
This flattens peak arrivals and prevents tractor congestion outside the mandi gates.
