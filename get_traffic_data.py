import urllib.request
import zipfile
import os
import pandas as pd

def fetch_and_preview_dataset():
    print("📡 AI Traffic Intelligence: Initializing Data Ingestion Pipeline...")
    
    # UCI Machine Learning Repository: Metro Interstate Traffic Volume dataset
    # This dataset includes hourly I-35W traffic volume, weather, and holidays.
    # Perfect for training our LSTM and XGBoost models for congestion prediction.
    dataset_url = "https://archive.ics.uci.edu/static/public/492/metro+interstate+traffic+volume.zip"
    zip_path = "metro_traffic.zip"
    csv_filename = "Metro_Interstate_Traffic_Volume.csv.gz"
    
    print(f"⬇️ Downloading dataset from: {dataset_url}")
    try:
        urllib.request.urlretrieve(dataset_url, zip_path)
        print("✅ Download complete.")
        
        print("📦 Extracting dataset...")
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(".")
            
        print("✅ Extraction complete.")
        
        # Load the dataset using Pandas to preview
        df = pd.read_csv(csv_filename)
        
        print("\n📊 Dataset Overview:")
        print(f"Total Records: {len(df):,}")
        print("Columns:", ", ".join(df.columns.tolist()))
        
        print("\n🔍 Previewing first 5 rows (Features for our AI models):")
        print(df.head(5).to_string())
        
        # Cleanup
        if os.path.exists(zip_path):
            os.remove(zip_path)
            
        print("\n🚀 Next Steps:")
        print("1. This CSV contains attributes like 'weather_main', 'temp', and 'traffic_volume'.")
        print("2. We can build an XGBoost model in a Jupyter notebook with this data.")
        print("3. We will then deploy the trained model behind our InsForge Edge Function.")
        
    except Exception as e:
        print(f"❌ Error fetching dataset: {e}")

if __name__ == "__main__":
    fetch_and_preview_dataset()
