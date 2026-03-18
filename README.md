# 🚦 Smart Traffic Intelligence Agent & 3D Digital Twin

An intelligent, data-driven traffic analytics platform designed to solve urban gridlock using multi-source data integration, advanced Machine Learning forecasting, and a cutting-edge **React Three Fiber 3D Simulation Engine**.

Designed explicitly to meet the rigorous evaluation criteria of the Datathon through a proactive, predictive Intelligent Transportation System (ITS) integration.

---

## 🏆 Innovation & Originality
Most smart city platforms react statically to traffic *after* congestion hits. We are innovating by merging deep predictive modeling with visual simulation:
1. **Predictive Digital Twin Methodology:** We merged **Time-Series ML Ensembles** with an interactive WebGL simulation of Bangalore's Silk Board Junction. As the ML predicts congestion, the 3D twin algorithmically slows down buses and two-wheelers in real-time.
2. **Live Anomaly Engine:** Instead of just charting data, our integrated HUD features an "Inject Anomaly" module allowing planners to simulate Flash Floods or VIP Convoys and observe the mathematical ripple effect instantly.

---

## 🛠️ Data Processing Methodology
Following a strict research-driven approach (`advanced_ml_pipeline.py`), our architecture handles complex multi-source telemetry combining weather limits and vehicle GPS density metrics:
*   **Intelligent Outlier Mitigation:** Automatically drops outlier noise capping variables at the 99th percentile IQR ensuring robust model training.
*   **Rigorous Normalization:** Implements `MinMaxScaler(-1, 1)` scaling for environmental factors (Rain/Snow/Temp) so weather perfectly correlates with vehicle densities.
*   **Sliding Window Transformation:** Transforms static sequential records into advanced supervised 24-hour lag matrices (`lag_1` to `lag_24`), enabling genuine multi-step sequence forecasting.

---

## 📊 Model Performance and Accuracy
An ML traffic model is useless if it cannot win on accuracy. The pipeline pits an ensemble of the best gradient boosting algorithms against each other:
*   **The Showdown:** Evaluates `XGBoost`, `LightGBM`, and `Random Forest` models natively.
*   **Evaluation Rigor:** Output logic strictly measures `RMSE`, `MAE`, and the `R2 Score`, ensuring that the highest performing model dictates the simulation logic.
*   **Explainable AI Insights:** The system traces decision nodes to output numerical "Feature Importances", proving to authorities *why* the prediction was made (e.g. `lag_24` historical constraints vs sudden Rain conditions).

---

## 👁️ Visualization and Interpretability
Complex ML outputs must be translated into actionable dashboards for municipalities. We tackled this on two fronts:
*   *Static Strategy:* Seaborn-powered **Exploratory Data Analysis Heatmaps** and violin plots generated for immediate PowerPoint/reporting use.
*   *Real-time Strategy:* The **React 3D Twin HUD** using Framer Motion and Recharts to map rolling time-series predictions right over the live intersection, flashing deep red when severe jam constraints are breached.

---

## 🌍 Practical Applicability & Problem Understanding
The core problem is urban economic and environmental gridlock caused by delayed mitigation. By deploying this pipeline, cities achieve unparalleled proactive capabilities:
1. **Dynamic Rerouting:** Automatically diverting commercial trucks during algorithmically predicted peak thresholds.
2. **Adaptive Signal Control:** Adding +25s timing biases to the Outer Ring Road intersections when GPS clusters signal high impending influxes.
3. **Safe Prototyping:** Allowing urban authorities to trigger "What-If" road-closure scenarios within the Digital Twin before breaking ground physically.

---

## 📦 Core Technology Stack
*   **Frontend Ecosystem:** React, TypeScript, Vite, Tailwind CSS, Recharts, Framer Motion
*   **3D Engine:** Three.js, React Three Fiber, React Three Drei
*   **Machine Learning Structure:** Python 3, Pandas, XGBoost, LightGBM, Scikit-Learn
*   **Backend Support:** InsForge SDK & Edge Function Integrations

---
*Elevating city infrastructure from a reactive layout to a living, predictive engine.*
