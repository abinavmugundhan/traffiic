# 🚦 Smart Traffic Intelligence Agent & 3D Digital Twin

An intelligent data analytics and full-stack platform capable of predicting urban traffic congestion patterns leveraging historical GPS datasets, real-time anomalies inference, and interactive **React Three Fiber 3D simulations**. 

Designed for urban planning authorities to mitigate gridlock proactively rather than reactively. Built specifically for modern Hackathons and Datathons focusing on Smart City operations!

## 🌟 Key Features
* **Predictive ML Modeling:** End-to-end Python pipeline leveraging `XGBoost` & `scikit-learn` to forecast time-series traffic volumes and isolate peak hour/weather interactions accurately up to 60 mins into the future.
* **3D Digital Twin Visualization:** Built using `@react-three/fiber` to dynamically map and simulate vehicle density (ranging from 2-wheelers to BMTC buses) snapping to intersections in real-time.
* **Indian Traffic Anomaly Engine:** Injects real-world spatial anomalies (like *VIP Convoys* or *Monsoon Flash Floods*) at Silk Board Junction to observe the mathematical ripple effect on the city grid.
* **Explainable AI Dashboards:** A sleek Tailwind-styled HUD mapping time-series prediction graphs and issuing optimization strategies (ex: *Adaptive route diversions* or *Green signal duration updates*).

## 🚀 Tech Stack
* **Frontend:** React, Vite, TypeScript, Tailwind CSS, Recharts, Framer Motion
* **3D Engine:** Three.js, React Three Fiber, React Three Drei
* **Data Science / ML:** Python 3, Pandas, XGBoost, Scikit-Learn, Seaborn, Matplotlib
* **Backend:** InsForge Edge Functions, InsForge PostgreSQL

## 📦 How to Run

### 1. The Web Platform (3D Dashboard)
1. Install dependencies: `npm install`
2. Run the development server: `npm run dev`
3. View the 3D Digital Twin at: `http://localhost:5173`

### 2. The Machine Learning Pipeline
1. Download the Metro Interstate Traffic Volume Dataset: `python get_traffic_data.py`
2. Train the XGBoost Model & evaluate metrics: `python traffic_ml_pipeline.py`
3. Generate Exploratory Data Analysis (EDA) Heatmaps: `python eda_visualizations.py`

## 📊 Exploratory Data Visualizations
The AI automatically compiles `.png` Seaborn data visualizations mapping hourly vs weekly volume distributions and weather impact boxplots included directly inside the project root for fast presentation generation.

---
*Developed as a proactive solution for modern traffic gridlock.*
