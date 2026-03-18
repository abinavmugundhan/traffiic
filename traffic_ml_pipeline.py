import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import xgboost as xgb
import pickle

def run_pipeline():
    print("🚀 Starting AI Traffic Intelligence Pipeline...")
    
    # 1. Data Ingestion
    print("\n[1/5] 📥 Ingesting Data...")
    try:
        df = pd.read_csv('Metro_Interstate_Traffic_Volume.csv.gz')
        print(f"Loaded {len(df)} records.")
    except Exception as e:
        print("❌ Dataset not found! Run get_traffic_data.py first.")
        return

    # 2. Data Processing & Feature Engineering
    print("\n[2/5] ⚙️ Processing & Feature Engineering...")
    # Convert datetime
    df['date_time'] = pd.to_datetime(df['date_time'])
    
    # Extract time-based features
    df['hour'] = df['date_time'].dt.hour
    df['day_of_week'] = df['date_time'].dt.dayofweek
    df['month'] = df['date_time'].dt.month
    df['is_weekend'] = df['day_of_week'].isin([5, 6]).astype(int)
    
    # Encode categorical features
    le_weather = LabelEncoder()
    df['weather_encoded'] = le_weather.fit_transform(df['weather_main'])
    
    le_holiday = LabelEncoder()
    df['holiday_encoded'] = le_holiday.fit_transform(df['holiday'])
    
    features = ['hour', 'day_of_week', 'month', 'is_weekend', 'temp', 'rain_1h', 'snow_1h', 'weather_encoded', 'holiday_encoded']
    target = 'traffic_volume'
    
    # Create Congestion Index (0 to 1 based on volume)
    max_vol = df['traffic_volume'].max()
    df['congestion_index'] = df['traffic_volume'] / max_vol
    
    print(f"Extracted features: {features}")
    
    # 3. Train-Test Split
    print("\n[3/5] 🔀 Splitting Data for Time-Series...")
    X = df[features]
    y = df[target]
    
    # Temporal split (predicting the future based on the past)
    split_idx = int(len(X) * 0.8)
    X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
    y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]
    
    # 4. Predictive Modeling - XGBoost
    print("\n[4/5] 🧠 Training XGBoost Forecasting Model...")
    model = xgb.XGBRegressor(
        objective='reg:squarederror',
        n_estimators=100,
        learning_rate=0.1,
        max_depth=6,
        random_state=42
    )
    
    model.fit(X_train, y_train)
    
    # 5. Evaluation & Hotspot Prediction
    print("\n[5/5] 📊 Model Evaluation...")
    y_pred = model.predict(X_test)
    
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print(f"Baseline Accuracy Metrics:")
    print(f"RMSE: {rmse:.2f} (Root Mean Squared Error)")
    print(f"MAE:  {mae:.2f} (Mean Absolute Error)")
    print(f"R2 Score: {r2:.2f}")
    
    # Save the model
    with open('xgboost_traffic_model.pkl', 'wb') as f:
        pickle.dump(model, f)
    print("\n✅ Model saved to 'xgboost_traffic_model.pkl'. Ready for deployment in InsForge Edge Functions!")
    
    # Feature Importance for Explainable AI
    print("\n🔍 Explainable AI Insights (Feature Importance):")
    importances = model.feature_importances_
    for i, feature in enumerate(features):
        print(f"  - {feature}: {importances[i]:.4f}")

if __name__ == "__main__":
    run_pipeline()
