# S.A.B.Z. 🌱
**A Circular Economy & Smart Waste Management Initiative**

S.A.B.Z. is a comprehensive IoT and web-based platform designed to revolutionize municipal waste management. By incentivizing the collection of organic waste and sawdust, the platform bridges the gap between everyday citizens and city administration to create a sustainable pipeline for fertilizer and compost production.

---

## 💡 Core Idea
The traditional waste management system relies on unsegregated dumping, which wastes valuable organic resources and creates landfill emissions. S.A.B.Z. solves this by introducing a **gamified circular economy**:
1. Users deposit segregated organic waste or sawdust at designated "Bio-Hubs".
2. The physical hub weighs the deposit and generates a dynamic digital receipt (QR code).
3. Users scan the QR code via the S.A.B.Z. web app to claim **S.A.B.Z. Credits** (50 credits per 1kg of waste).
4. Municipal administrators monitor real-time city-wide collection, hub capacity, and user engagement through a secure geospatial dashboard.

---

## 🌍 Theme & Sustainable Development Goals (SDGs)
Developed for the **Imaginathon**, S.A.B.Z. aligns directly with the United Nations SDGs to foster climate resilience and intelligent urban infrastructure:
* **Goal 11: Sustainable Cities and Communities:** Upgrades municipal waste infrastructure with IoT and real-time geospatial tracking.
* **Goal 12: Responsible Consumption and Production:** Promotes recycling and repurposing of organic waste into agricultural fertilizer, reducing raw material waste.
* **Goal 13: Climate Action:** Diverts organic matter from landfills, significantly reducing methane gas emissions.

---

## 🛠️ Tech Stack

**Frontend (Client)**
* **Framework:** React (built with Vite)
* **Styling:** Tailwind CSS (Custom themes, glassmorphism, dynamic parallax backgrounds)
* **Data Visualization:** Recharts (Area, Bar, and Line charts for metrics)
* **Geospatial Mapping:** React-Leaflet & OpenStreetMap API
* **QR Processing:** `@yudiel/react-qr-scanner` (WebRTC camera integration)
* **Localization:** `i18next` (Bilingual English/Urdu support with dynamic RTL/LTR rendering)

**Backend (Serverless API)**
* **Framework:** Python / Flask
* **Routing:** Vercel Serverless Functions (`api/index.py`)
* **Security:** `Werkzeug` (Password hashing), CORS integration

**Database & Infrastructure**
* **Database:** Supabase (PostgreSQL)
* **Connection Routing:** Supabase IPv4 Transaction Pooler (Port 6543) optimized for serverless environments
* **Deployment:** Vercel (Monorepo architecture combining Vite static assets and Python Lambda functions)

**Hardware / Edge (Proteus Simulated for Imaginathon)**
* **Microcontroller:** ESP32 / ESP32-CAM
* **Sensors/Actuators:** Load cells for weight calculation, CW-020 Relay modules for bin unlocking mechanisms
* **UI:** LCD display for dynamic payload generation (QR rendering)

---

## 🔄 System Architecture & Data Flow

### 1. The Edge (Physical Deposit)
* A user arrives at a S.A.B.Z. Bio-Hub and deposits their waste.
* The hardware's load cell calculates the exact weight in kilograms.
* The ESP32 formats a JSON payload containing the `hub_id`, `weight_kg`, and `waste_type`, and renders it as a QR code on the hub's LCD screen. 
* *(Note: For the hackathon demonstration, this physical layer is visualized and validated using comprehensive Proteus circuit logic simulations).*

### 2. The Client (QR Capture & API Request)
* The user opens their S.A.B.Z. Web Dashboard and authorizes camera access.
* The React QR Scanner parses the LCD's code and extracts the payload.
* The frontend transmits an asynchronous `POST` request to the backend: `/api/log-waste`.

### 3. The Cloud (Serverless Processing & Database)
* Vercel routes the request to the Python Flask serverless function.
* The backend calculates the earned reward (Weight × 50 multiplier).
* Using `psycopg2`, the backend initiates a strict SQL transaction via the Supabase pooler:
  * **Step A:** Inserts a new record into the `Transactions` table (`user_id`, `hub_id`, `weight`, `credits`).
  * **Step B:** Updates the `Users` table, incrementing their `current_credits` and `total_waste_kg`.
* The transaction is committed, guaranteeing absolute data consistency.

### 4. The Output (Dashboards)
* **User Dashboard:** Instantly updates to reflect the new lifetime waste metrics, current credit balance, and weekly bar charts.
* **Admin Portal:** Municipal workers view aggregated city data, including Leaflet map pin updates, hub-specific load capacities, and time-series composting charts.

---

## 🚀 Local Development Setup

**1. Clone the repository**
```bash
git clone [https://github.com/yourusername/sabz-imaginathon.git](https://github.com/yourusername/sabz-imaginathon.git)
cd sabz-imaginathon
